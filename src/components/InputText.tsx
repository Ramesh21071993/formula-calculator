import React, { ChangeEvent, memo } from "react";
import "katex/dist/katex.min.css";

interface Props {
  name?: string;
  value?: string;
  error?: string;
  label?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputText: React.FC<Props> = ({
  name,
  value,
  onChange,
  error,
  label
}: Props) => {
  return (
    <div key={name} className="inputs">
      <label htmlFor={name}>
        {label}
        <span className="error">{error ? ` (${error})` : ""}</span>
      </label>
      <input
        type="text"
        id={name}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(InputText);
