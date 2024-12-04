import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import { ProductsProvider } from "./context/ProductContext";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <div className="online-store">
        <ProductsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout/:productId" element={<Checkout />} />
              <Route
                path="/confirmation/:productId"
                element={<Confirmation />}
              />
            </Routes>
          </BrowserRouter>
        </ProductsProvider>
      </div>
    </React.StrictMode>
  );
};

export default App;
