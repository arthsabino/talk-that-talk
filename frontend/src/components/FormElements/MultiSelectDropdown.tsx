import { FC, useEffect, useState } from "react";
import { MultiSelectDropdownProps } from "./props";

const MultiSelectDropdown: FC<MultiSelectDropdownProps> = ({
  options,
  containerCls,
  label,
  onSelect,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const selectOption = (op: string) => {
    const i = selected.findIndex((x) => x === op);
    if (i > 0) {
      setSelected((prev) => prev.filter((x) => x === op));
    } else {
      setSelected(Array.from(new Set([...selected, op])));
    }
  };
  useEffect(() => {
    if (onSelect && selected) {
      console.log(selected);
      onSelect(selected);
    }
  }, [onSelect, selected]);
  return (
    <div className={`form-input select-input relative ${containerCls ?? ""}`}>
      {label ? <label className="">{label}</label> : null}
      <input type="text" onFocus={() => setShowDropdown(true)} />
      {showDropdown && (
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
