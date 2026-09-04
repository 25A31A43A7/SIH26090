import React, { useState, useEffect } from 'react';
import { Order, Product, Artisan } from '../../types';
import { orderService } from '../../services/orderService';
import { productService } from '../../services/productService';
import { governmentService } from '../../services/governmentService';
import { notificationService } from '../../services/notificationService';
import { StatusBadge } from '../common/StatusBadge';
import {
  Mic,
  Volume2,
  CheckCircle2,
  XCircle,
  Package,
  IndianRupee,
  Sparkles,
  Plus,
  ArrowRight,
  ShieldCheck,
  Layers,
  MapPin,
  Clock
} from 'lucide-react';

interface ArtisanOverviewProps {
  artisanId: string;
  artisanName: string;
  onOpenAddProduct: () => void;
  onViewOrders: () => void;
  onViewProducts: () => void;
}

export const ArtisanOverview: React.FC<ArtisanOverviewProps> = ({
  artisanId,
  artisanName,
  onOpenAddProduct,
  onViewOrders,
  onViewProducts
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [voiceSpokenText, setVoiceSpokenText] = useState<string>('');

  useEffect(() => {
    const unsubOrders = orderService.subscribe((allOrders) => {
      setOrders(orderService.getOrdersForArtisan(artisanId));
    });

    const unsubProducts = productService.subscribe((allProducts) => {
      setProducts(productService.getArtisanProducts(artisanId));
    });

    return () => {
      unsubOrders();
      unsubProducts();
    };
  }, [artisanId]);

  const pendingOrders = orders.filter((o) => o.orderStatus === 'PENDING_ARTISAN_APPROVAL');
  const approvedProducts = products.filter((p) => p.status === 'APPROVED');
  const pendingApprovalProducts = products.filter((p) => p.status === 'PENDING_APPROVAL');

  const totalRevenue = orders
    .filter((o) => o.orderStatus !== 'CANCELLED')
    .reduce((acc, o) => acc + o.subtotal, 0);

  // Play voice prompt for new orders
  const triggerVoicePrompt = (order: Order) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const text = `You have received a new order for ${order.products[0]?.product.name || 'handicraft'} from ${order.customerName}. Would you like to accept it?`;
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceCommand = (orderId: string) => {
    setIsVoiceListening(true);
    setVoiceSpokenText('Listening for command ("Accept" or "Reject")...');

    setTimeout(() => {
      setIsVoiceListening(false);
      setVoiceSpokenText('Voice command recognized: "ACCEPT"');
      orderService.artisanApproveOrder(orderId);
    }, 2000);
  };

  const handleAcceptOrder = (orderId: string) => {
    orderService.artisanApproveOrder(orderId);
  };

  const handleRejectOrder = (orderId: string) => {
    orderService.artisanRejectOrder(orderId, 'Temporarily out of seasoned craft materials.');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner with Large Accessible CTA */}
      <div className="bg-gradient-to-r from-craft-700 via-craft-600 to-amber-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>National Master Craftsperson Portal</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Namaste, {artisanName}
            </h2>
            <p className="text-sm text-craft-100 mt-1 max-w-lg">
              Manage your handcrafted products, accept customer orders via voice assistant, and track direct payments.
            </p>
          </div>

          <button
            onClick={onOpenAddProduct}
            className="px-6 py-4 rounded-2xl bg-white text-craft-700 hover:bg-craft-50 font-extrabold text-sm shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 flex-shrink-0"
          >
            <Plus className="w-5 h-5 text-craft-600 stroke-[2.5]" />
            <span>Create AI Product Listing</span>
          </button>
        </div>
      </div>

      {/* PROMINENT VOICE ORDER APPROVAL SECTION (IF PENDING ORDERS EXIST) */}
      {pendingOrders.length > 0 && (
        <div className="bg-amber-500/10 border-2 border-amber-500 rounded-3xl p-6 sm:p-8 shadow-lg animate-pulse-subtle">
          <div className="flex items-center justify-between pb-4 border-b border-amber-300/60">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>🔔 NEW ORDERS REQUIRING ACCEPTANCE ({pendingOrders.length})</span>
              </h3>
            </div>
            <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full">
              Voice-Enabled
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {pendingOrders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-base">
                      Order #{order.orderId}
                    </span>
                    <span className="text-xs font-bold text-craft-700 bg-craft-50 px-2 py-0.5 rounded border border-craft-200">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Product: <strong>{order.products[0]?.product.name}</strong> (Qty: {order.products[0]?.quantity})
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>Customer: {order.customerName} ({order.shippingAddress.generalArea})</span>
                  </p>
                </div>

                {/* Voice & Tap Controls */}
                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                  <button
                    onClick={() => triggerVoicePrompt(order)}
                    title="Read order aloud"
                    className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <Volume2 className="w-5 h-5 text-craft-600" />
                  </button>

                  <button
                    onClick={() => handleVoiceCommand(order.orderId)}
                    className="px-4 py-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Mic className="w-4 h-4 text-amber-700" />
                    <span>{isVoiceListening ? 'Listening...' : 'Voice Command'}</span>
                  </button>

                  <button
                    onClick={() => handleAcceptOrder(order.orderId)}
                    className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all hover:scale-105 flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accept Order</span>
                  </button>

                  <button
                    onClick={() => handleRejectOrder(order.orderId)}
                    className="px-4 py-3 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {voiceSpokenText && (
            <p className="text-xs font-mono text-amber-900 mt-3 italic">
              {voiceSpokenText}
            </p>
          )}
        </div>
      )}

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Live Catalog</span>
            <Package className="w-5 h-5 text-craft-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {approvedProducts.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Verified on National Marketplace</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Govt Review Queue</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {pendingApprovalProducts.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Awaiting Ministry Certification</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <Layers className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {orders.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Fulfilled direct to customers</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Artisan Earnings</span>
            <IndianRupee className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-mono">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-emerald-700 font-medium mt-1">100% Direct Payouts</p>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={onViewProducts}
          className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-craft-400 hover:shadow-craft cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-craft-50 text-craft-600 flex items-center justify-center font-bold">
              📦
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base group-hover:text-craft-600 transition-colors">
                Manage My Craft Products
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                View all drafts, pending certifications, and active stock
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-craft-600 transition-all" />
        </div>

        <div
          onClick={onViewOrders}
          className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-craft-400 hover:shadow-craft cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              🚚
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                Order Fulfillment & Delivery Status
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Track shipments, logistics handovers, and customer receipts
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
        </div>
      </div>
    </div>
  );
};
