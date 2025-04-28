import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-[100%]">
        <img 
          src={product.image || 'https://via.placeholder.com/300'} 
          alt={product.name} 
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2 text-gray-800">{product.name}</h2>
        {product.description && (
          <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        )}
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-blue-600">
            Rs {product.price?.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;