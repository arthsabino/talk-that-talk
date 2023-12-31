import { FC } from "react";
import { TextInputProps } from "./props";

const TextInput: FC<TextInputProps> = ({
  input,
  label,
  containerCls,
  inputCls,
}) => {
  return (
    <div className={`form-input ${containerCls ?? ""}`}>
      {label ? <label className="">{label}</label> : null}
      <input type="text" {...input} className={inputCls} />
    </div>
  );
};

export default TextInput;
