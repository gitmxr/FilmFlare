import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { devtoolsConfig } from "@/lib/stores/devtools";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

const TOAST_DURATION_MS = 4000;

interface ToastStore {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>()(
  devtools(
    (set, get) => ({
      toasts: [],
      showToast: (message, type = "info") => {
        const id = crypto.randomUUID();
        set((state) => ({
          toasts: [...state.toasts, { id, message, type }],
        }));
        setTimeout(() => {
          get().dismissToast(id);
        }, TOAST_DURATION_MS);
      },
      dismissToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
    }),
    { name: "ToastStore", ...devtoolsConfig }
  )
);
