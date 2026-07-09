import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'src/DataBase/data.json');

// GET all products
app.get('/products', (req, res) => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.json(jsonData.products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read products' });
  }
});

// POST add new product
app.post('/products', (req, res) => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    
    // Generate new ID
    const newId = Math.max(...jsonData.products.map(p => p.id)) + 1;
    
    const newProduct = {
      id: newId,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      rating: {
        rate: req.body.rating.rate,
        count: req.body.rating.count
      }
    };
    
    jsonData.products.push(newProduct);
    
    fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));
    res.json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
