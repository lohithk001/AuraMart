// import { useCart } from '../../Context/CartContext';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const { cart, removeFromCart, updateQuantity } = useCart();
//   const navigate = useNavigate();

//   const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="wishlist-page">
//       <div className="wishlist-header">
//         <div>
//           <h1>Shopping Cart</h1>
//           <p>{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
//         </div>
//       </div>

//       {cart.length === 0 ? (
//         <div className="wishlist-empty">
//           <h2>Your cart is empty.</h2>
//           <p style={{ marginTop: '10px' }}>Explore our products and find something you love!</p>
//           <button className="bck-btn" style={{ marginTop: '30px' }} onClick={() => navigate('/userportal/products')}>
//             Shop Now
//           </button>
//         </div>
//       ) : (
//         <div className="wishlist-grid" style={{ display: 'flex', flexDirection: 'column' }}>
//           {cart.map((item) => (
//             <div className="wishlist-card" key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, minWidth: '250px' }}>
//                 <div className="wishlist-image" style={{ width: '80px', height: '80px', padding: '5px' }}>
//                   <img src={item.image} alt={item.title} />
//                 </div>
//                 <div>
//                   <h3 className="wishlist-title" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{item.title}</h3>
//                   <div className="wishlist-price">${item.price.toFixed(2)}</div>
//                 </div>
//               </div>

//               <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', background: '#f3eee8', borderRadius: '100px', padding: '2px' }}>
//                   <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ border: 'none', background: 'transparent', padding: '8px 12px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}>-</button>
//                   <span style={{ padding: '0 10px', fontWeight: '600' }}>{item.quantity}</span>
//                   <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ border: 'none', background: 'transparent', padding: '8px 12px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}>+</button>
//                 </div>
//                 <div style={{ fontWeight: '700', fontSize: '1.2rem', minWidth: '90px', textAlign: 'right' }}>
//                   ${(item.price * item.quantity).toFixed(2)}
//                 </div>
//                 <button className="delete-btn" onClick={() => removeFromCart(item.id)} title="Remove Item">
//                   <DeleteIcon />
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="wishlist-card" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fbfaf8' }}>
//             <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2rem' }}>Total</h2>
//             <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: '#d4762a' }}>${total.toFixed(2)}</h2>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
//              <button className="wish-btn" style={{ background: '#1a1107', padding: '15px 40px', fontSize: '1.1rem' }}>Proceed to Checkout</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {

  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:4000/cartItems");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div>
      <h1>Cart Items</h1>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid gray",
              padding: "15px",
              margin: "15px",
              width: "300px",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: "150px", height: "150px" }}
            />

            <h3>{item.title}</h3>

            <p><b>Category:</b> {item.category}</p>

            <p><b>Price:</b> ₹{item.price}</p>

            <p><b>Quantity:</b> {item.quantity}</p>

            <p><b>Rating:</b> {item.rating.rate}</p>

            
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;;
