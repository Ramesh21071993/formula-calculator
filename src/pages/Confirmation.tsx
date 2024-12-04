import React from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

const Confirmation: React.FC = () => {
  const { productId } = useParams();
  const { getProduct } = useProduct();
  const productDetails = getProduct(productId);
  
  return (
    <div>
      <h1>Confirmation Page</h1>
      <h4>Your order placed</h4>
      <h4>Order Number: {Math.floor(Math.random() * 10000)}</h4>
      <h3>{productDetails && productDetails.name}</h3>
      <p>{productDetails && productDetails.description}</p>
      <h4>Amount charged for the order from the card: ${productDetails && productDetails.offerPrice.toFixed(2)}</h4>
    </div>
  );
};

export default Confirmation;
