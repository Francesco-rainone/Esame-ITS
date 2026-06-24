"use client";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import type { FieldConfig } from "@/utils/types";

interface FormFieldProps {
  field: FieldConfig;
  error?: string;
  ringColor?: string;
}

export default function FormField({
  field,
  error = "",
  ringColor = "focus:ring-blue-500 focus:border-blue-500",
}: FormFieldProps) {
  const hasError = Boolean(error);

  const renderInput = () => {
    const commonProps = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder ?? "",
      required: field.required,
      hasError,
      className: ringColor,
    };

    switch (field.type) {
      case "textarea":
        return (
          <div>
            <Textarea
              {...commonProps}
              rows={field.rows ?? 4}
              maxLength={field.maxLength}
            />
            {field.maxLength && (
              <p className="text-right text-xs text-gray-400 mt-0.5">
                Max {field.maxLength} caratteri
              </p>
            )}
          </div>
        );

      case "select":
        return (
          <select
            id={field.name}
            name={field.name}
            required={field.required}
            aria-label={field.label}
            aria-required={field.required}
            aria-invalid={hasError ? "true" : "false"}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-800 bg-white transition-colors focus:outline-none focus:ring-2 ${
              hasError
                ? "border-red-400 bg-red-50 focus:ring-red-500 focus:border-red-500"
                : `border-gray-200 hover:border-gray-300 ${ringColor}`
            }`}
          >
            <option value="">— Seleziona —</option>
            {(field.options ?? []).map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <fieldset>
            <legend className="sr-only">{field.label}</legend>
            <div className="flex flex-wrap gap-4">
              {(field.options ?? []).map((o) => (
                <label
                  key={o}
                  className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 select-none"
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={o}
                    className="w-4 h-4 accent-blue-700"
                    required={field.required}
                  />
                  {o}
                </label>
              ))}
            </div>
          </fieldset>
        );

      case "checkbox":
        return (
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name={field.name}
              className="w-4 h-4 mt-0.5 shrink-0 accent-blue-700"
              required={field.required}
              aria-required={field.required}
            />
            <span className="text-sm text-gray-600">{field.label}</span>
          </label>
        );

      default:
        return (
          <Input
            {...commonProps}
            type={field.type ?? "text"}
            min={field.min}
            max={field.max}
            maxLength={field.maxLength}
          />
        );
    }
  };

  return (
    <div>
      {field.type !== "checkbox" && (
        <Label htmlFor={field.name} required={field.required}>
          {field.label}
        </Label>
      )}
      {renderInput()}
      {field.hint && !hasError && (
        <p className="mt-1 text-xs text-gray-400">{field.hint}</p>
      )}
      {hasError && (
        // FIX: use role="alert" so screen readers announce the error immediately
        <p className="mt-1 text-xs text-red-600" role="alert">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}