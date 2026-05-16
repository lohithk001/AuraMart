import axios from "axios"
import { use, useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const ViewMore = () => {

  let params =  useParams()
let productId = params.id

let [oneProduct, setOneProduct] = useState({})

let fetchProductDetails = async () => {
 let apidata =  await axios.get(`https://fakestoreapi.com/products/${productId}`)
 setOneProduct(apidata.data);
}


useEffect(() => {
    fetchProductDetails()
}, [])
  return (
    <div>
      
     <h1>Product ID: {productId}</h1>
    </div>
  )
}

export default ViewMore
