import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect
} from "react";

// Define types for the context state
interface FormulaContextType {
  formula: string;
  inputs: { [key: string]: string };
  result: string | null;
  resultError: string | null;
  inputError: { [key: string]: string | undefined };
  setFormula: (formula: string) => void;
  setInputs: (inputs: { [key: string]: string }) => void;
  setResult: (result: string | null) => void;
  setResultError: (error: string | null) => void;
  setInputError: (error: { [key: string]: string | undefined }) => void;
  saveFormula: (formula: string) => void;
  deleteFormula: (formula: string) => void;
  getSavedFormulas: () => string[];
}

// Create the context
const FormulaContext = createContext<FormulaContextType | undefined>(undefined);

// Create the provider component
export const FormulaCalculatorProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [formula, setFormula] = useState<string>(""); // Store the formula
  const [inputs, setInputs] = useState<{ [key: string]: string }>({}); // Store the inputs
  const [result, setResult] = useState<string | null>(null); // Store the result
  const [resultError, setResultError] = useState<string | null>(null); // Store the Result error
  const [inputError, setInputError] = useState<{
    [key: string]: string | undefined;
  }>({}); // Store the Input error
  const [savedFormulas, setSavedFormulas] = useState<string[]>([]); // Store the formula

  const saveFormula = () => {
    const existFormulas = getSavedFormulas();
    if (!formula || existFormulas.includes(formula)) {
      return;
    }
    const allFormulas = [formula, ...existFormulas];
    setSavedFormulas(allFormulas);
    localStorage.setItem("formulas", JSON.stringify(allFormulas));
  };

  useEffect(() => {
    loadSavedFormulas();
  }, []);

  const loadSavedFormulas = () => {
    const formulas = localStorage.getItem("formulas") || "";
    setSavedFormulas(formulas ? JSON.parse(formulas) : []);
  };

  const getSavedFormulas = () => {
    return savedFormulas;
  };

  const deleteFormula = (formula: string) => {
    const formulas = savedFormulas.filter((el) => el !== formula);
    setSavedFormulas(formulas);
    localStorage.setItem("formulas", JSON.stringify(formulas));
  };

  return (
    <FormulaContext.Provider
      value={{
        formula,
        inputs,
        result,
        resultError,
        inputError,
        setFormula,
        setInputs,
        setResult,
        setResultError,
        setInputError,
        saveFormula,
        deleteFormula,
        getSavedFormulas
      }}
    >
      {children}
    </FormulaContext.Provider>
  );
};

// Create a custom hook to use the formula context
export const useFormulaContext = (): FormulaContextType => {
  const context = useContext(FormulaContext);
  if (!context) {
    throw new Error("useFormulaContext must be used within a FormulaProvider");
  }
  return context;
};
