
### src/pages/ProductDetail.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { FiArrowLeft, FiExternalLink, FiStar, FiTag } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ProductDetail = () => {
  const { id } = useParams();

  const fetchProduct = async () => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  };

  const { data: product, isLoading, error } = useQuery(
    ['product', id],
    fetchProduct
  );

  const handleBuyClick = () => {
    window.open(product.buyLink, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading product. Please try again later.</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Product not found.</p>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <FiArrowLeft />
        <span>Back to Products</span>
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Product Image */}
          <div className="space-y-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=AI+Product';
              }}
            />
            
            {/* Source Badge */}
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Available on {product.source}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.title}
              </h1>
              
              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                        size={20}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.rating})</span>
                </div>
              )}
            </div>

            <div className="text-4xl font-bold text-green-600">
              {product.price}
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through ml-2">
                  {product.originalPrice}
                </span>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Category</h3>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center space-x-2">
                  <FiTag />
                  <span>Tags</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6">
              <button
                onClick={handleBuyClick}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-lg font-semibold"
              >
                <span>Buy Now on {product.source}</span>
                <FiExternalLink size={20} />
              </button>
              
              <p className="text-sm text-gray-500 mt-2 text-center">
                You'll be redirected to {product.source} to complete your purchase
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Product Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Source:</span>
            <span className="ml-2 text-gray-600">{product.source}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Category:</span>
            <span className="ml-2 text-gray-600">{product.category}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Last Updated:</span>
            <span className="ml-2 text-gray-600">
              {new Date(product.lastUpdated).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Added:</span>
            <span className="ml-2 text-gray-600">
              {new Date(product.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
