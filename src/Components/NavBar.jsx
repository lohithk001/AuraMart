
import { NavLink } from 'react-router-dom'

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
      </ul>
      
</div>

   </div>
   
   
   
   </>
  )
}

export default NavBar
