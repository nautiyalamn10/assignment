import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <div className="flex items-center mt-2">
        <button
          onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          -
        </button>
        <span className="mx-2">{quantity}</span>
        <button
          onClick={() => setQuantity(prev => Math.min(prev + 1, product.availableUnits))}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
