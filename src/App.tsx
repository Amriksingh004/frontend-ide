import React from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppButton } from './components/common/WhatsAppButton';

// Pages
import { HomePage } from './pages/HomePage';
import { DecorationsPage } from './pages/DecorationsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { PackagesPage } from './pages/PackagesPage';
import { OffersPage } from './pages/OffersPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { TrackBookingPage } from './pages/TrackBookingPage';
import { UserAccountPage } from './pages/UserAccountPage';
import { LoginForm } from './components/auth/LoginForm';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CheckCircle2, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activePage, toastMessage } = useBooking();

  // If in admin dashboard, render dedicated full-screen layout
  if (activePage === 'admin-dashboard') {
    return (
      <>
        <AdminDashboardPage />
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-maroon-900 text-gold-200 px-5 py-3 rounded-2xl shadow-2xl border-2 border-gold-400 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-gold-400 animate-spin" />
            <span>{toastMessage}</span>
          </div>
        )}
      </>
    );
  }

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'decorations':
        return <DecorationsPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'product-details':
        return <ProductDetailsPage />;
      case 'packages':
        return <PackagesPage />;
      case 'offers':
        return <OffersPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'confirmation':
        return <BookingConfirmationPage />;
      case 'track-booking':
        return <TrackBookingPage />;
      case 'user-dashboard':
        return <UserAccountPage />;
      case 'login':
        return <LoginForm />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 selection:bg-gold-200 selection:text-maroon-950 font-sans">
      <Navbar />

      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      <Footer />

      {/* Floating WhatsApp Concierge Button */}
      <WhatsAppButton />

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-maroon-950 text-gold-200 px-5 py-3.5 rounded-2xl shadow-2xl border-2 border-gold-400 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-gold-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
