import React from "react";
import FormulaCalculator from "./pages";
import { FormulaCalculatorProvider } from "./context";

const App: React.FC = () => {
  return (
    <div className="formula-calculator">
      <FormulaCalculatorProvider>
        <FormulaCalculator />
      </FormulaCalculatorProvider>
    </div>
  );
};

export default App;
