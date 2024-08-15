import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSummary = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };
  console.log('cart in cartSumary : ',cart);
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold">Cart Summary</h2>
      {cart?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart?.map(item => (
            <li key={item.productId}>
              {item.productName} - {item.quantity} units
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={handleCheckout}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={cart?.length === 0}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
