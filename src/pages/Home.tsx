import React from "react";
import ProductDetails from "../components/Product";
import { useNavigate, useLocation } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { Product } from "../types/products";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { products } = useProduct();

  const onBuyClick = (productId: number) => {
    navigate(`/checkout/${productId}`, {
      state: { from: location },
      replace: true,
    });
  };

  return (
    <div>
      <div className="page-header">
        <h1>Online Store</h1>
        <div>sdvds</div>
      </div>
      <div className="product-list">
        {(products || []).map((product: Product, index: number) => (
          <ProductDetails
            key={index}
            product={product}
            onBuyClick={onBuyClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
