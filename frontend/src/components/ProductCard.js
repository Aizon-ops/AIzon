import React from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiStar } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const handleBuyClick = (e) => {
    e.preventDefault();
    window.open(product.buyLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="glass-card hover:scale-105 transition-transform duration-300 relative group">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-t-lg"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=AI+Product';
        }}
      />
      <div className="absolute top-3 right-3">
        <span className="badge-glow">{product.source}</span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 futuristic-text line-clamp-2">{product.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-extrabold text-glow">{product.price}</span>
          {product.rating && (
            <div className="flex items-center space-x-1">
              <FiStar className="text-yellow-400" size={16} />
              <span className="text-sm text-gray-400">{product.rating}</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags?.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag-chip">{tag}</span>
          ))}
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/product/${product._id}`}
            className="futuristic-btn flex-1"
          >
            View Details
          </Link>
          <button
            onClick={handleBuyClick}
            className="futuristic-btn-glow flex-1 flex items-center justify-center space-x-1"
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
