export type UserRole = 'artisan' | 'customer' | 'delivery' | 'government';

export interface User {
  userId: string;
  name: string;
  role: UserRole;
  phone: string;
  email: string;
  generalLocation: string; // e.g. "Kondapalli, Andhra Pradesh" (Never exact private home address)
  avatar?: string;
  stateBadge?: string;
}

export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface Artisan {
  artisanId: string;
  userId: string;
  name: string;
  craftType: string;
  generalLocation: string;
  story: string;
  verificationStatus: VerificationStatus;
  profileImage?: string;
  joinedDate: string;
  specialties?: string[];
  bankAccountVerified?: boolean;
}

export type ProductCategory =
  | 'Pottery'
  | 'Handloom'
  | 'Wooden Crafts'
  | 'Bamboo Crafts'
  | 'Traditional Textiles'
  | 'Paintings'
  | 'Home Decor'
  | 'Other Handicrafts';

export type ProductStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';

export interface Product {
  productId: string;
  name: string;
  description: string;
  category: ProductCategory;
  artisanId: string;
  artisanName: string;
  artisanLocation: string;
  price: number;
  quantity: number;
  images: string[];
  enhancedImage?: string;
  originalImage?: string;
  materials: string[];
  tags: string[];
  status: ProductStatus;
  createdAt: string;
  approvedAt?: string;
  // AI Metadata
  aiCatalogGenerated?: boolean;
  voiceLanguageUsed?: 'Telugu' | 'Hindi' | 'Tamil' | 'English';
  rawCost?: number;
  labourHours?: number;
  aiSuggestedPrice?: number;
  priceRange?: { min: number; max: number };
  seoKeywords?: string[];
  rejectionReason?: string;
}

export type OrderStatus =
  | 'PENDING_ARTISAN_APPROVAL'
  | 'APPROVED'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_CONFIRMED'
  | 'READY_FOR_PICKUP'
  | 'DELIVERY_ASSIGNED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface CustomerAddress {
  name: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  generalArea: string; // "Banjara Hills, Hyderabad" for safe public tracking display
}

export interface Order {
  orderId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: CustomerAddress;
  artisanId: string;
  artisanName: string;
  artisanLocation: string;
  deliveryId?: string;
  products: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  paymentMethod?: 'UPI' | 'CARD' | 'COD' | 'NETBANKING';
  orderStatus: OrderStatus;
  trackingId?: string;
  createdAt: string;
  updatedAt: string;
  artisanApprovedAt?: string;
  deliveredAt?: string;
}

export type DeliveryStatus =
  | 'PENDING_PICKUP'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface Delivery {
  deliveryId: string;
  orderId: string;
  trackingId: string;
  deliveryPartnerId: string;
  deliveryPartnerName: string;
  deliveryPartnerPhone: string;
  status: DeliveryStatus;
  pickupArea: string;
  destinationArea: string;
  assignedAt: string;
  estimatedDeliveryDate: string;
  currentCheckpoint: string;
  lastUpdated: string;
}

export interface TrackingEvent {
  trackingEventId: string;
  trackingId: string;
  status: string;
  title: string;
  description: string;
  timestamp: string;
  actorRole: string;
  actorId: string;
  generalLocation: string;
  checkpointIndex: number; // 0 to 4
  isCompleted: boolean;
}

export interface Notification {
  notificationId: string;
  recipientId: string; // userId or role
  recipientRole: UserRole | 'ALL';
  type: 'ORDER' | 'APPROVAL' | 'DELIVERY' | 'VERIFICATION' | 'SYSTEM';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  relatedOrderId?: string;
  relatedTrackingId?: string;
  actionUrl?: string;
}

export interface Payment {
  paymentId: string;
  orderId: string;
  method: 'UPI' | 'CARD' | 'COD' | 'NETBANKING';
  amount: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  timestamp: string;
  transactionRef: string;
}

export interface GovernmentApproval {
  approvalId: string;
  entityId: string;
  entityType: 'ARTISAN' | 'PRODUCT';
  status: 'APPROVED' | 'REJECTED';
  approvedBy: string;
  timestamp: string;
  remarks?: string;
}

export interface ImpactStatistics {
  artisanCount: number;
  approvedProductCount: number;
  orderedCount: number;
  deliveredCount: number;
  totalRevenueGenerated: number;
  craftCategoriesCount: number;
  statesReachedCount: number;
}

export interface SmsLog {
  id: string;
  phone: string;
  message: string;
  timestamp: string;
  trackingId?: string;
  type: 'TRANSIT' | 'PICKUP' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'ORDER';
}

export interface CommunityHub {
  id: string;
  craft: string;
  region: string;
  state: string;
  artisanCount: number;
  availableProductsCount: number;
  image: string;
  description: string;
}
