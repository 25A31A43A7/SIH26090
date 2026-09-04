import React, { useEffect, useState } from 'react';
import { smsService } from '../../services/smsService';
import { SmsLog } from '../../types';
import { MessageSquare, Smartphone, X, CheckCheck, Clock } from 'lucide-react';

export const SmsSimulatorModal: React.FC = () => {
  const [latestSms, setLatestSms] = useState<SmsLog | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [allLogs, setAllLogs] = useState<SmsLog[]>([]);

  useEffect(() => {
    const unsubLatest = smsService.subscribeLatestSms((sms) => {
      setLatestSms(sms);
      if (sms) {
        // Automatically pop open preview banner
        setIsOpen(true);
      }
    });

    const unsubLogs = smsService.subscribeLogs((logs) => {
      setAllLogs(logs);
    });

    return () => {
      unsubLatest();
      unsubLogs();
    };
  }, []);

  if (!isOpen || !latestSms) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full animate-bounce-short">
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-4 relative overflow-hidden backdrop-blur-md">
        {/* Subtle phone status bar */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-1.5 font-medium">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>SIMULATED SMS DISPATCH</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{latestSms.phone}</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-0.5 rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Message Content */}
        <div className="mt-3 flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-craft-600/30 border border-craft-500/40 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-4 h-4 text-craft-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-300">SHILP-SETU-AI</span>
              <span className="text-[10px] text-slate-400">{latestSms.timestamp}</span>
            </div>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 font-mono">
              {latestSms.message}
            </p>
            <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCheck className="w-3 h-3" /> Delivered to telecom carrier
              </span>
              {latestSms.trackingId && (
                <span className="font-semibold text-craft-300">{latestSms.trackingId}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
