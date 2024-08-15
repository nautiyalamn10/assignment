import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AuthForm from './pages/AuthForm';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import { CartProvider } from './context/CartContext';
function App() {
  // Define routes where Navbar shouldn't be displayed
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            {/* <Route path="/admin/stats" element={<Admin />} /> */}
            <Route path="/signup" element={<AuthForm isLogin={false} />} />
            <Route path="/login" element={<AuthForm isLogin={true} />} />

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;