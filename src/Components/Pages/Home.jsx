import { useState, useEffect } from "react"

import './Home.css'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=6")
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const tags = ["🔥 Trending", "✨ New Arrival", "⭐ Best Seller", "💎 Premium", "🏷️ Sale"]
  const tilts = [-6, -3, 0, 3, 6, 9]

  return (
    <>
     

      <div className="home-root">
       
        <div className="home-inner">

          {/* Hero */}
          <section className="hero">
          

            <h1 className="hero-title">
              A place to shop<br />
              your <em>lifestyle.</em>
            </h1>

            <p className="hero-sub">
              Curated collections from 200+ brands. Find everything you love — delivered fast, styled beautifully.
            </p>

            <div className="hero-ctas">
              <button className="btn-primary">Shop Now →</button>
              <button className="btn-secondary">Explore deals ↓</button>
            </div>

            <div className="tags-row">
              {tags.map((t, i) => (
                <span key={i} className="tag-bubble">{t}</span>
              ))}
            </div>
          </section>

          {/* Product Showcase */}
          <div className="showcase">
            {loading ? (
              <div className="loading-strip">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="skeleton-card" style={{ transform: `rotate(${tilts[i]}deg)` }} />
                ))}
              </div>
            ) : (
              <div className="cards-strip">
                {products.map((p, i) => (
                  <div
                    key={p.id}
                    className="product-card"
                    style={{ transform: `rotate(${tilts[i]}deg)`, zIndex: i === 2 || i === 3 ? 3 : i }}
                  >
                    <img src={p.image} alt={p.title} />
                    <span className="product-card-name">{p.title}</span>
                    <span className="product-card-price">${p.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat">
              <span className="stat-num">12k+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat">
              <span className="stat-num">200+</span>
              <span className="stat-label">Brands</span>
            </div>
            <div className="stat">
              <span className="stat-num">4.9★</span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home