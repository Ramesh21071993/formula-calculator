import React from "react";
import ProductDetails from "../components/Product";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { Product } from "../types/products";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const {
    getProducts,
    getSortFilter,
    setSortByName,
    setSortByPrice,
    setSearch,
  } = useProduct();

  const products = getProducts();
  const sortFilters = getSortFilter();

  const onBuyClick = (productId: number) => {
    navigate(`/checkout/${productId}`);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Online Store</h1>
        <div className="sort-container">
          <div className="sorting-section">
            <label htmlFor="sortByPrice">Sort By Price: </label>
            <select
              id="sortByPrice"
              value={sortFilters.sortByPrice}
              onChange={(e) => setSortByPrice(e.target.value)}
            >
              <option value="">Select</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>
          <div className="sorting-section">
            <label htmlFor="sortByName">Sort By Name: </label>
            <select
              id="sortByName"
              value={sortFilters.sortByName}
              onChange={(e) => setSortByName(e.target.value)}
            >
              <option value="">Select</option>
              <option value="asc">A to Z</option>
              <option value="desc">Z to A</option>
            </select>
          </div>
          <div className="search-section">
            <label htmlFor="searchByName">Search By Name: </label>
            <input
              id="searchByName"
              name="searchByName"
              type="text"
              placeholder="Search by name..."
              value={sortFilters.searchTerm}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="product-list">
        {(products || []).map((product: Product, index: number) => (
          <ProductDetails
            key={index}
            product={product}
            onBuyClick={onBuyClick}
          />
        ))}
        {!products?.length && <span>No Products found.</span>}
      </div>
    </div>
  );
};

export default Home;
