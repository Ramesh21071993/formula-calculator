import React, { memo } from "react";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { useFormulaContext } from "../context";
import { FeatureFlags } from "../utils";

const SavedFormulas: React.FC = () => {
  const { getSavedFormulas, setFormula, deleteFormula } = useFormulaContext();

  const formulas = getSavedFormulas();

  return (
    <div className="list-container">
      <h3>Saved Formulas</h3>
      {!formulas?.length && <span>No saved formulas</span>}
      {(formulas || []).map((formula, index) => (
        <div className="formula-container">
          <div
            className="formula-section"
            key={index}
            onClick={() => setFormula(formula)}
          >
            <Latex>{`$${formula}$`}</Latex>
          </div>
          {FeatureFlags.ENABLE_FORMULA_DELETE && (
            <div
              className="formula-section"
              onClick={() => deleteFormula(formula)}
            >
              Delete
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(SavedFormulas);
