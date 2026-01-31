import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import SellerDashboard from './pages/SellerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import RecyclerDashboard from './pages/RecyclerDashboard';
import PaymentPage from './pages/PaymentPage';
import ProtectedRoute from './components/ProtectedRoute';
import BackgroundSlideshow from './components/BackgroundSlideshow';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="app-container" style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: isLanding ? 'transparent' : 'var(--color-bg-primary)',
      color: 'var(--color-text-primary)'
    }}>
      <BackgroundSlideshow />
      <ScrollToTop />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller" element={
            <ProtectedRoute requiredRole="seller">
              <SellerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/buyer" element={
            <ProtectedRoute requiredRole="buyer">
              <BuyerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/recycler" element={
            <ProtectedRoute requiredRole="recycler">
              <RecyclerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/payment/:id" element={
            <ProtectedRoute requiredRole="buyer">
              <PaymentPage />
            </ProtectedRoute>
          } />
          {/* Fallback routes could go here */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
