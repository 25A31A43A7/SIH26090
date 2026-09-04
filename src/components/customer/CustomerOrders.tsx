import React, { useEffect, useState } from 'react';
import { Order } from '../../types';
import { orderService } from '../../services/orderService';
import { StatusBadge } from '../common/StatusBadge';
import { Package, Truck, Clock, MapPin, ArrowRight, ExternalLink } from 'lucide-react';

interface CustomerOrdersProps {
  customerId: string;
  onTrackOrder: (trackingId: string) => void;
}

export const CustomerOrders: React.FC<CustomerOrdersProps> = ({ customerId, onTrackOrder }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    return orderService.subscribe((allOrders) => {
      const myOrders = orderService.getOrdersForCustomer(customerId);
      setOrders(myOrders);
    });
  }, [customerId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Your Craft Orders</h3>
          <p className="text-xs text-slate-500">Track and manage direct artisan purchases</p>
        </div>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          {orders.length} Total Orders
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-800">No orders placed yet</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Browse the verified marketplace to support master artisans across India.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-craft transition-all space-y-4"
            >
              {/* Top Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-craft-50 text-craft-600 border border-craft-200 flex items-center justify-center font-mono font-bold text-xs">
                    📦
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-sm">{order.orderId}</span>
                      {order.trackingId && (
                        <span className="font-mono text-xs text-craft-700 bg-craft-50 px-2 py-0.5 rounded border border-craft-200">
                          {order.trackingId}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <StatusBadge status={order.orderStatus} />
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {order.products.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.enhancedImage || item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                      />
                      <div>
                        <h5 className="font-bold text-slate-900 line-clamp-1">{item.product.name}</h5>
                        <p className="text-slate-500">
                          Artisan: <strong className="text-craft-700">{order.artisanName}</strong> ({order.artisanLocation})
                        </p>
                        <p className="text-slate-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Summary & Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  <span>Total Amount Paid: </span>
                  <strong className="text-sm font-extrabold text-slate-900">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </strong>
                </div>

                {order.trackingId ? (
                  <button
                    onClick={() => onTrackOrder(order.trackingId!)}
                    className="py-2.5 px-4 rounded-xl bg-craft-600 hover:bg-craft-700 text-white text-xs font-bold shadow-md shadow-craft-600/20 transition-all flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Track Live Delivery ({order.trackingId})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs text-amber-700 font-medium bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                    ⏳ Awaiting Artisan Packing & Logistics Assignment
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
