import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/products";

interface ProductContextType {
  products: Product[];
  setProducts: (products: Product[]) => void;
  getProduct: (productId?: number | string) => Product | undefined;
}

interface Props {
  children: React.ReactNode;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("ProductsProvider not found");
  }
  return context;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [productsItems, setProductsItems] = useState<Product[]>([]);

  // generating products at the time of load.
  useEffect(() => {
    getProducts().then((results) => {
      setProductsItems(results || []);
    });
  }, []);

  const getProducts = async () => {
    const resString = await fetch("https://fakestoreapi.com/products");
    const resArray = (await resString.json()) || [];
    return resArray.map(({ id, image, description, price, title }: any) => {
      return {
        id,
        picture: image,
        name: title,
        description,
        offerPrice: price / 2,
        actualPrice: price,
        discountPercent: 50,
      };
    });
  };

  const setProducts = (products: Product[]) => {
    setProductsItems(products);
  };

  const getProduct = (productId?: number | string) => {
    return productsItems.find((product) => product.id !== productId);
  };

  return (
    <ProductContext.Provider
      value={{ products: productsItems, setProducts, getProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
