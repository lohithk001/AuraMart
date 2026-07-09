import { NavLink, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const NavBar = () => {

  const location = useLocation();

  // Check whether current route is admin route
  let pathBool = location.pathname.startsWith("/adminportal");

  return (
    <>
      <div className="navbar">

        <div className="logo">
          Auramart
        </div>

        <div className="links">

          {/* Admin Navbar */}
          {
            pathBool ? (

              <ul>

                <li>
                  <NavLink to="/adminportal">
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/adminportal/products">
                    Products
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/adminportal/about">
                    About
                  </NavLink>
                </li>

                {/* <li>
                  <NavLink to="/adminportal/addproducts">
                    Add Product
                  </NavLink>
                </li> */}

                <li>
                  <NavLink to="/adminportal/addusers">
                    Add Users
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/">
                    LogOut <LogoutIcon />
                  </NavLink>
                </li>

              </ul>

            ) : (

              /* User Navbar */
              <ul>

                <li>
                  <NavLink to="/userportal">
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/userportal/products">
                    Products
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/userportal/wishlist">
                    Wishlist
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/userportal/about">
                    About
                  </NavLink>
                </li>
                 <li>
                  <NavLink to="/userportal/cart">
                    Cart
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/">
                    LogOut <LogoutIcon />
                  </NavLink>


                </li>

               

              </ul>
            )
          }

        </div>

      </div>
    </>
  );
};

export default NavBar;