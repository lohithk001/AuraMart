import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import data from '../../DataBase/data.json';
import { useCart } from '../../Context/CartContext';
import axios from "axios";
import { toast } from "react-toastify";

const STORAGE_KEY = "auramart_wishlist";

const ViewMore = () => {
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();
  const location = useLocation();
  const [oneProduct, setOneProduct] = useState({});
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

  useEffect(() => {
    const fetchProductDetails = () => {
      // Find product locally from data.json
      const foundProduct = data.products.find(p => p.id.toString() === productId.toString());
      if (foundProduct) {
        setOneProduct(foundProduct);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const isWishlisted = oneProduct.id && wishlist.some((item) => item.id === oneProduct.id);

  const toggleWishlist = () => {
    if (!oneProduct.id) return;
    const nextWishlist = isWishlisted
      ? wishlist.filter((item) => item.id !== oneProduct.id)
      : [...wishlist, oneProduct];

    setWishlist(nextWishlist);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextWishlist));
  };

  let addToCart1 = () => {
    axios.post('http://localhost:4000/cartItems', { ...oneProduct, quantity: 1 })
      .then(() => {
        addToCart(oneProduct);
        toast.success("Added to cart!");
      })
      .catch((err) => {
        toast.error("Error adding to cart:", err);
      });
  };



  const handleBack = () => {
    const basePath = location.pathname.startsWith('/adminportal') ? '/adminportal' : '/userportal';
    navigate(`${basePath}/products`);
  };

  const { title, price, description, category, image, rating } = oneProduct;

  return (
    <div className="viewmore">
      <button className="bck-btn" onClick={handleBack}>Back</button>
      <div className="viewmore-header">
        <h1>{title}</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>



          <button className={`wish-btn ${isWishlisted ? 'wish-active' : ''}`} onClick={toggleWishlist}>
            {isWishlisted ? <><FavoriteIcon fontSize="small" /> Remove from wishlist</> : <><FavoriteBorderIcon fontSize="small" /> Add to wishlist</>}
          </button>



          <button className="wish-btn" onClick={addToCart1} style={{ background: '#d4762a' }}>
            <ShoppingCartIcon fontSize="small" /> Add to Cart
          </button>

        </div>
      </div>
      <div className="viewmore-container">
        <div className="viewmore-image"><img src={image} alt={title} /></div>
        <div className="viewmore-details">
          <h2>Price: ${price}</h2>
          <h3>Category: {category}</h3>
          <p>{description}</p>
          <h4>Rating: {rating && rating.rate} / 5</h4>
        </div>
      </div>
    </div>
  );
};

export default ViewMore;
