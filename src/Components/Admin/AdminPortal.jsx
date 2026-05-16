import { Route, Routes } from "react-router-dom";
import Products from "../Pages/Products";
import Home from "../Pages/Home";
import NavBar from "../NavBar";
import About from "../Pages/About";
import ViewMore from "../Pages/ViewMore";

const AdminPortal = () => {
  return (
    <>

    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/viewmore/:id' element={<ViewMore />} />
      </Routes>
    </>
  );
};

export default AdminPortal;