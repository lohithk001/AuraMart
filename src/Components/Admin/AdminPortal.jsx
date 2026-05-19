import { Route, Routes } from "react-router-dom";
import Products from "../Pages/Products";
import Home from "../Pages/Home";
import NavBar from "../NavBar";
import About from "../Pages/About";
import ViewMore from "../Pages/ViewMore";
<<<<<<< HEAD
import AddProduct from "../Pages/AddProducts";
import AddUsers from "./AddUsers";
=======
>>>>>>> 9c6068658f9fef3ca1caede5d17a8ab7b2a37dac

const AdminPortal = () => {
  return (
    <>

    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/viewmore/:id' element={<ViewMore />} />
<<<<<<< HEAD
        <Route path='/addproducts' element={<AddProduct />} />
        <Route path='/addusers' element={<AddUsers />} />
=======
>>>>>>> 9c6068658f9fef3ca1caede5d17a8ab7b2a37dac
      </Routes>
    </>
  );
};

export default AdminPortal;