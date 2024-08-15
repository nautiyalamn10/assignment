import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post('/api/checkout', { discountCode: couponCode });
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      navigate('/');
    } catch (error) {
      setErrorMessage('Failed to place order');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul>
        {cart.map(item => (
          <li key={item.productId}>
            {item.productName} - {item.quantity} units
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter coupon code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        className="mt-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handlePlaceOrder}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Place Order
      </button>
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
      {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
    </div>
  );
};

export default CheckoutPage;
