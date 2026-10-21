import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from '../i18n/I18nContext';
import { ThemeProvider } from '../context/ThemeContext';
import { RestaurantProvider } from '../context/RestaurantContext';
import { CartProvider } from '../context/CartContext';
import { OrderProvider } from '../context/OrderContext';
import { AuthProvider } from '../context/AuthContext';
import { WishlistProvider } from '../context/WishlistContext';

import { FloatingCapsuleNav } from '../components/navigation/FloatingCapsuleNav';
import { CartDrawer } from '../components/cart/CartDrawer';
import { Footer } from '../components/footer/Footer';

// Pages
import { HomePage } from '../pages/HomePage';
import { MenuPage } from '../pages/MenuPage';
import { OffersPage } from '../pages/OffersPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { OrderTrackingPage } from '../pages/OrderTrackingPage';
import { ReservationPage } from '../pages/ReservationPage';
import { CustomerDashboardPage } from '../pages/CustomerDashboardPage';
import { WishlistPage } from '../pages/WishlistPage';
import { LoyaltyPage } from '../pages/LoyaltyPage';
import { ReviewsPage } from '../pages/ReviewsPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { OpeningHoursPage } from '../pages/OpeningHoursPage';
import { HelpPage } from '../pages/HelpPage';
import { SupportChatPage } from '../pages/SupportChatPage';
import {
  NoRefundPolicyPage,
  PrivacyPolicyPage,
  TermsPage,
  CookiePreferencesPage
} from '../pages/PoliciesPage';
import { LoginPage, RegisterPage, ForgotPasswordPage } from '../pages/AuthPages';
import { NotFoundPage } from '../pages/NotFoundPage';

// Admin Pages
import { AdminLayout } from '../pages/admin/AdminLayout';
import { AdminOverviewPage } from '../pages/admin/AdminOverviewPage';
import { AdminOrdersPage } from '../pages/admin/AdminOrdersPage';
import { AdminMenuPage } from '../pages/admin/AdminMenuPage';
import { AdminReservationsPage } from '../pages/admin/AdminReservationsPage';
import { AdminCouponsPage } from '../pages/admin/AdminCouponsPage';
import { AdminDeliveryZonesPage } from '../pages/admin/AdminDeliveryZonesPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';
import { AdminReportsPage } from '../pages/admin/AdminReportsPage';
import { AdminStaffPage } from '../pages/admin/AdminStaffPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <I18nProvider>
        <ThemeProvider>
          <RestaurantProvider>
            <AuthProvider>
              <WishlistProvider>
                <CartProvider>
                  <OrderProvider>
                    <Routes>
                      {/* Administrative Suite */}
                      <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminOverviewPage />} />
                        <Route path="orders" element={<AdminOrdersPage />} />
                        <Route path="menu" element={<AdminMenuPage />} />
                        <Route path="reservations" element={<AdminReservationsPage />} />
                        <Route path="coupons" element={<AdminCouponsPage />} />
                        <Route path="delivery-zones" element={<AdminDeliveryZonesPage />} />
                        <Route path="settings" element={<AdminSettingsPage />} />
                        <Route path="reports" element={<AdminReportsPage />} />
                        <Route path="staff" element={<AdminStaffPage />} />
                      </Route>

                      {/* Public & Customer Website */}
                      <Route
                        path="*"
                        element={
                          <div className="site-wrapper">
                            <FloatingCapsuleNav />
                            <CartDrawer />
                            <div className="site-main-content">
                              <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/menu" element={<MenuPage />} />
                                <Route path="/offers" element={<OffersPage />} />
                                <Route path="/checkout" element={<CheckoutPage />} />
                                <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                                <Route path="/track/:orderId" element={<OrderTrackingPage />} />
                                <Route path="/orders" element={<CustomerDashboardPage />} />
                                <Route path="/reservations" element={<ReservationPage />} />
                                <Route path="/dashboard" element={<CustomerDashboardPage />} />
                                <Route path="/profile" element={<CustomerDashboardPage />} />
                                <Route path="/wishlist" element={<WishlistPage />} />
                                <Route path="/loyalty" element={<LoyaltyPage />} />
                                <Route path="/reviews" element={<ReviewsPage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/hours" element={<OpeningHoursPage />} />
                                <Route path="/help" element={<HelpPage />} />
                                <Route path="/support" element={<SupportChatPage />} />
                                <Route path="/no-refund-policy" element={<NoRefundPolicyPage />} />
                                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                                <Route path="/terms" element={<TermsPage />} />
                                <Route path="/cookies" element={<CookiePreferencesPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                              </Routes>
                              <Footer />
                            </div>
                          </div>
                        }
                      />
                    </Routes>
                  </OrderProvider>
                </CartProvider>
              </WishlistProvider>
            </AuthProvider>
          </RestaurantProvider>
        </ThemeProvider>
      </I18nProvider>
    </BrowserRouter>
  );
};
