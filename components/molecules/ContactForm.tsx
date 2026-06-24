"use client";
import { useEffect, memo, useCallback, useRef, useMemo } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/components/molecules/Toast";
import { submitCandidatura, type FormState } from "@/app/actions";
import type { FieldConfig, AccentColor } from "@/utils/types";
import Spinner from "@/components/atoms/Spinner";
import FormField from "@/components/molecules/FormField";

interface AccentClasses {
  btn: string;
  ring: string;
}

interface ContactFormProps {
  fields: FieldConfig[];
  title?: string;
  subtitle?: string;
  submitLabel: string;
  onSuccess: () => void;
  accentColor?: AccentColor;
}


const ACCENTS: Record<AccentColor, AccentClasses> = {
  slate:   { btn: "bg-slate-600 hover:bg-slate-700",     ring: "focus:ring-slate-500 focus:border-slate-500" },
  gray:    { btn: "bg-gray-600 hover:bg-gray-700",       ring: "focus:ring-gray-500 focus:border-gray-500" },
  zinc:    { btn: "bg-zinc-600 hover:bg-zinc-700",       ring: "focus:ring-zinc-500 focus:border-zinc-500" },
  neutral: { btn: "bg-neutral-600 hover:bg-neutral-700", ring: "focus:ring-neutral-500 focus:border-neutral-500" },
  stone:   { btn: "bg-stone-600 hover:bg-stone-700",     ring: "focus:ring-stone-500 focus:border-stone-500" },
  red:     { btn: "bg-red-600 hover:bg-red-700",         ring: "focus:ring-red-500 focus:border-red-500" },
  orange:  { btn: "bg-orange-600 hover:bg-orange-700",   ring: "focus:ring-orange-500 focus:border-orange-500" },
  amber:   { btn: "bg-amber-500 hover:bg-amber-600",     ring: "focus:ring-amber-500 focus:border-amber-500" },
  yellow:  { btn: "bg-yellow-500 hover:bg-yellow-600",   ring: "focus:ring-yellow-500 focus:border-yellow-500" },
  lime:    { btn: "bg-lime-500 hover:bg-lime-600",       ring: "focus:ring-lime-500 focus:border-lime-500" },
  green:   { btn: "bg-green-600 hover:bg-green-700",     ring: "focus:ring-green-500 focus:border-green-500" },
  emerald: { btn: "bg-emerald-600 hover:bg-emerald-700", ring: "focus:ring-emerald-500 focus:border-emerald-500" },
  teal:    { btn: "bg-teal-600 hover:bg-teal-700",       ring: "focus:ring-teal-500 focus:border-teal-500" },
  cyan:    { btn: "bg-cyan-600 hover:bg-cyan-700",       ring: "focus:ring-cyan-500 focus:border-cyan-500" },
  sky:     { btn: "bg-sky-500 hover:bg-sky-600",         ring: "focus:ring-sky-500 focus:border-sky-500" },
  blue:    { btn: "bg-blue-600 hover:bg-blue-700",       ring: "focus:ring-blue-500 focus:border-blue-500" },
  indigo:  { btn: "bg-indigo-600 hover:bg-indigo-700",   ring: "focus:ring-indigo-500 focus:border-indigo-500" },
  violet:  { btn: "bg-violet-600 hover:bg-violet-700",   ring: "focus:ring-violet-500 focus:border-violet-500" },
  purple:  { btn: "bg-purple-600 hover:bg-purple-700",   ring: "focus:ring-purple-500 focus:border-purple-500" },
  fuchsia: { btn: "bg-fuchsia-600 hover:bg-fuchsia-700", ring: "focus:ring-fuchsia-500 focus:border-fuchsia-500" },
  pink:    { btn: "bg-pink-600 hover:bg-pink-700",       ring: "focus:ring-pink-500 focus:border-pink-500" },
  rose:    { btn: "bg-rose-600 hover:bg-rose-700",       ring: "focus:ring-rose-500 focus:border-rose-500" },
  brown:   { btn: "bg-amber-700 hover:bg-amber-800",     ring: "focus:ring-amber-700 focus:border-amber-700" },
};

const FORM_CONTAINER_CLASSES = "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8";

const INITIAL_FORM_STATE: FormState = {
  success: false,
  message: "",
};

const SubmitButton = ({ label, accentClass }: { label: string; accentClass: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`mt-6 w-full py-3.5 rounded-2xl text-white font-bold text-base transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${accentClass}`}
    >
      {pending ? (
        <>
          <Spinner size="md" />
          Invio in corso…
        </>
      ) : (
        label
      )}
    </button>
  );
};

const FormErrorBanner = memo(({ message }: { message: string }) => (
  <div
    role="alert"
    className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
  >
    ⚠️ {message}
  </div>
));
FormErrorBanner.displayName = "FormErrorBanner";

const FormSuccessMessage = memo(({
  message,
  onReset,
}: {
  message: string;
  onReset: () => void;
}) => (
  <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
    <div className="text-5xl mb-4">✅</div>
    <p className="text-green-800 font-semibold text-lg mb-4">{message}</p>
    <button
      onClick={onReset}
      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors"
    >
      Invia un&apos;altra candidatura
    </button>
  </div>
));
FormSuccessMessage.displayName = "FormSuccessMessage";

const FormRows = memo(({ rows, ringColor }: { rows: FieldConfig[][]; ringColor: string }) => (
  <div className="space-y-4">
    {rows.map((row, ri) => (
      <div key={ri} className={`grid gap-4 ${row.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
        {row.map((f) => (
          <FormField key={f.name} field={f} ringColor={ringColor} />
        ))}
      </div>
    ))}
  </div>
));
FormRows.displayName = "FormRows";

const FormContent = memo(({
  rows,
  ringColor,
  submitLabel,
  accentClass,
}: {
  rows: FieldConfig[][];
  ringColor: string;
  submitLabel: string;
  accentClass: string;
}) => (
  <>
    <FormRows rows={rows} ringColor={ringColor} />
    <SubmitButton label={submitLabel} accentClass={accentClass} />
  </>
));
FormContent.displayName = "FormContent";

const useFieldRows = (fields: FieldConfig[]): FieldConfig[][] => {
  return useMemo(() => {
    return fields.reduce<FieldConfig[][]>((acc, field) => {
      if (field.half) {
        const lastRow = acc[acc.length - 1];
        if (lastRow && lastRow.length === 1 && lastRow[0].half) {
          lastRow.push(field);
        } else {
          acc.push([field]);
        }
      } else {
        acc.push([field]);
      }
      return acc;
    }, []);
  }, [fields]);
};

const ContactForm = ({
  fields = [],
  title = "",
  subtitle = "",
  submitLabel = "Invia",
  onSuccess,
  accentColor = "blue",
}: ContactFormProps) => {
  const acc = ACCENTS[accentColor];
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, dispatch] = useActionState(
    (prevState: FormState, formData: FormData) =>
      submitCandidatura(fields, prevState, formData),
    INITIAL_FORM_STATE
  );

  const rows = useFieldRows(fields);
  const prevStateRef = useRef<FormState>(INITIAL_FORM_STATE);

  const handleReset = useCallback(() => {
    formRef.current?.reset();
    dispatch(new FormData());
  }, [dispatch]);

  useEffect(() => {
    if (state.message && state !== prevStateRef.current) {
      if (state.success) {
        toast.success(state.message);
        onSuccess?.();
      } else {
        toast.error(state.message);
      }
      prevStateRef.current = state;
    }
  }, [state, toast, onSuccess]);

  const hasError = Boolean(state.message && !state.success);

  if (state.success) {
    return <FormSuccessMessage message={state.message} onReset={handleReset} />;
  }

  return (
    <div className={FORM_CONTAINER_CLASSES}>
      {title && <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>}
      {subtitle && <p className="text-sm text-gray-500 mb-6">{subtitle}</p>}

      {hasError && <FormErrorBanner message={state.message} />}

      <form ref={formRef} action={dispatch} noValidate>
        <FormContent
          rows={rows}
          ringColor={acc.ring}
          submitLabel={submitLabel}
          accentClass={acc.btn}
        />
      </form>
    </div>
  );
};

export default ContactForm;