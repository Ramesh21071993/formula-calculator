import React from "react";
import { Product } from "../types/products";

interface ProductProps {
  product?: Product;
  showImage?: boolean;
  showButton?: boolean;
  onBuyClick?: (productId: number) => void;
}

const ProductDetails: React.FC<ProductProps> = ({
  product,
  showImage = true,
  showButton = true,
  onBuyClick = () => {},
}) => {
  if (!product) {
    return <></>;
  }

  return (
    <div className="product-details">
      {showImage && (
        <div className="product-image-container">
          <img
            className="product-image"
            src={product.picture}
            alt={product.name}
          />
        </div>
      )}
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Offer Price: ${product.offerPrice.toFixed(2)}</p>
        <p>Actual Price: ${product.actualPrice.toFixed(2)}</p>
        <p>Discount: {product.discountPercent.toFixed()}%</p>
        {showButton && (
          <button onClick={() => onBuyClick(product.id)}>Buy</button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
