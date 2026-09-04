import React, { useEffect, useState } from 'react';
import { Order } from '../../types';
import { orderService } from '../../services/orderService';
import { StatusBadge } from '../common/StatusBadge';
import { ShieldCheck, MapPin, Truck, Clock, ExternalLink } from 'lucide-react';

interface OrderMonitoringTabProps {
  onTrackOrder?: (trackingId: string) => void;
}

export const OrderMonitoringTab: React.FC<OrderMonitoringTabProps> = ({ onTrackOrder }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    return orderService.subscribe((all) => {
      setOrders(all);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900">National Logistics & Order Monitoring</h3>
        <p className="text-xs text-slate-500">
          Supervise order progression, artisan payments, and delivery fulfillment across states
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Order & Tracking ID</th>
                <th className="px-6 py-4">Artisan Origin</th>
                <th className="px-6 py-4">Customer Destination</th>
                <th className="px-6 py-4">Order Value</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Fulfillment Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.orderId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-extrabold text-slate-900 block">{order.orderId}</span>
                    {order.trackingId ? (
                      <span className="font-mono text-craft-700 text-[11px] font-semibold">
                        {order.trackingId}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">Awaiting Pickup</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-800 block">{order.artisanName}</span>
                    <span className="text-[11px] text-slate-400">{order.artisanLocation}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-800 block">
                      {order.shippingAddress.generalArea || order.shippingAddress.city}
                    </span>
                    <span className="text-[10px] text-slate-400">PIN: {order.shippingAddress.pincode}</span>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ {order.paymentMethod || 'UPI'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.orderStatus} size="sm" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    {order.trackingId && onTrackOrder ? (
                      <button
                        onClick={() => onTrackOrder(order.trackingId!)}
                        className="p-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] transition-colors inline-flex items-center gap-1"
                      >
                        <Truck className="w-3 h-3 text-craft-600" />
                        <span>Track</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 text-[10px]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
