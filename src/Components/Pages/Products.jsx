import { useEffect, useState } from "react";
import PreviewIcon from '@mui/icons-material/Preview';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useLocation } from "react-router-dom";
import data from '../../DataBase/data.json';
import { useCart } from '../../Context/CartContext';

const STORAGE_KEY = "auramart_wishlist";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch directly from the local data.json file
    setProducts(data.products);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const handleViewMore = (id) => {
    const basePath = location.pathname.startsWith('/adminportal') ? '/adminportal' : '/userportal';
    navigate(`${basePath}/viewmore/${id}`);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      return;
    }
    setWishlist((prev) => [...prev, product]);
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <div className="products">
      <h1>Products</h1>

      <div className="prodcontainer">
        {products.map((item, index) => {
          let { id, title, image, category, price } = item;

          return (
            <div className="card" key={index}>
              <div className="cat">{category}</div>
              <div className="image"><img src={image} alt={title} /></div>
              <div className="title">{title}</div>
              <div className="price">${price}</div>
              <div className="card-actions">
                <button
                  className={`prod-btn ${isWishlisted(id) ? 'wish-active' : ''}`}
                  onClick={() => toggleWishlist(item)}
                  title={isWishlisted(id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {isWishlisted(id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </button>
                <button 
                  className="prod-btn" 
                  onClick={() => addToCart(item)}
                  title="Add to Cart"
                >
                  <ShoppingCartIcon />
                </button>
                <button className="view-btn" onClick={() => handleViewMore(id)} title="View more">
                  <PreviewIcon />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;