import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const UserNavBar = () => {
  return (
    <div className="navbar">
      <div className="logo">Auramart</div>
      <div className="links">
        <ul>
          <li>
            <NavLink to="/userportal" end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/userportal/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/userportal/wishlist">Wishlist</NavLink>
          </li>
          <li>
            <NavLink to="/userportal/cart" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShoppingCartIcon fontSize="small" /> Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <LogoutIcon />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserNavBar;
