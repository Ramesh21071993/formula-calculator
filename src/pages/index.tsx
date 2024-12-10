import React, { ChangeEvent, useCallback, useEffect, useMemo } from "react";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { useFormulaContext } from "../context";
import {
  isOnlyNumbers,
  isValidFormula,
  getVariables,
  replaceVariableValue,
  FeatureFlags
} from "../utils";
import InputTextSlider from "../components/InputTextSlider";
import InputText from "../components/InputText";
import SavedFormula from "../components/SavedFormula";

const FormulaCalculator: React.FC = () => {
  const {
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
    saveFormula
  } = useFormulaContext();

  useEffect(() => {
    if (!formula) {
      setInputs({});
      setResult(null);
    }
  }, [formula, setInputs, setResult]);

  const isDisabled = useMemo(() => {
    return (
      !formula || Boolean(Object.values(inputError).filter((el) => el).length)
    );
  }, [inputError, formula]);

  const processFormula = (
    formula: string,
    inputs: { [key: string]: string }
  ): number | null => {
    let replacedFormulaWithValue = replaceVariableValue(inputs, formula);

    if (!replacedFormulaWithValue) {
      return null; // Return null if the formula is invalid
    }

    // checking valid characters are entered in the formula
    if (!isValidFormula(replacedFormulaWithValue)) {
      setResultError("Formula contains invalid characters.");
      return null; // Return null if the formula is invalid
    }

    try {
      // Using the Function constructor to process the formula
      // eslint-disable-next-line no-new-func
      const func = new Function(
        ...Object.keys(inputs),
        `return ${replacedFormulaWithValue}`
      );
      const values = Object.values(inputs).map((val) => parseFloat(val) || 0);
      return func(...values); // Pass the values as arguments to the function
    } catch (e) {
      setResultError("Invalid formula syntax.");
      return null;
    }
  };

  const handleCalculate = () => {
    setResultError(null); // Reset error message
    const calculatedResult = processFormula(formula, inputs);
    if (!calculatedResult || isNaN(calculatedResult)) {
      setResult("Error not able to process the formula");
    } else {
      setResult(calculatedResult.toString());
    }
  };

  const generateInputs = useCallback(() => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      let error = undefined;
      if (!isOnlyNumbers(value)) {
        error = "Only numbers allowed";
      }

      setInputError({
        ...inputError,
        [name]: error
      });

      setInputs({
        ...inputs,
        [name]: value
      });
    };

    // Create an input for each unique variable
    return getVariables(formula).map((variable) => (
      <InputTextSlider
        key={variable}
        name={variable}
        value={inputs[variable]}
        error={inputError?.[variable]}
        onChange={handleInputChange}
      />
    ));
  }, [inputs, formula, inputError]);

  return (
    <div className="calculator">
      <h1>Formula Calculator</h1>

      {/* Display the formula using LaTeX */}
      {FeatureFlags.SHOW_PREVIEW && formula && (
        <div className="formula-display">
          <Latex>{`$${formula}$`}</Latex>
        </div>
      )}

      <InputText
        name="formulaInput"
        value={formula}
        label={"Enter Formula"}
        onChange={(e) => setFormula(e.target.value)}
      />

      {/* Dynamic Inputs based on the variables in the formula */}
      <div className="inputs">{generateInputs()}</div>

      {/* Calculate button */}
      <div>
        <button
          disabled={isDisabled}
          className={`${isDisabled ? "disabled" : ""}`}
          onClick={handleCalculate}
        >
          Calculate
        </button>
      </div>

      {/* Save button */}
      {FeatureFlags.ENABLE_SAVE_FORMULA && (
        <div>
          <button
            disabled={isDisabled}
            className={`${isDisabled ? "disabled" : ""}`}
            onClick={() => saveFormula(formula)}
          >
            Save
          </button>
        </div>
      )}

      {/* Display the result */}
      {result !== null && !resultError && (
        <div className="result">
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}

      {/* Display error message */}
      {resultError && (
        <div className="error">
          <p>{resultError}</p>
        </div>
      )}
      {FeatureFlags.SHOW_SAVED_FORMULAS && <SavedFormula />}
    </div>
  );
};

export default FormulaCalculator;
