"use client";
import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import type { ReactNode } from "react";
import type { ToastItem } from "@/utils/types";

interface ToastContextType {
  toast: {
    success: (msg: string) => void;
    error: (msg: string) => void;
    info: (msg: string) => void;
    warning: (msg: string) => void;
  };
}

const ToastCtx = createContext<ToastContextType | null>(null);

const TOAST_STYLES: Record<ToastItem["type"], { bg: string; icon: string; text: string }> = {
  success: { bg: "bg-white border-l-4 border-l-emerald-500",  icon: "✅", text: "text-emerald-800" },
  error:   { bg: "bg-white border-l-4 border-l-red-500",     icon: "❌", text: "text-red-800" },
  info:    { bg: "bg-white border-l-4 border-l-blue-500",    icon: "ℹ️",  text: "text-blue-800" },
  warning: { bg: "bg-white border-l-4 border-l-amber-400",   icon: "⚠️",  text: "text-amber-800" },
};

const POSITIONS: Record<string, string> = {
  "top-right":     "top-4 right-4",
  "top-center":    "top-4 left-1/2 -translate-x-1/2",
  "bottom-right":  "bottom-4 right-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

const ToastItemComponent = ({
  toast,
  onRemove,
  duration,
}: {
  toast: ToastItem;
  onRemove: (id: number | string) => void;
  duration: number;
}) => {
  const style = TOAST_STYLES[toast.type] ?? TOAST_STYLES.info;

  useEffect(() => {
    if (!duration) return;
    const id = setTimeout(() => onRemove(toast.id), duration);
    return () => clearTimeout(id);
  }, [toast.id, duration, onRemove]);

  return (
    <div
      className={`flex items-start gap-3 w-80 px-4 py-3.5 rounded-xl shadow-lg border border-gray-100 ${style.bg} animate-in slide-in-from-right-4 fade-in duration-300`}
      role="alert"
    >
      <span className="text-lg shrink-0 mt-0.5">{style.icon}</span>
      <p className={`text-sm font-medium flex-1 leading-snug ${style.text}`}>{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition ml-1"
        aria-label="Chiudi"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onRemove: (id: number | string) => void;
  position?: string;
  duration?: number;
}

export const ToastContainer = ({
  toasts = [],
  onRemove,
  position = "top-right",
  duration = 4000,
}: ToastContainerProps) => {
  const pos = POSITIONS[position] ?? POSITIONS["top-right"];

  return (
    <div className={`fixed ${pos} z-[9999] flex flex-col gap-2 pointer-events-none`}>
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItemComponent toast={t} onRemove={onRemove} duration={duration} />
        </div>
      ))}
    </div>
  );
}

export const ToastProvider = ({
  children,
  position = "top-right",
  duration = 4000,
}: {
  children: ReactNode;
  position?: string;
  duration?: number;
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const add = useCallback((message: string, type: ToastItem["type"]) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    setToasts((p) => [...p, { id, message, type }]);
    return id;
  }, []);

  const remove = useCallback((id: number | string) => {
    setToasts((p) => p.filter((t) => t.id !== id));
  }, []);

  const toast: ToastContextType["toast"] = {
    success: (msg) => add(msg, "success"),
    error:   (msg) => add(msg, "error"),
    info:    (msg) => add(msg, "info"),
    warning: (msg) => add(msg, "warning"),
  };

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={remove} position={position} duration={duration} />
    </ToastCtx.Provider>
  );
}

export const useToast = (): ToastContextType => {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast deve essere usato dentro <ToastProvider>");
  return ctx;
};