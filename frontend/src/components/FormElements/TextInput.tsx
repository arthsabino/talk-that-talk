import { FC } from "react";
import { InputProps } from "./props";

const TextInput: FC<{
  input: InputProps;
  label?: string;
  inputCls?: string;
  containerCls?: string;
}> = ({ input, label, containerCls, inputCls }) => {
  return (
    <div className={`form-input ${containerCls ?? ""}`}>
      {label ? <label className="">{label}</label> : null}
      <input type="text" {...input} className={inputCls} />
    </div>
  );
};

export default TextInput;
