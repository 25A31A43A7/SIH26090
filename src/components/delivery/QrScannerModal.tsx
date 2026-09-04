import React, { useState } from 'react';
import { X, QrCode, Scan, CheckCircle2, ShieldCheck } from 'lucide-react';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (trackingId: string) => void;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess
}) => {
  const [scanning, setScanning] = useState(false);
  const [scannedId, setScannedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = (id: string = 'SHP-2026-7K29A4') => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScannedId(id);
      setTimeout(() => {
        onScanSuccess(id);
        onClose();
      }, 900);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center">
              <Scan className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Handover QR Scanner</h3>
              <p className="text-xs text-slate-500">Logistics Package Physical Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder simulation */}
        <div className="p-6 text-center space-y-4">
          <div className="relative w-64 h-64 mx-auto rounded-3xl bg-slate-900 flex items-center justify-center overflow-hidden border-4 border-slate-800 shadow-inner">
            {/* Viewfinder Reticle */}
            <div className="absolute inset-6 border-2 border-dashed border-amber-400/80 rounded-2xl animate-pulse flex items-center justify-center">
              <QrCode className="w-24 h-24 text-slate-700" />
            </div>

            {/* Laser scanning bar */}
            {scanning && (
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-bounce shadow-lg shadow-amber-400/50" />
            )}

            {scannedId && (
              <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-xs flex flex-col items-center justify-center text-white p-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-2 animate-scale-up" />
                <span className="font-bold text-sm">QR Code Verified!</span>
                <span className="font-mono text-xs text-amber-300 mt-1">{scannedId}</span>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-500">
            Point camera at the printed physical handicraft consignment label
          </p>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleSimulateScan('SHP-2026-7K29A4')}
              disabled={scanning}
              className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Scan className="w-4 h-4" />
              <span>Simulate Physical Scan (SHP-2026-7K29A4)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
