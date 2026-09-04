import { Product, ProductStatus, ProductCategory } from '../types';
import { SEED_PRODUCTS } from '../data/seedData';
import { storageService } from './storageService';
import { impactStatisticsService } from './impactStatisticsService';
import { notificationService } from './notificationService';

type ProductListener = (products: Product[]) => void;

class ProductService {
  private products: Product[] = [];
  private listeners: Set<ProductListener> = new Set();

  constructor() {
    this.products = storageService.getItem<Product[]>('products_catalog', SEED_PRODUCTS);
  }

  getApprovedProducts(): Product[] {
    return this.products.filter((p) => p.status === 'APPROVED');
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getPendingProducts(): Product[] {
    return this.products.filter((p) => p.status === 'PENDING_APPROVAL');
  }

  getArtisanProducts(artisanId: string): Product[] {
    return this.products.filter((p) => p.artisanId === artisanId);
  }

  getProductById(productId: string): Product | undefined {
    return this.products.find((p) => p.productId === productId);
  }

  createProduct(productData: Omit<Product, 'productId' | 'createdAt'>): Product {
    const newProduct: Product = {
      ...productData,
      productId: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString()
    };

    this.products = [newProduct, ...this.products];
    this.save();

    if (newProduct.status === 'PENDING_APPROVAL') {
      notificationService.addNotification({
        recipientId: 'usr_gov_1',
        recipientRole: 'government',
        type: 'APPROVAL',
        title: 'New Product Submitted for Verification',
        message: `Artisan ${newProduct.artisanName} submitted "${newProduct.name}" for certification.`,
        actionUrl: 'government'
      });
      notificationService.showToast(
        'Submitted for Government Approval',
        `"${newProduct.name}" has been sent to the Ministry verification queue.`,
        'success'
      );
    }

    return newProduct;
  }

  updateProduct(productId: string, updates: Partial<Product>): Product | null {
    let updated: Product | null = null;
    this.products = this.products.map((p) => {
      if (p.productId === productId) {
        updated = { ...p, ...updates };
        return updated;
      }
      return p;
    });

    if (updated) {
      this.save();
    }
    return updated;
  }

  approveProductByGovernment(productId: string, approverName: string = 'Dr. Sunita Verma, IAS'): boolean {
    const product = this.getProductById(productId);
    if (!product) return false;

    this.products = this.products.map((p) => {
      if (p.productId === productId) {
        return {
          ...p,
          status: 'APPROVED' as ProductStatus,
          approvedAt: new Date().toISOString()
        };
      }
      return p;
    });

    this.save();

    // 1. Increment centralized impact statistics
    impactStatisticsService.incrementApprovedProductCount(1);

    // 2. Notify artisan
    notificationService.addNotification({
      recipientId: product.artisanId,
      recipientRole: 'artisan',
      type: 'APPROVAL',
      title: '🎉 Product Approved by Government!',
      message: `Your creation "${product.name}" has been verified and is now live on the National Digital Marketplace.`,
      actionUrl: 'artisan'
    });

    // 3. Show celebration toast
    notificationService.showToast(
      'Certification Approved',
      `"${product.name}" is now live on the Public Marketplace. Platform stats updated.`,
      'success'
    );

    return true;
  }

  rejectProductByGovernment(productId: string, reason: string): boolean {
    const product = this.getProductById(productId);
    if (!product) return false;

    this.products = this.products.map((p) => {
      if (p.productId === productId) {
        return {
          ...p,
          status: 'REJECTED' as ProductStatus,
          rejectionReason: reason || 'Incomplete material provenance specification.'
        };
      }
      return p;
    });

    this.save();

    // Notify artisan
    notificationService.addNotification({
      recipientId: product.artisanId,
      recipientRole: 'artisan',
      type: 'APPROVAL',
      title: 'Product Verification Update',
      message: `"${product.name}" requires revisions: ${reason || 'Please provide additional craft origin proof.'}`,
      actionUrl: 'artisan'
    });

    notificationService.showToast(
      'Product Application Rejected',
      `Feedback has been sent to artisan ${product.artisanName}.`,
      'warning'
    );

    return true;
  }

  subscribe(listener: ProductListener): () => void {
    this.listeners.add(listener);
    listener([...this.products]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private save() {
    storageService.setItem('products_catalog', this.products);
    this.listeners.forEach((l) => l([...this.products]));
  }
}

export const productService = new ProductService();
