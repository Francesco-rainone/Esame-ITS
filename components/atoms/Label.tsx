import type { LabelHTMLAttributes, ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
}

const BASE_CLASSES = "block text-sm font-semibold text-gray-700 mb-1.5";

const Label = ({ children, required = false, className = "", ...props }: LabelProps) => (
  <label className={`${BASE_CLASSES} ${className}`} {...props}>
    {children}
    {/* Asterisco obbligatorietà — cambia "text-red-500" per un colore diverso */}
    {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
  </label>
);

export default Label;