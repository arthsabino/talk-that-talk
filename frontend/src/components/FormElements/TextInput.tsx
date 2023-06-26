import { FC } from "react";
import { InputProps } from "./props";

const TextInput: FC<{ input: InputProps; label?: string }> = ({
  input,
  label,
}) => {
  return (
    <div className="form-input">
      {label ? <label className="">{label}</label> : null}
      <input type="text" {...input} />
    </div>
  );
};

export default TextInput;
