"use client";

import { useToastStore } from "@/lib/stores/toastStore";

const typeStyles = {
  success: "border-green-500 bg-gray-800",
  error: "border-red-500 bg-gray-800",
  info: "border-blue-500 bg-gray-800",
};

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const dismissToast = useToastStore((state) => state.dismissToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 flex max-w-sm flex-col gap-2 sm:bottom-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={`rounded-lg border-l-4 px-4 py-3 text-sm text-white shadow-lg ${typeStyles[toast.type]}`}
        >
          <div className="flex items-start justify-between gap-3">
            <p>{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="text-gray-400 hover:text-white"
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
