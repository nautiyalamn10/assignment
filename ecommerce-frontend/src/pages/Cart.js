import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [discountCode, setDiscountCode] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart?userId=user123');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  const checkout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/checkout', {
        userId: 'user123',
        discountCode
      });
      alert(`Order placed successfully! Total: $${response.data.total}`);
      setCart({ items: [] });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item.productId} className="flex justify-between items-center border-b py-2">
              <span>{item.productId}</span>
              <span>Quantity: {item.quantity}</span>
            </div>
          ))}
          <div className="mt-4">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Discount Code"
              className="border rounded p-2 mr-2"
            />
            <button
              onClick={checkout}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;