import axios from "axios"
import {  useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"


const ViewMore = () => {

  let params =  useParams()
let productId = params.id
 const navigate = useNavigate();

let [oneProduct, setOneProduct] = useState({})

let fetchProductDetails = async () => {
 let apidata =  await axios.get(`https://fakestoreapi.com/products/${productId}`)
 setOneProduct(apidata.data);
}


useEffect(() => {
    fetchProductDetails()
}, [])

 let handleClick = () => {
navigate(`/adminportal/products`);
 }

console.log(oneProduct)

let {title, price, description, category, image, rating} = oneProduct
  return (
    <div className="viewmore">
        <button  className="bck-btn" onClick={handleClick}> Back </button>
    <h1>{title}</h1>
    <div className="viewmore-container">
        <div className="viewmore-image"><img src={image} alt="NO Image" /></div>    
        <div className="viewmore-details">
            <h2>Price: ${price}</h2>
            <h3>Category: {category}</h3>
            <p>{description}</p>
            <h4>Rating: {rating && rating.rate} / 5</h4>
        </div>
    </div>
   </div>
  )
}

export default ViewMore
