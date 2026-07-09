import { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PreviewIcon from '@mui/icons-material/Preview';
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("auramart_wishlist");
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem("auramart_wishlist");
      return [];
    }
  });
  const navigate = useNavigate();

  const saveWishlist = (nextWishlist) => {
    setWishlist(nextWishlist);
    localStorage.setItem("auramart_wishlist", JSON.stringify(nextWishlist));
  };

  const removeItem = (id) => {
    const nextWishlist = wishlist.filter((item) => item.id !== id);
    saveWishlist(nextWishlist);
  };

  const clearWishlist = () => {
    saveWishlist([]);
    localStorage.removeItem("auramart_wishlist");
  };

  const handleViewMore = (id) => {
    navigate(`/adminportal/viewmore/${id}`);
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div>
          <h1>My Wishlist</h1>
          <p>{wishlist.length ? `${wishlist.length} saved item${wishlist.length > 1 ? 's' : ''}` : 'Save favorite products to view them later.'}</p>
        </div>
        {wishlist.length > 0 && (
          <button className="clear-wishlist" onClick={clearWishlist}>
            Clear wishlist
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p>No items saved yet.</p>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wish-card" key={item.id}>
              <div className="wish-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="wish-body">
                <span className="wish-category">{item.category}</span>
                <h2>{item.title}</h2>
                <div className="wish-actions">
                  <button className="view-btn" onClick={() => handleViewMore(item.id)}>
                    <PreviewIcon fontSize="small" /> View
                  </button>
                  <button className="remove-wish" onClick={() => removeItem(item.id)}>
                    <FavoriteIcon fontSize="small" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
