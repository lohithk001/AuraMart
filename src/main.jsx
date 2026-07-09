import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { CartProvider } from './Context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ToastContainer autoClose={1000} />
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>,
)
