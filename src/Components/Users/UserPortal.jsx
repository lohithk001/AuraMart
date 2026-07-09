import { Route, Routes } from "react-router-dom";
import Products from "../Pages/Products";
import Home from "../Pages/Home";
import UserNavBar from "./UserNavBar";
import ViewMore from "../Pages/ViewMore";
import Wishlist from "../Pages/Wishlist";
import About from "../Pages/About"; 


import NavBar from "../NavBar";
import Cart from "../Pages/Cart";

const UserPortal = () => {
  return (
    <>
      {/* <UserNavBar /> */}
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/viewmore/:id' element={<ViewMore />} />
        <Route path='*' element={<Home />} />
      </Routes> */}

      <NavBar />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/viewmore/:id' element={<ViewMore />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </>
  );
};

export default UserPortal;
