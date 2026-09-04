import React, { useState, useEffect } from 'react';
import { User, Product, OrderItem, UserRole } from './types';
import { authService } from './services/authService';
import { notificationService } from './services/notificationService';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DemoPersonaBar } from './components/common/DemoPersonaBar';
import { NotificationCenter } from './components/common/NotificationCenter';
import { ToastContainer } from './components/common/ToastContainer';
import { SmsSimulatorModal } from './components/common/SmsSimulatorModal';
import { CartDrawer } from './components/customer/CartDrawer';
import { CheckoutModal } from './components/customer/CheckoutModal';
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { ImpactPage } from './pages/ImpactPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardRouter } from './pages/DashboardRouter';
import { DEMO_TRACKING_ID } from './data/seedData';

export function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(authService.getCurrentUser());
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParams, setPageParams] = useState<any>({});

  // Cart state
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Notification Drawer state
  const [isNotifCenterOpen, setIsNotifCenterOpen] = useState(false);
  const [unreadNotifsCount, setUnreadNotifsCount] = useState<number>(0);

  useEffect(() => {
    const unsubAuth = authService.subscribe((user) => {
      setCurrentUser(user);
    });

    const unsubNotifs = notificationService.subscribeNotifications(() => {
      setUnreadNotifsCount(
        notificationService.getUnreadCount(currentUser?.role || 'ALL', currentUser?.userId)
      );
    });

    return () => {
      unsubAuth();
      unsubNotifs();
    };
  }, [currentUser]);

  const handleNavigate = (page: string, params: any = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.productId === product.productId);
      if (existing) {
        return prev.map((item) =>
          item.product.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, price: product.price }];
    });

    notificationService.showToast(
      'Added to Cart',
      `"${product.name}" added to your craft cart.`,
      'success'
    );
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    handleAddToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.productId === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.productId !== productId));
  };

  const handleOrderPlacedSuccess = (orderId: string) => {
    setCartItems([]);
    if (currentUser?.role === 'customer') {
      handleNavigate('customer');
    } else {
      handleNavigate('track', { trackingId: DEMO_TRACKING_ID });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800 font-sans selection:bg-craft-500 selection:text-white">
      {/* 1. Judge Demo Persona Bar */}
      <DemoPersonaBar currentUser={currentUser} onNavigate={handleNavigate} />

      {/* 2. Top Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNotifications={() => setIsNotifCenterOpen(true)}
        unreadNotifsCount={unreadNotifsCount}
      />

      {/* 3. Main Page Router */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}

        {currentPage === 'marketplace' && (
          <MarketplacePage
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            initialFilterCraft={pageParams.filterCraft}
          />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentPage === 'track' && (
          <TrackOrderPage initialTrackingId={pageParams.trackingId || DEMO_TRACKING_ID} />
        )}

        {currentPage === 'impact' && <ImpactPage />}

        {currentPage === 'login' && (
          <LoginPage onLoginSuccess={(role) => handleNavigate(role)} />
        )}

        {/* Authenticated Dashboard Views (Artisan, Customer, Delivery, Government) */}
        {(currentPage === 'artisan' ||
          currentPage === 'customer' ||
          currentPage === 'delivery' ||
          currentPage === 'government') && (
          <DashboardRouter
            currentUser={
              currentUser || authService.loginAsPersona(currentPage as UserRole)
            }
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        )}
      </main>

      {/* 4. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. Common Modals, Drawers & Overlays */}
      <NotificationCenter
        isOpen={isNotifCenterOpen}
        onClose={() => setIsNotifCenterOpen(false)}
        currentUser={currentUser}
        onNavigate={handleNavigate}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderPlacedSuccess}
      />

      {/* Floating System Toasts & Simulated SMS Banners */}
      <ToastContainer />
      <SmsSimulatorModal />
    </div>
  );
}

export default App;
