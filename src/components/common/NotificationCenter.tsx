import React, { useEffect, useState } from 'react';
import { Notification, User } from '../../types';
import { notificationService } from '../../services/notificationService';
import { Bell, CheckCheck, X, Sparkles, Package, Shield, AlertTriangle } from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onNavigate: (page: string, params?: any) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  currentUser,
  onNavigate
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    return notificationService.subscribeNotifications((allNotifs) => {
      const filtered = notificationService.getNotifications(currentUser?.role || 'ALL', currentUser?.userId);
      setNotifications(filtered);
    });
  }, [currentUser]);

  if (!isOpen) return null;

  const handleItemClick = (notif: Notification) => {
    notificationService.markAsRead(notif.notificationId);
    if (notif.actionUrl) {
      onNavigate(notif.actionUrl);
      onClose();
    } else if (notif.relatedTrackingId) {
      onNavigate('track', { trackingId: notif.relatedTrackingId });
      onClose();
    }
  };

  const handleMarkAllRead = () => {
    notificationService.markAllAsRead(currentUser?.role, currentUser?.userId);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-craft-100 animate-slide-left">
        {/* Header */}
        <div className="p-5 border-b border-craft-100 flex items-center justify-between bg-craft-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-craft-600 text-white flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Notification Center</h3>
              <p className="text-xs text-slate-500">
                {currentUser ? `Alerts for ${currentUser.name} (${currentUser.role})` : 'System Alerts'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllRead}
              title="Mark all as read"
              className="text-xs text-craft-600 hover:text-craft-800 font-medium px-2 py-1 rounded hover:bg-craft-100/50 transition-colors"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Bell className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5] mb-2" />
              <p className="text-sm font-medium">No new notifications</p>
              <p className="text-xs text-slate-400 mt-1">Platform alerts will appear here in real time.</p>
            </div>
          ) : (
            notifications.map((notif) => {
              let icon = <Sparkles className="w-4 h-4 text-craft-600" />;
              if (notif.type === 'APPROVAL' || notif.type === 'VERIFICATION') {
                icon = <Shield className="w-4 h-4 text-emerald-600" />;
              } else if (notif.type === 'DELIVERY') {
                icon = <Package className="w-4 h-4 text-blue-600" />;
              }

              return (
                <div
                  key={notif.notificationId}
                  onClick={() => handleItemClick(notif)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    notif.read
                      ? 'bg-white border-slate-100 opacity-75 hover:opacity-100'
                      : 'bg-craft-50/40 border-craft-200 shadow-xs hover:border-craft-400 hover:bg-craft-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-2 rounded-xl bg-white border border-slate-100 shadow-xs">
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                          {notif.title}
                        </h4>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-craft-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/60 text-[11px] text-slate-400">
                        <span>{notif.timestamp}</span>
                        {notif.actionUrl && (
                          <span className="text-craft-700 font-medium hover:underline">
                            Open &rarr;
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-xs text-slate-500">
          ShilpSetu Central Alert Dispatch Engine • Real-time event sync active
        </div>
      </div>
    </div>
  );
};
