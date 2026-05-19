import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/AddProducts.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [rate, setRate] = useState("");
  const [count, setCount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!title || !price || !description || !category || !image || !rate || !count) {
      alert("Please fill in all fields!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: title.trim(),
      price: Number(price),
      description: description.trim(),
      category,
      image: image.trim(),
      rating: {
        rate: Number(rate),
        count: Number(count),
      },
    };

    try {
      await axios.post("http://localhost:4000/products", newProduct);
      alert("Product Added Successfully!");

      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");
      setRate("");
      setCount("");
      
      navigate("/adminportal/products");
    } catch (error) {
      console.error(error);
      alert("Error Adding Product!");
    }
  };

  return (
    <div className="addproduct-page">
      <div className="addproduct-box">
        <h1>Add Product</h1>

        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

        <br /><br />

        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br /><br />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <br /><br />

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select category</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>

        <br /><br />

        <label>Image URL:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <br /><br />

        <label>Rating Rate:</label>
        <input
          type="number"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />

        <br /><br />

        <label>Rating Count:</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />

        <br /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  </div>
  );
};

export default AddProduct;