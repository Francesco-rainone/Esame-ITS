import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const BASE_CLASSES =
  "w-full px-4 py-2.5 rounded-xl border text-sm text-gray-800 bg-white " +
  "placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2";

const DEFAULT_CLASSES =
  "border-gray-200 hover:border-gray-300 focus:ring-blue-500 focus:border-blue-500";

const ERROR_CLASSES =
  "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500";

const Input = ({ hasError = false, className = "", ...props }: InputProps) => (
  <input
    className={`${BASE_CLASSES} ${hasError ? ERROR_CLASSES : DEFAULT_CLASSES} ${className}`}
    {...props}
  />
);

export default Input;