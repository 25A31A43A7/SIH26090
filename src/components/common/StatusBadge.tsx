import React from 'react';
import { UserRole, ProductStatus, OrderStatus, DeliveryStatus, VerificationStatus } from '../../types';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', showIcon = true }) => {
  let bg = 'bg-slate-100 text-slate-700 border-slate-200';
  let label = status;
  let icon = '●';

  switch (status) {
    // Product statuses
    case 'APPROVED':
    case 'VERIFIED':
      bg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      label = status === 'VERIFIED' ? 'Govt Verified' : 'Govt Approved';
      icon = '✓';
      break;
    case 'PENDING_APPROVAL':
    case 'PENDING':
      bg = 'bg-amber-50 text-amber-700 border-amber-200';
      label = 'Pending Verification';
      icon = '⏳';
      break;
    case 'DRAFT':
      bg = 'bg-slate-100 text-slate-600 border-slate-200';
      label = 'Draft (Offline)';
      icon = '📝';
      break;
    case 'REJECTED':
      bg = 'bg-rose-50 text-rose-700 border-rose-200';
      label = 'Revisions Needed';
      icon = '✕';
      break;

    // Order statuses
    case 'PENDING_ARTISAN_APPROVAL':
      bg = 'bg-orange-50 text-orange-700 border-orange-200 animate-pulse';
      label = 'Awaiting Artisan Acceptance';
      icon = '🔔';
      break;
    case 'PAYMENT_PENDING':
      bg = 'bg-amber-50 text-amber-700 border-amber-200';
      label = 'Payment Pending';
      icon = '💳';
      break;
    case 'PAYMENT_CONFIRMED':
    case 'READY_FOR_PICKUP':
      bg = 'bg-blue-50 text-blue-700 border-blue-200';
      label = 'Ready for Pickup';
      icon = '📦';
      break;
    case 'PICKED_UP':
      bg = 'bg-indigo-50 text-indigo-700 border-indigo-200';
      label = 'Picked Up from Workshop';
      icon = '🚚';
      break;
    case 'IN_TRANSIT':
      bg = 'bg-purple-50 text-purple-700 border-purple-200';
      label = 'In Transit';
      icon = '⚡';
      break;
    case 'OUT_FOR_DELIVERY':
      bg = 'bg-sky-50 text-sky-700 border-sky-200';
      label = 'Out for Delivery';
      icon = '🛵';
      break;
    case 'DELIVERED':
      bg = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold';
      label = 'Delivered & Completed';
      icon = '🎉';
      break;
    case 'CANCELLED':
      bg = 'bg-red-50 text-red-700 border-red-200';
      label = 'Cancelled';
      icon = '✕';
      break;
    default:
      bg = 'bg-slate-100 text-slate-700 border-slate-200';
      label = status.replace(/_/g, ' ');
  }

  const sizeClass =
    size === 'sm'
      ? 'text-xs px-2 py-0.5'
      : size === 'lg'
      ? 'text-sm px-3.5 py-1.5 font-medium'
      : 'text-xs px-2.5 py-1 font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${bg} ${sizeClass} tracking-wide shadow-sm`}
    >
      {showIcon && <span className="text-[11px] leading-none">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
