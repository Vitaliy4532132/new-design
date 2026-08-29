"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Check, Info, TriangleAlert, X } from "lucide-react";

type ToastKind = "success" | "error" | "info";

type Toast = {
  id: number;
  kind: ToastKind;
  title: string;
  text?: string;
};

const LIFETIME = 4500;

const KIND = {
  success: { Icon: Check, ring: "ring-green-400/30", tint: "text-green-400", bar: "bg-green-400" },
  error: { Icon: TriangleAlert, ring: "ring-red-500/30", tint: "text-red-400", bar: "bg-red-400" },
  info: { Icon: Info, ring: "ring-brand/30", tint: "text-brand", bar: "bg-brand" },
} as const;

type ToastFn = (kind: ToastKind, title: string, text?: string) => void;

const ToastContext = createContext<ToastFn>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

function ToastCard({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const { Icon, ring, tint, bar } = KIND[toast.kind];
  const [leaving, setLeaving] = useState(false);

  const close = useCallback(() => {
    // Даём уехать анимации, прежде чем убрать из списка.
    setLeaving(true);
    setTimeout(onClose, 180);
  }, [onClose]);

  useEffect(() => {
    const id = setTimeout(close, LIFETIME);
    return () => clearTimeout(id);
  }, [close]);

  return (
    <div
      role="status"
      className={`pointer-events-auto relative w-full overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_16px_40px_rgba(0,0,0,0.55)] ring-1 ${ring} ${
        leaving ? "animate-toast-out" : "animate-toast-in"
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <span className={`mt-0.5 shrink-0 ${tint}`}>
          <Icon size={16} />
        </span>

        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium">{toast.title}</div>
          {toast.text && <p className="mt-1 text-xs leading-relaxed text-text-muted">{toast.text}</p>}
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Закрыть"
          className="shrink-0 text-text-dim transition-colors hover:text-white"
        >
          <X size={15} />
        </button>
      </div>

      {/* Полоса показывает, сколько осталось до автозакрытия */}
      <span
        className={`absolute bottom-0 left-0 h-0.5 animate-toast-timer ${bar}`}
        style={{ animationDuration: `${LIFETIME}ms` }}
      />
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const push = useCallback<ToastFn>((kind, title, text) => {
    const id = nextId.current++;
    // Больше трёх на экране — нижние уже не читают, поэтому вытесняем старые.
    setToasts((list) => [...list, { id, kind, title, text }].slice(-3));
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}

      <div className="pointer-events-none fixed right-4 bottom-4 z-[100] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:bottom-6">
        {toasts.map((t) => (
          <ToastCard
            key={t.id}
            toast={t}
            onClose={() => setToasts((list) => list.filter((x) => x.id !== t.id))}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
