import React, { useState } from 'react';
import { User, Factory, Recycle, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [role, setRole] = useState('seller');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: ''
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Simulation of registration - we just login with the role
        login(role, formData.email);
        navigate(role === 'seller' ? '/seller' : role === 'buyer' ? '/buyer' : '/recycler');
    };

    return (
        <div className="container" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 'clamp(5rem, 8vw, 8rem)',
            paddingBottom: 'clamp(2rem, 5vw, 4rem)',
            background: 'transparent'
        }}>
            {/* Background Decorative Element */}
            <div style={{ position: 'absolute', top: '10%', right: '10%', width: 'min(300px, 50vw)', height: 'min(300px, 50vw)', background: 'rgba(0, 255, 157, 0.03)', borderRadius: '50%', filter: 'blur(80px)', zIndex: -1 }}></div>

            <div className="card" style={{ width: '100%', maxWidth: '500px', padding: 'clamp(1.5rem, 4vw, 3rem)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--color-brand-primary)' }}></div>

                <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 'clamp(40px, 10vw, 50px)',
                        height: 'clamp(40px, 10vw, 50px)',
                        background: 'rgba(0, 255, 157, 0.1)',
                        borderRadius: '12px',
                        color: 'var(--color-brand-primary)',
                        marginBottom: '1rem'
                    }}>
                        <UserPlus size={24} />
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-1px' }}>Create Account</h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>Join the EcoConnect sustainability network</p>
                </div>

                {/* Role Selector Tabs */}
                <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', fontWeight: '600', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                        I want to join as a:
                    </label>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 'clamp(0.25rem, 0.5vw, 0.5rem)',
                        background: 'var(--color-bg-secondary)',
                        padding: 'clamp(0.2rem, 0.5vw, 0.25rem)',
                        borderRadius: '1rem'
                    }}>
                        <button
                            type="button"
                            onClick={() => setRole('seller')}
                            style={{
                                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(0.25rem, 1vw, 0.5rem)',
                                borderRadius: '0.75rem',
                                fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
                                fontWeight: '700',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.4rem',
                                transition: 'all 0.3s',
                                minHeight: '44px',
                                background: role === 'seller' ? 'var(--color-bg-tertiary)' : 'transparent',
                                color: role === 'seller' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                                border: role === 'seller' ? '1px solid rgba(0, 255, 157, 0.2)' : '1px solid transparent',
                                boxShadow: role === 'seller' ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                            }}
                        >
                            <User size={16} /> Seller
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('buyer')}
                            style={{
                                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(0.25rem, 1vw, 0.5rem)',
                                borderRadius: '0.75rem',
                                fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
                                fontWeight: '700',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.4rem',
                                transition: 'all 0.3s',
                                minHeight: '44px',
                                background: role === 'buyer' ? 'var(--color-bg-tertiary)' : 'transparent',
                                color: role === 'buyer' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                                border: role === 'buyer' ? '1px solid rgba(0, 255, 157, 0.2)' : '1px solid transparent',
                                boxShadow: role === 'buyer' ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                            }}
                        >
                            <Factory size={16} /> Buyer
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('recycler')}
                            style={{
                                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(0.25rem, 1vw, 0.5rem)',
                                borderRadius: '0.75rem',
                                fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
                                fontWeight: '700',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.4rem',
                                transition: 'all 0.3s',
                                minHeight: '44px',
                                background: role === 'recycler' ? 'var(--color-bg-tertiary)' : 'transparent',
                                color: role === 'recycler' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                                border: role === 'recycler' ? '1px solid rgba(0, 255, 157, 0.2)' : '1px solid transparent',
                                boxShadow: role === 'recycler' ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                            }}
                        >
                            <Recycle size={16} /> Recycler
                        </button>
                    </div>
                </div>

                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 1.25rem)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.75rem, 2vw, 1rem)' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', color: 'var(--color-text-secondary)' }}>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                style={{ width: '100%', padding: 'clamp(0.75rem, 2vw, 0.875rem)', borderRadius: '10px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white', fontSize: '16px', minHeight: '44px' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', color: 'var(--color-text-secondary)' }}>Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                required
                                value={formData.companyName}
                                onChange={handleInputChange}
                                placeholder="EcoCorp Ltd."
                                style={{ width: '100%', padding: 'clamp(0.75rem, 2vw, 0.875rem)', borderRadius: '10px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white', fontSize: '16px', minHeight: '44px' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', color: 'var(--color-text-secondary)' }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            style={{ width: '100%', padding: 'clamp(0.75rem, 2vw, 0.875rem)', borderRadius: '10px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white', fontSize: '16px', minHeight: '44px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', color: 'var(--color-text-secondary)' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            style={{ width: '100%', padding: 'clamp(0.75rem, 2vw, 0.875rem)', borderRadius: '10px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white', fontSize: '16px', minHeight: '44px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', color: 'var(--color-text-secondary)' }}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            style={{ width: '100%', padding: 'clamp(0.75rem, 2vw, 0.875rem)', borderRadius: '10px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white', fontSize: '16px', minHeight: '44px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(0.5rem, 2vw, 0.75rem)', background: 'rgba(0, 255, 157, 0.05)', padding: 'clamp(0.75rem, 2vw, 1rem)', borderRadius: '10px', border: '1px solid rgba(0, 255, 157, 0.1)' }}>
                        <ShieldCheck size={18} color="var(--color-brand-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <p style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.8rem)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.4' }}>
                            By registering, I agree to EcoConnect's Terms of Service and Environmental Compliance Guidelines.
                        </p>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center', padding: 'clamp(1rem, 2vw, 1rem)', borderRadius: '12px', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontWeight: '800', minHeight: '48px' }}>
                        Register Profile <ArrowRight size={20} />
                    </button>
                </form>

                <p style={{ marginTop: 'clamp(1.5rem, 3vw, 2rem)', textAlign: 'center', fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)', color: 'var(--color-text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--color-brand-primary)', fontWeight: '700', textDecoration: 'none' }}>Sign In here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
