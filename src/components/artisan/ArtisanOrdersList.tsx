import React, { useEffect, useState } from 'react';
import { Order } from '../../types';
import { orderService } from '../../services/orderService';
import { StatusBadge } from '../common/StatusBadge';
import { CheckCircle2, XCircle, MapPin, Truck, Package, Clock, ExternalLink } from 'lucide-react';

interface ArtisanOrdersListProps {
  artisanId: string;
  onTrackOrder: (trackingId: string) => void;
}

export const ArtisanOrdersList: React.FC<ArtisanOrdersListProps> = ({ artisanId, onTrackOrder }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    return orderService.subscribe((all) => {
      setOrders(orderService.getOrdersForArtisan(artisanId));
    });
  }, [artisanId]);

  const handleAccept = (orderId: string) => {
    orderService.artisanApproveOrder(orderId);
  };

  const handleReject = (orderId: string) => {
    orderService.artisanRejectOrder(orderId, 'Temporarily unavailable.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Incoming Orders & Shipments</h3>
          <p className="text-xs text-slate-500">Approve customer requests and monitor delivery handovers</p>
        </div>
        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
          {orders.length} Orders
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-800">No orders received yet</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            When customers place orders from the marketplace, you will receive an instant voice prompt here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">Order #{order.orderId}</span>
                    {order.trackingId && (
                      <span className="font-mono text-xs text-craft-700 bg-craft-50 px-2 py-0.5 rounded border border-craft-200">
                        {order.trackingId}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Customer: {order.customerName} • {order.shippingAddress.generalArea}
                  </span>
                </div>

                <StatusBadge status={order.orderStatus} />
              </div>

              {/* Items */}
              <div className="space-y-2 text-xs text-slate-700">
                {order.products.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.product.enhancedImage || item.product.images[0]}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span><strong>{item.product.name}</strong> × {item.quantity}</span>
                    </div>
                    <span className="font-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  <span>Net Artisan Payout: </span>
                  <strong className="text-sm font-extrabold text-emerald-700 font-mono">
                    ₹{order.subtotal.toLocaleString('en-IN')}
                  </strong>
                </div>

                {order.orderStatus === 'PENDING_ARTISAN_APPROVAL' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReject(order.orderId)}
                      className="px-4 py-2 rounded-xl border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-50"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAccept(order.orderId)}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Accept Order</span>
                    </button>
                  </div>
                ) : order.trackingId ? (
                  <button
                    onClick={() => onTrackOrder(order.trackingId!)}
                    className="py-2 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Track Shipment</span>
                  </button>
                ) : (
                  <span className="text-xs text-slate-500 font-medium">
                    Order accepted. Preparing handover.
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
