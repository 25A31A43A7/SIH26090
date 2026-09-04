import React, { useEffect, useState } from 'react';
import { notificationService, ToastMessage } from '../../services/notificationService';
import { CheckCircle2, AlertCircle, Info, X, Bell } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    return notificationService.subscribeToasts((currentToasts) => {
      setToasts(currentToasts);
    });
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        let border = 'border-amber-200 bg-white';
        let icon = <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />;

        if (toast.type === 'success') {
          border = 'border-emerald-200 bg-emerald-50/95';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
        } else if (toast.type === 'error' || toast.type === 'warning') {
          border = 'border-rose-200 bg-rose-50/95';
          icon = <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
        } else {
          border = 'border-craft-200 bg-white/95';
          icon = <Bell className="w-5 h-5 text-craft-600 flex-shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-sm transition-all duration-300 animate-slide-in ${border}`}
          >
            <div className="flex items-start gap-3">
              {icon}
              <div>
                <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                  {toast.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {toast.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => notificationService.removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
