import { useDropdownVisibility } from "@/hooks/event";
import { FC, useEffect, useMemo } from "react";
import { MultiSelectDropdownProps, OptionProps } from "./props";

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
  const isAllowed = useMemo(() => options && options.length > 0, [options]);
  const selectOption = (op: OptionProps) => {
    const i = selected.findIndex((x) => x.id === op.id);
    if (i >= 0) {
      setSelected((prev) => prev.filter((x) => x.id !== op.id));
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
      {isOpen && isAllowed && (
        <ul className="form-dropdown">
          {options.map((op, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  selectOption(op);
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
