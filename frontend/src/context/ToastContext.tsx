import { createContext } from 'react';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  undoAction?: () => void;
  closeToast?: () => void;
}

export interface ToastContextType {
  showToast: (props: ToastProps) => void;
  toastId: React.MutableRefObject<string | null>;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
