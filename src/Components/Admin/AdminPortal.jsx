import { Route, Routes } from "react-router-dom";
import Products from "../Pages/Products";
import Home from "../Pages/Home";
import NavBar from "../NavBar";
import About from "../Pages/About";
import ViewMore from "../Pages/ViewMore";
import AddProduct from "../Pages/AddProducts";
import AddUsers from "./AddUsers";

const AdminPortal = () => {
  return (
    <>

    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/viewmore/:id' element={<ViewMore />} />
        <Route path='/addproducts' element={<AddProduct />} />
        <Route path='/addusers' element={<AddUsers />} />
      </Routes>
    </>
  );
};

export default AdminPortal;