import { Delivery, DeliveryStatus, Order } from '../types';
import { SEED_DEMO_DELIVERY, DEMO_TRACKING_ID, DEMO_ORDER_ID } from '../data/seedData';
import { storageService } from './storageService';
import { orderService } from './orderService';
import { trackingService } from './trackingService';
import { notificationService } from './notificationService';
import { smsService } from './smsService';
import { impactStatisticsService } from './impactStatisticsService';

type DeliveryListener = (deliveries: Delivery[]) => void;

class DeliveryService {
  private deliveries: Delivery[] = [];
  private listeners: Set<DeliveryListener> = new Set();

  constructor() {
    this.deliveries = storageService.getItem<Delivery[]>('deliveries_list', [SEED_DEMO_DELIVERY]);
  }

  getDeliveries(): Delivery[] {
    return [...this.deliveries];
  }

  getDeliveryByTrackingId(trackingId: string): Delivery | undefined {
    return this.deliveries.find(
      (d) => d.trackingId.toUpperCase() === trackingId.trim().toUpperCase()
    );
  }

  getDeliveriesForPartner(partnerId: string): Delivery[] {
    return this.deliveries.filter((d) => d.deliveryPartnerId === partnerId);
  }

  generateTrackingId(): string {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `SHP-2026-${code}`;
  }

  createDeliveryForOrder(order: Order): Delivery {
    const trackingId = this.generateTrackingId();
    const deliveryId = `del_${Date.now()}`;

    const newDelivery: Delivery = {
      deliveryId,
      orderId: order.orderId,
      trackingId,
      deliveryPartnerId: 'usr_delivery_1',
      deliveryPartnerName: 'Rajesh Kumar',
      deliveryPartnerPhone: '+91 91234 56789',
      status: 'PENDING_PICKUP',
      pickupArea: `${order.artisanLocation} Workshop Hub`,
      destinationArea: `${order.shippingAddress.generalArea || order.shippingAddress.city}`,
      assignedAt: new Date().toISOString(),
      estimatedDeliveryDate: new Date(Date.now() + 2 * 86400000).toISOString(),
      currentCheckpoint: 'Awaiting Pickup at Artisan Cluster',
      lastUpdated: new Date().toISOString()
    };

    this.deliveries = [newDelivery, ...this.deliveries];
    this.save();

    // Update order with tracking ID and READY_FOR_PICKUP status
    orderService.updateOrderStatus(order.orderId, 'READY_FOR_PICKUP', trackingId);

    // Add initial tracking event
    trackingService.addEvent(
      trackingId,
      'PAYMENT_CONFIRMED',
      'Payment Confirmed & Delivery Created',
      `Consignment ID ${trackingId} generated. QR code created for verified pickup. Assigned to delivery partner Rajesh Kumar.`,
      'System',
      'sys_logistics',
      order.artisanLocation,
      1
    );

    // Notify delivery partner
    notificationService.addNotification({
      recipientId: 'usr_delivery_1',
      recipientRole: 'delivery',
      type: 'DELIVERY',
      title: '📦 New Pickup Assignment',
      message: `Pickup scheduled at ${order.artisanLocation} for Order #${order.orderId}. Tracking ID: ${trackingId}`,
      relatedOrderId: order.orderId,
      relatedTrackingId: trackingId,
      actionUrl: 'delivery'
    });

    return newDelivery;
  }

  updateDeliveryStatus(trackingId: string, newStatus: DeliveryStatus): boolean {
    const delivery = this.getDeliveryByTrackingId(trackingId);
    if (!delivery) return false;

    const order = orderService.getOrderByTrackingId(trackingId);

    let checkpointName = delivery.currentCheckpoint;
    let checkpointIndex = 2;
    let eventTitle = '';
    let eventDesc = '';

    if (newStatus === 'PICKED_UP') {
      checkpointName = `Collected from ${delivery.pickupArea}`;
      checkpointIndex = 2;
      eventTitle = 'Package Picked Up from Artisan';
      eventDesc = `Logistics partner Rajesh Kumar physically verified QR & collected consignment from artisan workshop.`;
      
      orderService.updateOrderStatus(delivery.orderId, 'PICKED_UP', trackingId);
      
      // Send SMS & Notifications
      smsService.sendSms(
        order?.customerPhone || '+91 98765 43210',
        `ShilpSetu: Your handmade item for Order #${delivery.orderId} (${trackingId}) has been picked up from artisan workshop.`,
        trackingId,
        'PICKUP'
      );

      notificationService.addNotification({
        recipientId: order?.customerId || 'usr_customer_1',
        recipientRole: 'customer',
        type: 'DELIVERY',
        title: '📦 Order Picked Up!',
        message: `Your handcrafted order has been picked up from ${delivery.pickupArea}.`,
        relatedTrackingId: trackingId
      });

      notificationService.addNotification({
        recipientId: order?.artisanId || 'usr_artisan_1',
        recipientRole: 'artisan',
        type: 'DELIVERY',
        title: 'Package Handed Over',
        message: `Delivery partner received Order #${delivery.orderId}. Handover complete.`,
        relatedOrderId: delivery.orderId
      });
    } else if (newStatus === 'IN_TRANSIT') {
      checkpointName = 'Regional Sorting Hub (South Zone)';
      checkpointIndex = 3;
      eventTitle = 'In Transit to Destination Hub';
      eventDesc = `Consignment en route through regional express transit corridors toward ${delivery.destinationArea}.`;
      
      orderService.updateOrderStatus(delivery.orderId, 'IN_TRANSIT', trackingId);

      smsService.sendSms(
        order?.customerPhone || '+91 98765 43210',
        `ShilpSetu: Your order ${trackingId} is now IN TRANSIT to ${delivery.destinationArea}. Track live: shilpsetu.in/track`,
        trackingId,
        'TRANSIT'
      );

      notificationService.addNotification({
        recipientId: order?.customerId || 'usr_customer_1',
        recipientRole: 'customer',
        type: 'DELIVERY',
        title: '🚚 Order In Transit',
        message: `Tracking ID ${trackingId} is moving through regional logistics hubs.`,
        relatedTrackingId: trackingId
      });
    } else if (newStatus === 'OUT_FOR_DELIVERY') {
      checkpointName = `Local Delivery Vehicle, ${delivery.destinationArea}`;
      checkpointIndex = 4;
      eventTitle = 'Out for Delivery';
      eventDesc = `Package assigned to last-mile courier van. Expected arrival within 3 hours.`;

      orderService.updateOrderStatus(delivery.orderId, 'OUT_FOR_DELIVERY', trackingId);

      smsService.sendSms(
        order?.customerPhone || '+91 98765 43210',
        `ShilpSetu: Order ${trackingId} is OUT FOR DELIVERY! Our delivery executive will arrive today.`,
        trackingId,
        'OUT_FOR_DELIVERY'
      );

      notificationService.addNotification({
        recipientId: order?.customerId || 'usr_customer_1',
        recipientRole: 'customer',
        type: 'DELIVERY',
        title: '🛵 Out for Delivery Today!',
        message: `Your artisan package is on the last-mile delivery route to ${delivery.destinationArea}.`,
        relatedTrackingId: trackingId
      });
    } else if (newStatus === 'DELIVERED') {
      checkpointName = `Delivered at ${delivery.destinationArea}`;
      checkpointIndex = 4;
      eventTitle = 'Delivered to Customer';
      eventDesc = `Package successfully delivered to customer. Digital POD signature verified.`;

      orderService.updateOrderStatus(delivery.orderId, 'DELIVERED', trackingId);

      // INCREMENT CENTRAL IMPACT STATISTICS!
      impactStatisticsService.incrementDeliveredCount();

      smsService.sendSms(
        order?.customerPhone || '+91 98765 43210',
        `ShilpSetu: Order ${trackingId} has been successfully DELIVERED! Thank you for supporting Indian artisans.`,
        trackingId,
        'DELIVERED'
      );

      notificationService.addNotification({
        recipientId: order?.customerId || 'usr_customer_1',
        recipientRole: 'customer',
        type: 'DELIVERY',
        title: '🎉 Order Delivered Successfully!',
        message: `Your ShilpSetu order ${trackingId} has arrived. Enjoy your handcrafted heritage product!`,
        relatedTrackingId: trackingId
      });

      notificationService.addNotification({
        recipientId: order?.artisanId || 'usr_artisan_1',
        recipientRole: 'artisan',
        type: 'DELIVERY',
        title: '💰 Order Completed & Funds Released',
        message: `Customer received Order #${delivery.orderId}. Payout of ₹${order?.subtotal || 850} credited to your registered bank account.`,
        relatedOrderId: delivery.orderId
      });

      notificationService.addNotification({
        recipientId: 'usr_gov_1',
        recipientRole: 'government',
        type: 'DELIVERY',
        title: 'Logistics Milestone Completed',
        message: `Order #${delivery.orderId} delivered from ${delivery.pickupArea} to ${delivery.destinationArea}. Platform metrics updated.`,
        actionUrl: 'government'
      });
    }

    // Add tracking event to immutable log
    trackingService.addEvent(
      trackingId,
      newStatus,
      eventTitle,
      eventDesc,
      'Delivery Partner',
      'usr_delivery_1',
      checkpointName,
      checkpointIndex
    );

    // Update delivery entry
    this.deliveries = this.deliveries.map((d) => {
      if (d.trackingId.toUpperCase() === trackingId.trim().toUpperCase()) {
        return {
          ...d,
          status: newStatus,
          currentCheckpoint: checkpointName,
          lastUpdated: new Date().toISOString()
        };
      }
      return d;
    });

    this.save();
    return true;
  }

  subscribe(listener: DeliveryListener): () => void {
    this.listeners.add(listener);
    listener([...this.deliveries]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private save() {
    storageService.setItem('deliveries_list', this.deliveries);
    this.listeners.forEach((l) => l([...this.deliveries]));
  }
}

export const deliveryService = new DeliveryService();
