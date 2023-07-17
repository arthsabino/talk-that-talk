import { useDropdownVisibility } from "@/hooks/event";
import { FC, useEffect } from "react";
import { MultiSelectDropdownProps } from "./props";

const MultiSelectDropdown: FC<MultiSelectDropdownProps> = ({
  input,
  options,
  containerCls,
  label,
  onSelect,
  selected,
  setSelected,
}) => {
  
  const { wrapperRef, isOpen, setIsOpen } = useDropdownVisibility();
  const selectOption = (op: string) => {
    const i = selected.findIndex((x) => x === op);
    if (i >= 0) {
      setSelected((prev) => prev.filter((x) => x !== op));
    } else {
      setSelected(Array.from(new Set([...selected, op])));
    }
    setIsOpen(false);
  };
  useEffect(() => {
    if (onSelect && selected) {
      onSelect(selected);
    }
  }, [onSelect, selected]);

  return (
    <div
      className={`form-input select-input relative ${containerCls ?? ""}`}
      ref={wrapperRef}
    >
      {label ? <label className="">{label}</label> : null}
      <input {...input} type="text" onFocus={() => setIsOpen(true)} />
      {isOpen && (
        <ul className="form-dropdown">
          {options.map((op, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  selectOption(op);
                }}
              >
                {op}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
