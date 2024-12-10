import React, { Profiler } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import { ProductsProvider } from "./context/ProductContext";

const App: React.FC = () => {
  console.log("REDNERING FROM APP");

  const handleProfiler = (props: any) => {
    console.log("props", props);
  };

  return (
    <div className="online-store">
      <Profiler id="store" onRender={handleProfiler}>
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
      </Profiler>
    </div>
  );
};

export default App;
