import React from "react";
import { ReactComponent as ArrowDown } from "assets/arrow-down.svg";

interface SelectProps {
  options: string[];
  value: string; // selected value
  onChange: (value: string) => void; // callback function for value change
  label?: string; // optional label
  isDisabled?: boolean;
  placeholder?: string; // optional placeholder
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  isDisabled = false,
}) => {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={
          "w-full text-sm border rounded-md text-primary-text bg-white p-[15px] pt-[25px] pb-2 appearance-none"
        }
        disabled={isDisabled}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="absolute top-[22px] right-4">
        <ArrowDown height={12} width={12} />
      </span>
      <label
        className={
          "absolute left-4 transition-all top-2 text-xs text-[#828282]"
        }
      >
        {label}
      </label>
    </div>
  );
};

export default Select;
