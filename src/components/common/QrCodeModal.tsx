import React from 'react';
import { X, QrCode, Download, ShieldCheck, Printer } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackingId: string;
  orderId: string;
  craftName?: string;
  artisanName?: string;
  destination?: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  trackingId,
  orderId,
  craftName = 'Handmade Craft',
  artisanName = 'Verified Artisan',
  destination = 'Hyderabad, TS'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-craft-100 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-craft-gradient p-5 border-b border-craft-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-craft-600 text-white flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-none">Smart Consignment QR</h3>
              <p className="text-xs text-craft-700 mt-1">ShilpSetu Physical Handover Tag</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-craft-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Content */}
        <div className="p-6 text-center">
          <div className="inline-block p-4 bg-white rounded-2xl border-2 border-dashed border-craft-300 shadow-inner">
            {/* High visual quality simulated QR matrix SVG */}
            <svg
              className="w-52 h-52 mx-auto"
              viewBox="0 0 200 200"
              fill="currentColor"
            >
              {/* Corner position locators */}
              <rect x="10" y="10" width="50" height="50" rx="6" fill="#1E293B" />
              <rect x="20" y="20" width="30" height="30" rx="3" fill="#FFFFFF" />
              <rect x="27" y="27" width="16" height="16" rx="2" fill="#C85A32" />

              <rect x="140" y="10" width="50" height="50" rx="6" fill="#1E293B" />
              <rect x="150" y="20" width="30" height="30" rx="3" fill="#FFFFFF" />
              <rect x="157" y="27" width="16" height="16" rx="2" fill="#C85A32" />

              <rect x="10" y="140" width="50" height="50" rx="6" fill="#1E293B" />
              <rect x="20" y="150" width="30" height="30" rx="3" fill="#FFFFFF" />
              <rect x="27" y="157" width="16" height="16" rx="2" fill="#C85A32" />

              {/* Data modules */}
              <g fill="#334155">
                <rect x="70" y="20" width="12" height="12" rx="2" />
                <rect x="90" y="20" width="12" height="12" rx="2" />
                <rect x="110" y="20" width="12" height="12" rx="2" />
                <rect x="70" y="40" width="12" height="12" rx="2" />
                <rect x="110" y="40" width="12" height="12" rx="2" />

                <rect x="20" y="70" width="12" height="12" rx="2" />
                <rect x="40" y="70" width="12" height="12" rx="2" />
                <rect x="70" y="70" width="12" height="12" rx="2" fill="#C85A32" />
                <rect x="90" y="70" width="12" height="12" rx="2" />
                <rect x="110" y="70" width="12" height="12" rx="2" fill="#C85A32" />
                <rect x="140" y="70" width="12" height="12" rx="2" />
                <rect x="160" y="70" width="12" height="12" rx="2" />

                <rect x="20" y="90" width="12" height="12" rx="2" />
                <rect x="70" y="90" width="12" height="12" rx="2" />
                <rect x="90" y="90" width="20" height="20" rx="3" fill="#C85A32" />
                <rect x="120" y="90" width="12" height="12" rx="2" />
                <rect x="150" y="90" width="12" height="12" rx="2" />

                <rect x="20" y="115" width="12" height="12" rx="2" />
                <rect x="50" y="115" width="12" height="12" rx="2" />
                <rect x="75" y="115" width="12" height="12" rx="2" />
                <rect x="110" y="115" width="12" height="12" rx="2" />
                <rect x="140" y="115" width="12" height="12" rx="2" />
                <rect x="170" y="115" width="12" height="12" rx="2" />

                <rect x="70" y="145" width="12" height="12" rx="2" />
                <rect x="100" y="145" width="12" height="12" rx="2" />
                <rect x="130" y="145" width="12" height="12" rx="2" />
                <rect x="160" y="145" width="12" height="12" rx="2" />

                <rect x="70" y="170" width="12" height="12" rx="2" />
                <rect x="100" y="170" width="12" height="12" rx="2" />
                <rect x="140" y="170" width="12" height="12" rx="2" fill="#C85A32" />
                <rect x="165" y="170" width="12" height="12" rx="2" />
              </g>
            </svg>
          </div>

          <div className="mt-4">
            <span className="text-xs font-mono font-bold tracking-widest text-craft-700 bg-craft-50 px-3 py-1.5 rounded-lg border border-craft-200">
              {trackingId}
            </span>
            <div className="mt-3 text-xs text-slate-600 space-y-1">
              <p><strong className="text-slate-800">Order Ref:</strong> {orderId}</p>
              <p><strong className="text-slate-800">Craft:</strong> {craftName}</p>
              <p><strong className="text-slate-800">Origin:</strong> {artisanName}</p>
              <p><strong className="text-slate-800">Destination:</strong> {destination}</p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-emerald-600">
              <ShieldCheck className="w-4 h-4" /> Privacy Protected (No home address on tag)
            </span>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 font-medium text-craft-600 hover:text-craft-800"
            >
              <Printer className="w-4 h-4" /> Print Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
