import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
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

  const addToCart = async (productId) => {
    try {
      await axios.post('/api/cart/add', {
        userId: 'user123', // In a real app, this would be the logged-in user's ID
        productId,
        quantity: 1
      });
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => addToCart(product.id)}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;