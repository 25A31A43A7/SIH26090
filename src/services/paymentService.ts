import { Payment } from '../types';
import { storageService } from './storageService';
import { notificationService } from './notificationService';

class PaymentService {
  private payments: Payment[] = [];

  constructor() {
    this.payments = storageService.getItem<Payment[]>('payments_log', [
      {
        paymentId: 'pay_98214',
        orderId: 'ORD-98214',
        method: 'UPI',
        amount: 900,
        status: 'SUCCESS',
        timestamp: '2026-09-03T11:20:00Z',
        transactionRef: 'UPI-90412891924'
      }
    ]);
  }

  async processPayment(
    orderId: string,
    amount: number,
    method: 'UPI' | 'CARD' | 'COD' | 'NETBANKING' = 'UPI'
  ): Promise<Payment> {
    // Simulate gateway delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const payment: Payment = {
      paymentId: `pay_${Date.now()}`,
      orderId,
      method,
      amount,
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      transactionRef: `SHP-TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    };

    this.payments = [payment, ...this.payments];
    storageService.setItem('payments_log', this.payments);

    notificationService.showToast(
      'Payment Successful',
      `₹${amount} paid via ${method}. Transaction ID: ${payment.transactionRef}`,
      'success'
    );

    return payment;
  }
}

export const paymentService = new PaymentService();
