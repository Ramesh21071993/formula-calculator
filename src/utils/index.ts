export const FeatureFlags = {
  SHOW_PREVIEW: true,
  SHOW_SAVED_FORMULAS: true,
  SHOW_SLIDER: true,
  ENABLE_SAVE_FORMULA: true,
  ENABLE_FORMULA_DELETE: true
};

export const isOnlyNumbers = (value?: string) => {
  const onlyNumbers = new RegExp("^[0-9]+$");
  return value && value.trim() && onlyNumbers.test(value);
};

export const isValidFormula = (sanitizedFormula: string) => {
  const validCharsRegex = /^[0-9+\-*/^().a-zA-Z\s]*$/;
  return validCharsRegex.test(sanitizedFormula);
};

export const getVariables = (formula: string) => {
  const variables = formula.match(/[a-zA-Z]+/g); // Match all variables (e.g., a, b, x)
  return variables ? Array.from(new Set(variables)) : []; // Remove duplicates
};

export const replaceVariableValue = (
  inputs: { [key: string]: string },
  formula: string
) => {
  for (const key in inputs) {
    if (inputs.hasOwnProperty(key)) {
      const regex = new RegExp(`\\b${key}\\b`, "g"); // Match whole word for the variable
      formula = formula.replace(regex, inputs[key] || "0"); // Replace with the input value or 0 if empty
    }
  }
  return formula;
};
