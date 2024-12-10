import React, { ChangeEvent, memo } from "react";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { FeatureFlags } from "../utils";

interface Props {
  name?: string;
  value?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputTextSlider: React.FC<Props> = ({
  name,
  value,
  onChange,
  error
}: Props) => {
  return (
    <div key={name} className="input-container">
      <label>
        <Latex>{`$${name}$ = ${value || 0}`}</Latex>
        <span className="error">{error ? ` (${error})` : ""}</span>
      </label>
      {/* Textbox */}
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        className="textbox-input"
      />
      {/* Slider */}
      {FeatureFlags.SHOW_SLIDER && (
        <input
          type="range"
          name={name}
          min="0"
          max="100"
          step="1"
          value={value || ""}
          onChange={onChange}
          className="slider-input"
        />
      )}
    </div>
  );
};

export default memo(InputTextSlider);
