import React, { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  allowOnly?: "alphabetical" | "numerical";
}

const Input: React.FC<InputProps> = ({
  label,
  register,
  error,
  allowOnly,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const preventInvalidInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.key;

    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    if (allowedKeys.includes(charCode)) return;

    const isAlphabetical =
      allowOnly === "alphabetical" && !/[a-zA-Z]/.test(charCode);
    const isNumerical = allowOnly === "numerical" && !/[0-9]/.test(charCode);

    if (isAlphabetical || isNumerical) {
      e.preventDefault();
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsFocused(false);
    }
  };

  return (
    <div className="relative w-full">
      <input
        onFocus={handleFocus}
        {...inputProps}
        onKeyDown={preventInvalidInput}
        {...register}
        onBlur={handleBlur}
        className={`w-full text-sm p-[15px] border rounded-[6px]  text-primary-text 
          ${error ? "border-red-500" : "border-secondary-default"}`}
      />
      <label
        className={`absolute left-4 text-[#828282] transition-all duration-200 pointer-events-none ${
          isFocused || inputProps.value ? "top-1 text-xs" : "top-4 text-sm"
        }`}
      >
        {label}
      </label>
      {error && (
        <p className="absolute top-[35px] left-[16px] text-red-500 text-xs">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;
