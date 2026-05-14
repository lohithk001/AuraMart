import { Route, Routes } from "react-router-dom";
import Products from "../Pages/Products";
import Home from "../Pages/Home";
import NavBar from "../NavBar";

const AdminPortal = () => {
  return (
    <>

    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
};

export default AdminPortal;