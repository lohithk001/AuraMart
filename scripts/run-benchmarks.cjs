/**
 * AuraMart Performance & Latency Benchmark Runner
 * 
 * This script runs performance benchmarks for critical client-side operations:
 * 1. Cart Operations (adding, updating, and removing items in bulk).
 * 2. Product Searching, Filtering & Sorting (sorting and filtering large product catalogs).
 * 3. JSON State Serialization & Deserialization (simulating local storage reads/writes).
 * 
 * No external dependencies required (built-in Node.js API).
 */

const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');

// Helper for styling terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
  inverse: '\x1b[7m'
};

function formatHeader(title) {
  console.log(`\n${colors.bright}${colors.cyan}=== ${title} ===${colors.reset}`);
}

function runBenchmark(name, iterations, fn, slaMaxAvgMs) {
  const times = [];
  const startTotal = performance.now();

  for (let i = 0; i < iterations; i++) {
    const t0 = performance.now();
    fn(i);
    const t1 = performance.now();
    times.push(t1 - t0);
  }

  const endTotal = performance.now();
  const totalDuration = endTotal - startTotal;
  
  // Calculate statistics
  const avg = totalDuration / iterations;
  const min = Math.min(...times);
  const max = Math.max(...times);
  const throughput = (iterations / (totalDuration / 1000)).toFixed(0);

  // Standard deviation
  const avgDiffSq = times.map(t => Math.pow(t - avg, 2));
  const stdDev = Math.sqrt(avgDiffSq.reduce((a, b) => a + b, 0) / iterations);

  const slaPassed = avg <= slaMaxAvgMs;

  console.log(`\n  Benchmark: ${colors.bright}${name}${colors.reset}`);
  console.log(`  Runs:      ${iterations.toLocaleString()}`);
  console.log(`  Total:     ${totalDuration.toFixed(2)} ms`);
  console.log(`  Avg:       ${avg.toFixed(4)} ms / run`);
  console.log(`  Min/Max:   ${min.toFixed(4)} ms / ${max.toFixed(4)} ms`);
  console.log(`  Std Dev:   ${stdDev.toFixed(4)} ms`);
  console.log(`  Speed:     ${colors.bright}${throughput}${colors.reset} ops/sec`);
  
  const statusColor = slaPassed ? colors.green : colors.red;
  const statusLabel = slaPassed ? 'PASS' : 'FAIL';
  console.log(`  SLA Target: < ${slaMaxAvgMs.toFixed(4)} ms | Status: ${statusColor}${colors.bright}[${statusLabel}]${colors.reset} (Avg: ${avg.toFixed(4)} ms)`);

  return { name, avg, min, max, throughput, slaPassed };
}

// Load data.json
let rawData;
try {
  const dataPath = path.join(__dirname, '../src/DataBase/data.json');
  rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (e) {
  console.error('Error reading data.json. Using fallback static data.');
  rawData = {
    products: [
      { id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack', price: 109.95, category: "men's clothing" },
      { id: 2, title: 'Mens Casual Premium Slim Fit T-Shirts', price: 22.3, category: "men's clothing" },
      { id: 3, title: 'Mens Cotton Jacket', price: 55.99, category: "men's clothing" }
    ]
  };
}

// ----------------------------------------------------
// Setup test data
// ----------------------------------------------------
const baseProducts = rawData.products;
// Scale up catalog for search/filter benchmarks (1000 items)
const largeCatalog = [];
for (let i = 0; i < 1000; i++) {
  const baseProduct = baseProducts[i % baseProducts.length];
  largeCatalog.push({
    ...baseProduct,
    id: i + 1,
    title: `${baseProduct.title} - Variant ${i}`,
    price: +(baseProduct.price + (i % 10)).toFixed(2)
  });
}

// ----------------------------------------------------
// Benchmark implementations
// ----------------------------------------------------

console.log(`${colors.inverse}  AURAMART BENCHMARK PERFORMANCE TESTS  ${colors.reset}`);
console.log(`Date: ${new Date().toISOString()}`);
console.log(`Node version: ${process.version}`);

const results = [];

// 1. Cart Operations Benchmark
formatHeader('1. CART STATE MUTATIONS BENCHMARK');
results.push(runBenchmark(
  'Cart Operations (Add -> Update -> Remove)',
  1000,
  () => {
    let cart = [];

    // Helper functions mirroring CartContext logic
    const addToCart = (product) => {
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        cart = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        cart = [...cart, { ...product, quantity: 1 }];
      }
    };

    const updateQuantity = (id, quantity) => {
      cart = cart.map(item => item.id === id ? { ...item, quantity } : item);
    };

    const removeFromCart = (id) => {
      cart = cart.filter(item => item.id !== id);
    };

    // Add 10 items
    for (let j = 0; j < 10; j++) {
      addToCart(baseProducts[j % baseProducts.length]);
    }
    
    // Update quantities
    for (let j = 0; j < 5; j++) {
      updateQuantity(baseProducts[j % baseProducts.length].id, 5);
    }

    // Remove 5 items
    for (let j = 0; j < 5; j++) {
      removeFromCart(baseProducts[j % baseProducts.length].id);
    }
  },
  0.15 // SLA target: entire sequence under 0.15ms on average
));

// 2. Product Search, Filtering, and Sorting Benchmark
formatHeader('2. SEARCH, FILTERING, & SORTING BENCHMARK (1,000 Products Catalog)');
const searchQueries = ['pack', 'shirt', 'cotton', 'jacket', 'slim', 'casual'];
const categories = ["men's clothing", "jewelery", "electronics", "women's clothing"];

results.push(runBenchmark(
  'Filter and Sort Catalog',
  3000,
  (i) => {
    const query = searchQueries[i % searchQueries.length];
    const category = categories[i % categories.length];
    const sortBy = i % 2 === 0 ? 'price-low-high' : 'price-high-low';

    // 1. Filter by Search Query & Category
    let filtered = largeCatalog.filter(product => {
      const matchesQuery = product.title.toLowerCase().includes(query);
      const matchesCategory = product.category === category;
      return matchesQuery && matchesCategory;
    });

    // 2. Sort by Price
    filtered.sort((a, b) => {
      if (sortBy === 'price-low-high') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    // Dummy assertion to prevent compilation/dead-code optimization
    if (filtered.length < 0) {
      console.log('Should never print');
    }
  },
  0.50 // SLA target: under 0.50ms on average to sort/filter 1000 items
));

// 3. LocalStorage JSON Serialization & Parsing Latency Benchmark
formatHeader('3. STATE SERIALIZATION & PARSING BENCHMARK');
const mockCart = [];
for (let j = 0; j < 50; j++) {
  mockCart.push({
    ...baseProducts[j % baseProducts.length],
    id: j,
    quantity: j + 1
  });
}

results.push(runBenchmark(
  'JSON.stringify & JSON.parse (Cart State Sync)',
  5000,
  () => {
    // Simulate saving to and reading from LocalStorage
    const serialized = JSON.stringify(mockCart);
    const parsed = JSON.parse(serialized);
    
    if (parsed.length !== 50) {
      throw new Error('Verification failed');
    }
  },
  0.25 // SLA target: JSON roundtrip under 0.25ms on average
));

// Summary Report
formatHeader('BENCHMARK RUN SUMMARY');
console.log(`\n+---------------------------------------------+---------------+---------+`);
console.log(`| Test Suite Name                             | Throughput    | Status  |`);
console.log(`+---------------------------------------------+---------------+---------+`);
results.forEach(res => {
  const nameCol = res.name.padEnd(43);
  const speedCol = `${res.throughput} ops/s`.padEnd(13);
  const statusColor = res.slaPassed ? colors.green : colors.red;
  const statusText = res.slaPassed ? 'PASS' : 'FAIL';
  console.log(`| ${nameCol} | ${speedCol} | ${statusColor}${statusText}${colors.reset}    |`);
});
console.log(`+---------------------------------------------+---------------+---------+`);

const allPassed = results.every(r => r.slaPassed);
console.log('\n');
if (allPassed) {
  console.log(`${colors.bgGreen}${colors.bright}  SUCCESS: All benchmark performance SLAs passed!  ${colors.reset}\n`);
  process.exit(0);
} else {
  console.log(`${colors.bgRed}${colors.bright}  WARNING: One or more benchmark SLAs failed!  ${colors.reset}\n`);
  process.exit(1);
}
