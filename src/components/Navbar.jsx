import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, LogIn, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(4, 30, 21, 0.85)',
        borderBottom: '1px solid rgba(0, 255, 157, 0.1)',
        padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #00FF9D, #D4AF37)',
              padding: '0.5rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0, 255, 157, 0.4)'
            }}>
              <Leaf size={24} color="#041E15" />
            </div>
          </motion.div>
          <span style={{
            fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
            fontWeight: '800',
            color: '#FFFFFF',
            letterSpacing: '-1px'
          }}>
            Eco<span style={{ color: '#00FF9D' }}>Connect</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-desktop">
          {isAuthenticated && user?.role === 'seller' && (
            <Link to="/seller" style={{ color: 'var(--color-text-secondary)', fontWeight: '500' }}>Seller</Link>
          )}
          {isAuthenticated && user?.role === 'buyer' && (
            <Link to="/buyer" style={{ color: 'var(--color-text-secondary)', fontWeight: '500' }}>Buyer</Link>
          )}
          {isAuthenticated && user?.role === 'recycler' && (
            <Link to="/recycler" style={{ color: 'var(--color-text-secondary)', fontWeight: '500' }}>Recycler</Link>
          )}
        </div>

        {/* Auth Buttons - Desktop */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', display: 'none' }} className="md:show">Hi, {user.name}</span>
              <button onClick={logout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', display: 'flex', gap: '0.5rem' }}>
                <LogOut size={16} /> <span style={{ display: 'none' }} className="sm:hidden">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem', display: 'none' }} className="sm:hidden">Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 'auto' }}>
                <LogIn size={16} /> <span style={{ display: 'none' }} className="sm:hidden">Get Started</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className={`nav-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          style={{}}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-mobile ${mobileMenuOpen ? 'active' : ''}`} style={{ position: 'relative', top: 0 }}>
        {isAuthenticated && user?.role === 'seller' && (
          <Link to="/seller" onClick={closeMobileMenu}>Seller Dashboard</Link>
        )}
        {isAuthenticated && user?.role === 'buyer' && (
          <Link to="/buyer" onClick={closeMobileMenu}>Buyer Dashboard</Link>
        )}
        {isAuthenticated && user?.role === 'recycler' && (
          <Link to="/recycler" onClick={closeMobileMenu}>Recycler Dashboard</Link>
        )}
        {isAuthenticated ? (
          <>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', padding: '0.75rem 1rem' }}>Hi, {user.name}</span>
            <button onClick={() => { logout(); closeMobileMenu(); }} className="btn btn-secondary" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              Logout <LogOut size={16} />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary" onClick={closeMobileMenu} style={{ width: 'auto' }}>Login</Link>
            <Link to="/register" className="btn btn-primary" onClick={closeMobileMenu} style={{ width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              Get Started <LogIn size={16} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
