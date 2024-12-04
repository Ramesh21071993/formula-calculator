import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/products";

interface ProductContextType {
  setProducts: (products: Product[]) => void;
  getProducts: () => Product[] | undefined;
  getProduct: (productId?: number | string) => Product | undefined;
  setSortByName: (sort: string) => void;
  setSortByPrice: (sort: string) => void;
  setSearch: (searchTerm: string) => void;
  getSortFilter: () => SortFilter;
}

interface Props {
  children: React.ReactNode;
}

interface SortFilter {
  sortByName: string;
  sortByPrice: string;
  searchTerm: string;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("Context Data not found");
  }
  return context;
};

export const ProductsProvider: React.FC<Props> = ({ children }) => {
  const [productsItems, setProductsItems] = useState<Product[]>([]);

  const [sortFilter, setSortFilter] = useState<SortFilter>({
    sortByName: "",
    sortByPrice: "",
    searchTerm: "",
  });

  // generating products at the time of load.
  useEffect(() => {
    generateProducts().then((results) => {
      setProductsItems(results || []);
    });
  }, []);

  const generateProducts = async () => {
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
    return productsItems.find((product) => product.id == productId);
  };

  const getProducts = () => {
    // filter by name
    let newProducts = productsItems.filter(
      (product) =>
        !sortFilter.searchTerm ||
        product.name.toLowerCase().includes(sortFilter.searchTerm.toLowerCase())
    );

    // sort by price
    if (sortFilter.sortByPrice) {
      if (sortFilter.sortByPrice === "lowToHigh") {
        // Sort by price: low to high
        newProducts.sort((a, b) => a.offerPrice - b.offerPrice);
      } else if (sortFilter.sortByPrice === "highToLow") {
        // Sort by price: high to low
        newProducts.sort((a, b) => b.offerPrice - a.offerPrice);
      }
    }

    // sort by name
    if (sortFilter.sortByName) {
      if (sortFilter.sortByName === "asc") {
        // Sort by Name: A-Z
        newProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortFilter.sortByName === "desc") {
        // Sort by Name: Z-A
        newProducts.sort((a, b) => b.name.localeCompare(a.name));
      }
    }
    return newProducts;
  };

  const getSortFilter = () => sortFilter;

  const setSortByName = (sortByName: string) => {
    setSortFilter({
      ...sortFilter,
      sortByName,
    });
  };

  const setSortByPrice = (sortByPrice: string) => {
    setSortFilter({
      ...sortFilter,
      sortByPrice,
    });
  };

  const setSearch = (searchTerm: string) => {
    setSortFilter({
      ...sortFilter,
      searchTerm,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        setProducts,
        getProducts,
        getProduct,
        setSortByName,
        setSortByPrice,
        setSearch,
        getSortFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
