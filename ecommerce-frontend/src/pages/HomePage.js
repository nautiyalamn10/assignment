import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import CartSummary from '../components/CartSummary';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

   useEffect(() => {
    const fetchProducts = async () => {
        try {
          console.log('calling here'); 
          const response = await axios.get('/api/products');
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
  
          // Check if the error is due to authentication
          if (error.response && error.response.status === 401) {
            // Redirect to the login page
            navigate('/login');
          }
        }
      };
  
      fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <CartSummary />
    </div>
  );
};

export default HomePage;
