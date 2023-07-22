import { useDropdownVisibility } from "@/hooks/event";
import { FC, useMemo } from "react";
import { MultiSelectDropdownProps } from "./props";

const MultiSelectDropdown: FC<MultiSelectDropdownProps> = ({
  input,
  options,
  containerCls,
  inputCls,
  label,
  onSelect,
}) => {
  const { wrapperRef, isOpen, setIsOpen } = useDropdownVisibility();
  const isAllowed = useMemo(() => options && options.length > 0, [options]);
  return (
    <div
      className={`form-input select-input relative ${containerCls ?? ""}`}
      ref={wrapperRef}
    >
      {label ? <label className="">{label}</label> : null}
      <input
        {...input}
        type="text"
        onFocus={() => setIsOpen(true)}
        className={inputCls}
      />
      {isOpen && isAllowed && (
        <ul className="form-dropdown">
          {options.map((op, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  onSelect(op);
                  setIsOpen(false);
                }}
              >
                {op.text}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
