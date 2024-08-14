import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AuthForm from './pages/AuthForm';

function App() {
  // Define routes where Navbar shouldn't be displayed
  const hideNavbarRoutes = ['/login', '/signup'];
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Conditionally render Navbar based on current route */}
        {/* {!hideNavbarRoutes.includes(window.location.pathname) && <Navbar />} */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<AuthForm isLogin={false} />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;