import React, { useState } from 'react';
import { User, Factory, Recycle, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [role, setRole] = useState('seller');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        login(role, email);
    };

    return (
        <div className="container" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 'clamp(4rem, 8vw, 6rem)',
            paddingBottom: 'clamp(1rem, 4vw, 2rem)',
            background: 'transparent'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '420px', padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '0.5rem' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Sign in to continue to EcoConnect</p>
                </div>

                {/* Role Selector Tabs - Stack on mobile */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 'clamp(0.25rem, 1vw, 0.5rem)',
                    background: 'var(--color-bg-secondary)',
                    padding: 'clamp(0.2rem, 0.5vw, 0.25rem)',
                    borderRadius: '0.75rem',
                    marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
                }}>
                    <button
                        type="button"
                        onClick={() => setRole('seller')}
                        style={{
                            padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.25rem, 1vw, 0.5rem)',
                            borderRadius: '0.5rem',
                            fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)',
                            fontWeight: '500',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            transition: 'all 0.2s',
                            minHeight: '44px',
                            background: role === 'seller' ? 'var(--color-bg-secondary)' : 'transparent',
                            color: role === 'seller' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                            border: role === 'seller' ? '1px solid var(--color-brand-primary)' : '1px solid transparent'
                        }}
                    >
                        <User size={16} /> Seller
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('buyer')}
                        style={{
                            padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.25rem, 1vw, 0.5rem)',
                            borderRadius: '0.5rem',
                            fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)',
                            fontWeight: '500',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            transition: 'all 0.2s',
                            minHeight: '44px',
                            background: role === 'buyer' ? 'var(--color-bg-secondary)' : 'transparent',
                            color: role === 'buyer' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                            border: role === 'buyer' ? '1px solid var(--color-brand-primary)' : '1px solid transparent'
                        }}
                    >
                        <Factory size={16} /> Buyer
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('recycler')}
                        style={{
                            padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.25rem, 1vw, 0.5rem)',
                            borderRadius: '0.5rem',
                            fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)',
                            fontWeight: '500',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem',
                            transition: 'all 0.2s',
                            minHeight: '44px',
                            background: role === 'recycler' ? 'var(--color-bg-secondary)' : 'transparent',
                            color: role === 'recycler' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                            border: role === 'recycler' ? '1px solid var(--color-brand-primary)' : '1px solid transparent'
                        }}
                    >
                        <Recycle size={16} /> Recycler
                    </button>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1.25rem)' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder={`Enter your ${role} email`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: 'clamp(0.75rem, 2vw, 1rem)', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white', fontSize: '16px', minHeight: '44px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>Password</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: 'clamp(0.75rem, 2vw, 1rem)', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white', fontSize: '16px', minHeight: '44px' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center', padding: 'clamp(1rem, 2vw, 0.75rem)', minHeight: '48px', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                        Sign In as {role.charAt(0).toUpperCase() + role.slice(1)} <ArrowRight size={18} />
                    </button>
                </form>

                <p style={{ marginTop: 'clamp(1rem, 2vw, 1.5rem)', textAlign: 'center', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', color: 'var(--color-text-muted)' }}>
                    Don't have an account? <a href="/register" style={{ color: 'var(--color-brand-primary)' }}>Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
