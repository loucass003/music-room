import { ReactNode } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { Toast } from '../components/commons/ui/Toast';


export function ToastifyProvider({ children }: { children: ReactNode }) {
  return (
    <ToastProvider components={{ Toast: Toast }}>
      {children}
    </ToastProvider>
  );
}