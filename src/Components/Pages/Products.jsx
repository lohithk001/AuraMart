import axios from "axios";
import { useEffect, useState } from "react";
<<<<<<< HEAD
=======
import DeleteIcon from '@mui/icons-material/Delete';
>>>>>>> 9c6068658f9fef3ca1caede5d17a8ab7b2a37dac
import PreviewIcon from '@mui/icons-material/Preview';
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

<<<<<<< HEAD
  useEffect(() => {
    const fetchapi = async () => {
      const response = await axios.get("http://localhost:4000/products");
      setProducts(response.data);
    };
=======
  const fetchapi = async () => {
    let responsedata = await axios.get("https://fakestoreapi.com/products");
    setProducts(responsedata.data);
  };

  useEffect(() => {
>>>>>>> 9c6068658f9fef3ca1caede5d17a8ab7b2a37dac
    fetchapi();
  }, []);


  let handleViewMore = (id) => {
navigate(`/adminportal/viewmore/${id}`);
    
   
  }

  return (
    <>
      <div className="products">
        <h1>Products</h1>

        <div className="prodcontainer">
          {products.map((item, index) => {
            let { id,title, image, category } = item;

            return (
              <div className="card" key={index}>
                <div className="cat">{category}</div>
                <div className="image"><img src={image} alt="NO Image" /></div>
                <div className="title">{title}</div>

                <button className="prod-btn" onClick={() => handleViewMore(id)}>
                  <PreviewIcon/>
                </button>

              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;