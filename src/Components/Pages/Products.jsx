import axios from "axios";
import { useEffect, useState } from "react";
import PreviewIcon from '@mui/icons-material/Preview';
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchapi = async () => {
      const response = await axios.get("http://localhost:4000/products");
      setProducts(response.data);
    };
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