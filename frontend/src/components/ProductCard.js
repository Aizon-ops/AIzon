import React from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiStar } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const handleBuyClick = (e) => {
    e.preventDefault();
    window.open(product.buyLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=AI+Product';
          }}
        />
        <div className="absolute top-2 right-2">
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
            {product.source}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-green-600">
            {product.price}
          </span>
          {product.rating && (
            <div className="flex items-center space-x-1">
              <FiStar className="text-yellow-400 fill-current" size={16} />
              <span className="text-sm text-gray-600">{product.rating}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags?.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex space-x-2">
          <Link
            to={`/product/${product._id}`}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-center hover:bg-gray-200 transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={handleBuyClick}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
          >
            <span>Buy Now</span>
            <FiExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
