"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { Icon } from "@iconify/react";

type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<ToastVariant, string> = {
  success: "mdi:check-circle",
  error: "mdi:alert-circle",
  warning: "mdi:alert",
  info: "mdi:information",
};

const colors: Record<ToastVariant, string> = {
  success: "text-primary border-primary/30",
  error: "text-red-400 border-red-400/30",
  warning: "text-amber-400 border-amber-400/30",
  info: "text-primary border-primary/30",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const add = useCallback((message: string, variant: ToastVariant = "info") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: add }}>
      {children}
      <div className="fixed top-20 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-high/90 backdrop-blur-md border shadow-2xl shadow-black/30 min-w-[280px] max-w-sm animate-toast-in ${colors[t.variant]}`}
            role="alert"
          >
            <Icon icon={icons[t.variant]} className="text-xl shrink-0" />
            <p className="text-sm text-on-surface flex-1">{t.message}</p>
            <button
              onClick={() => remove(t.id)}
              className="text-on-surface-variant hover:text-on-surface shrink-0"
            >
              <Icon icon="mdi:close" className="text-base" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
