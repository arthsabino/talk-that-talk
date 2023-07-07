import { FC } from "react";
import { DropdownProps } from "./props";

const MultiSelectDropdown: FC<DropdownProps> = ({
  options,
  containerCls,
  label,
}) => {
  return (
    <div className={`form-input ${containerCls ?? ""}`}>
      {label ? <label className="">{label}</label> : null}
    </div>
  );
};

export default MultiSelectDropdown;
