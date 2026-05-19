
import { NavLink } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
const NavBar = () => {
  return (
   <>
   <div className="navbar">
    <div className="logo">Auramart</div>
<div className="links">


    <ul>
        <li>
          <NavLink to="/adminportal">Home</NavLink>
        </li>
        <li>
          <NavLink to="/adminportal/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/adminportal/about">About</NavLink>
        </li>
        <li>
<<<<<<< HEAD
          <NavLink to="/adminportal/addproducts">Add Product</NavLink>
        </li>

        <li>
          <NavLink to="/adminportal/addusers">Add Users</NavLink>
        </li>
        <li>
=======
>>>>>>> 9c6068658f9fef3ca1caede5d17a8ab7b2a37dac
          <NavLink to="/">
            <LogoutIcon />
          </NavLink>
        </li>
      </ul>
      
</div>

   </div>
   
   
   
   </>
  )
}

export default NavBar
