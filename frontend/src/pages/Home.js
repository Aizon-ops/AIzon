import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Home = () => {
  const [searchParams, setSearchParams] = useState({
    search: '',
    category: 'all',
    page: 1
  });

  const fetchProducts = async ({ queryKey }) => {
    const [, params] = queryKey;
    const response = await axios.get(`${API_BASE_URL}/products`, { params });
    return response.data;
  };

  const fetchCategories = async () => {
    const response = await axios.get(`${API_BASE_URL}/products/meta/categories`);
    return response.data;
  };

  const { data: productsData, isLoading: productsLoading, error } = useQuery(
    ['products', searchParams],
    fetchProducts,
    { keepPreviousData: true }
  );

  const { data: categories = [] } = useQuery('categories', fetchCategories);

  const handleSearch = (searchTerm) => {
    setSearchParams(prev => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const handleCategoryChange = (category) => {
    setSearchParams(prev => ({ ...prev, category, page: 1 }));
  };

  const handlePageChange = (page) => {
    setSearchParams(prev => ({ ...prev, page }));
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">AIzon</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover the best AI products and tools in one place
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        categories={categories}
      />

      {/* Products Grid */}
      {productsLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {productsData?.products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {productsData?.totalPages > 1 && (
            <div className="flex justify-center space-x-2">
              {Array.from({ length: productsData.totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg ${
                    page === searchParams.page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {productsData?.products?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found. Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
