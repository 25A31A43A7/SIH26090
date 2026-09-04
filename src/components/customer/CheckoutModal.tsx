import React, { useState } from 'react';
import { OrderItem, CustomerAddress } from '../../types';
import { orderService } from '../../services/orderService';
import { paymentService } from '../../services/paymentService';
import { authService } from '../../services/authService';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  Loader2,
  Lock,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  const currentUser = authService.getCurrentUser();

  const [address, setAddress] = useState<CustomerAddress>({
    name: currentUser?.name || 'Aarav Sharma',
    phone: currentUser?.phone || '+91 98765 43210',
    addressLine: 'Flat 402, Royal Residency, Road No. 12',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500034',
    generalArea: 'Banjara Hills, Hyderabad'
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'COD'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 2000 ? 0 : 50;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStep('processing');

    // 1. Process simulated payment
    await paymentService.processPayment('TEMP', total, paymentMethod);

    // 2. Create order in orderService (Status: PENDING_ARTISAN_APPROVAL)
    const newOrder = orderService.createOrder(
      currentUser?.userId || 'usr_customer_1',
      address.name,
      address.phone,
      address,
      items,
      subtotal,
      deliveryFee
    );

    setConfirmedOrderId(newOrder.orderId);
    setIsProcessing(false);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-craft-600 text-white flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Direct Artisan Checkout</h3>
              <p className="text-xs text-slate-500">Encrypted • 100% Direct Craftsperson Payout</p>
            </div>
          </div>
          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        {step === 'details' && (
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Shipping Address Section */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>1. Delivery Destination Address</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={address.name}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-craft-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Mobile Phone (for SMS Updates)</label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-craft-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Street Address / House No.</label>
                  <input
                    type="text"
                    required
                    value={address.addressLine}
                    onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-craft-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">City / General Area</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value, generalArea: `${address.city}, ${address.state}` })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-craft-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-craft-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span>2. Select Payment Method (Simulated Demo)</span>
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'UPI'
                      ? 'border-craft-600 bg-craft-50 text-craft-800 ring-2 ring-craft-400'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-craft-600" />
                  <span className="text-xs font-bold">UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'CARD'
                      ? 'border-craft-600 bg-craft-50 text-craft-800 ring-2 ring-craft-400'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-craft-600" />
                  <span className="text-xs font-bold">Card / Debit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'COD'
                      ? 'border-craft-600 bg-craft-50 text-craft-800 ring-2 ring-craft-400'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-craft-600" />
                  <span className="text-xs font-bold">Cash on Del.</span>
                </button>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Items Subtotal ({items.length} items)</span>
                <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Verified Artisan Smart Delivery</span>
                <span className="font-semibold text-slate-900">
                  {deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Payable</span>
                <span className="text-base text-craft-700">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-craft-600 hover:bg-craft-700 text-white font-bold text-sm shadow-lg shadow-craft-600/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <span>Authorize & Place Order (₹{total.toLocaleString('en-IN')})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Processing State */}
        {step === 'processing' && (
          <div className="p-12 text-center space-y-4">
            <Loader2 className="w-12 h-12 text-craft-600 animate-spin mx-auto" />
            <h3 className="text-xl font-bold text-slate-900">Processing Artisan Order</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Simulating secure payment gateway transaction and notifying artisan workshop...
            </p>
          </div>
        )}

        {/* Success State */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">Order Placed Successfully!</h3>
              <p className="text-sm text-slate-600 mt-1">
                Order Reference: <strong className="text-craft-700 font-mono">{confirmedOrderId}</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-left space-y-1.5">
              <p className="font-bold flex items-center gap-1.5 text-amber-950">
                <span>🔔 Next Hackathon Step: Artisan Order Acceptance</span>
              </p>
              <p>
                Your order has reached the artisan's studio. Switch to the <strong>Artisan Persona (Lakshmi Devi)</strong> in the top toolbar to see the voice approval in action!
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOrderSuccess(confirmedOrderId);
                }}
                className="flex-1 py-3 rounded-xl bg-craft-600 text-white font-bold text-sm shadow-md"
              >
                View in Customer Dashboard
              </button>
              <button
                onClick={onClose}
                className="py-3 px-5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
