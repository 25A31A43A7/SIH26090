import { Order, OrderStatus, OrderItem, CustomerAddress } from '../types';
import { SEED_DEMO_ORDER, DEMO_ORDER_ID, DEMO_TRACKING_ID } from '../data/seedData';
import { storageService } from './storageService';
import { impactStatisticsService } from './impactStatisticsService';
import { notificationService } from './notificationService';
import { trackingService } from './trackingService';
import { smsService } from './smsService';

type OrderListener = (orders: Order[]) => void;

class OrderService {
  private orders: Order[] = [];
  private listeners: Set<OrderListener> = new Set();

  constructor() {
    this.orders = storageService.getItem<Order[]>('orders_list', [SEED_DEMO_ORDER]);
  }

  getOrders(): Order[] {
    return [...this.orders];
  }

  getOrderById(orderId: string): Order | undefined {
    return this.orders.find((o) => o.orderId === orderId);
  }

  getOrderByTrackingId(trackingId: string): Order | undefined {
    return this.orders.find(
      (o) => o.trackingId && o.trackingId.toUpperCase() === trackingId.trim().toUpperCase()
    );
  }

  getOrdersForCustomer(customerId: string): Order[] {
    return this.orders.filter((o) => o.customerId === customerId);
  }

  getOrdersForArtisan(artisanId: string): Order[] {
    return this.orders.filter((o) => o.artisanId === artisanId);
  }

  createOrder(
    customerId: string,
    customerName: string,
    customerPhone: string,
    shippingAddress: CustomerAddress,
    items: OrderItem[],
    subtotal: number,
    deliveryFee: number = 50
  ): Order {
    const artisan = items[0]?.product;
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      orderId,
      customerId,
      customerName,
      customerPhone,
      shippingAddress,
      artisanId: artisan?.artisanId || 'art_1',
      artisanName: artisan?.artisanName || 'Lakshmi Devi',
      artisanLocation: artisan?.artisanLocation || 'Kondapalli, AP',
      products: items,
      subtotal,
      deliveryFee,
      totalAmount: subtotal + deliveryFee,
      paymentStatus: 'PENDING',
      orderStatus: 'PENDING_ARTISAN_APPROVAL',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.orders = [newOrder, ...this.orders];
    this.save();

    // Increment impact order statistics
    impactStatisticsService.incrementOrderedCount(newOrder.totalAmount);

    // Notify Artisan of New Order with voice alert capability
    notificationService.addNotification({
      recipientId: newOrder.artisanId,
      recipientRole: 'artisan',
      type: 'ORDER',
      title: '🔔 NEW ORDER RECEIVED!',
      message: `New order #${orderId} from ${customerName} (${shippingAddress.city}). Total: ₹${newOrder.totalAmount}. Voice approval ready.`,
      relatedOrderId: orderId,
      actionUrl: 'artisan'
    });

    notificationService.showToast(
      'Order Placed Successfully',
      `Order #${orderId} sent to artisan for handmade craft confirmation.`,
      'success'
    );

    return newOrder;
  }

  artisanApproveOrder(orderId: string): boolean {
    const order = this.getOrderById(orderId);
    if (!order) return false;

    this.orders = this.orders.map((o) => {
      if (o.orderId === orderId) {
        return {
          ...o,
          orderStatus: 'PAYMENT_PENDING' as OrderStatus,
          artisanApprovedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    });

    this.save();

    // Notify customer
    notificationService.addNotification({
      recipientId: order.customerId,
      recipientRole: 'customer',
      type: 'ORDER',
      title: '✨ Artisan Approved Your Order!',
      message: `Artisan ${order.artisanName} accepted your order #${orderId}. Please complete payment to initiate craft packaging.`,
      relatedOrderId: orderId,
      actionUrl: 'customer'
    });

    notificationService.showToast(
      'Order Accepted by Artisan',
      `Order #${orderId} accepted. Customer notified to complete payment.`,
      'success'
    );

    return true;
  }

  artisanRejectOrder(orderId: string, reason: string): boolean {
    const order = this.getOrderById(orderId);
    if (!order) return false;

    this.orders = this.orders.map((o) => {
      if (o.orderId === orderId) {
        return {
          ...o,
          orderStatus: 'CANCELLED' as OrderStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    });

    this.save();

    notificationService.addNotification({
      recipientId: order.customerId,
      recipientRole: 'customer',
      type: 'ORDER',
      title: 'Order Cancelled by Artisan',
      message: `Order #${orderId} could not be fulfilled: ${reason || 'Out of seasoned raw craft materials.'}`,
      relatedOrderId: orderId,
      actionUrl: 'customer'
    });

    return true;
  }

  updateOrderStatus(orderId: string, status: OrderStatus, trackingId?: string): void {
    this.orders = this.orders.map((o) => {
      if (o.orderId === orderId) {
        return {
          ...o,
          orderStatus: status,
          trackingId: trackingId || o.trackingId,
          updatedAt: new Date().toISOString(),
          deliveredAt: status === 'DELIVERED' ? new Date().toISOString() : o.deliveredAt
        };
      }
      return o;
    });
    this.save();
  }

  subscribe(listener: OrderListener): () => void {
    this.listeners.add(listener);
    listener([...this.orders]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private save() {
    storageService.setItem('orders_list', this.orders);
    this.listeners.forEach((l) => l([...this.orders]));
  }
}

export const orderService = new OrderService();
