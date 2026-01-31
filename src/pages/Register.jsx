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
            paddingTop: '8rem',
            paddingBottom: '4rem',
            background: 'transparent'
        }}>
            {/* Background Decorative Element */}
            <div style={{ position: 'absolute', top: '10%', right: '10%', width: '300px', height: '300px', background: 'rgba(0, 255, 157, 0.03)', borderRadius: '50%', filter: 'blur(80px)', zIndex: -1 }}></div>

            <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--color-brand-primary)' }}></div>

                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50px',
                        height: '50px',
                        background: 'rgba(0, 255, 157, 0.1)',
                        borderRadius: '12px',
                        color: 'var(--color-brand-primary)',
                        marginBottom: '1rem'
                    }}>
                        <UserPlus size={28} />
                    </div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-1px' }}>Create Account</h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>Join the EcoConnect sustainability network</p>
                </div>

                {/* Role Selector Tabs */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                        I want to join as a:
                    </label>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0.5rem',
                        background: 'var(--color-bg-secondary)',
                        padding: '0.25rem',
                        borderRadius: '1rem'
                    }}>
                        <button
                            type="button"
                            onClick={() => setRole('seller')}
                            style={{
                                padding: '1rem 0.5rem',
                                borderRadius: '0.75rem',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.4rem',
                                transition: 'all 0.3s',
                                background: role === 'seller' ? 'var(--color-bg-tertiary)' : 'transparent',
                                color: role === 'seller' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                                border: role === 'seller' ? '1px solid rgba(0, 255, 157, 0.2)' : '1px solid transparent',
                                boxShadow: role === 'seller' ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                            }}
                        >
                            <User size={18} /> Seller
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('buyer')}
                            style={{
                                padding: '1rem 0.5rem',
                                borderRadius: '0.75rem',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.4rem',
                                transition: 'all 0.3s',
                                background: role === 'buyer' ? 'var(--color-bg-tertiary)' : 'transparent',
                                color: role === 'buyer' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                                border: role === 'buyer' ? '1px solid rgba(0, 255, 157, 0.2)' : '1px solid transparent',
                                boxShadow: role === 'buyer' ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                            }}
                        >
                            <Factory size={18} /> Buyer
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('recycler')}
                            style={{
                                padding: '1rem 0.5rem',
                                borderRadius: '0.75rem',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.4rem',
                                transition: 'all 0.3s',
                                background: role === 'recycler' ? 'var(--color-bg-tertiary)' : 'transparent',
                                color: role === 'recycler' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                                border: role === 'recycler' ? '1px solid rgba(0, 255, 157, 0.2)' : '1px solid transparent',
                                boxShadow: role === 'recycler' ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
                            }}
                        >
                            <Recycle size={18} /> Recycler
                        </button>
                    </div>
                </div>

                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                style={{ width: '100%', padding: '0.875rem', borderRadius: '10px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white', fontSize: '0.95rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                required
                                value={formData.companyName}
                                onChange={handleInputChange}
                                placeholder="EcoCorp Ltd."
                                style={{ width: '100%', padding: '0.875rem', borderRadius: '10px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white', fontSize: '0.95rem' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            style={{ width: '100%', padding: '0.875rem', borderRadius: '10px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white', fontSize: '0.95rem' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            style={{ width: '100%', padding: '0.875rem', borderRadius: '10px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white', fontSize: '0.95rem' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            style={{ width: '100%', padding: '0.875rem', borderRadius: '10px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white', fontSize: '0.95rem' }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(0, 255, 157, 0.05)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(0, 255, 157, 0.1)' }}>
                        <ShieldCheck size={20} color="var(--color-brand-primary)" style={{ flexShrink: 0 }} />
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                            By registering, I agree to EcoConnect's Terms of Service and Environmental Compliance Guidelines.
                        </p>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center', padding: '1rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '800' }}>
                        Register Profile <ArrowRight size={20} />
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--color-brand-primary)', fontWeight: '700', textDecoration: 'none' }}>Sign In here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
