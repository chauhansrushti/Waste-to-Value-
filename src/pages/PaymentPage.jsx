import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ArrowLeft, Smartphone } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';

const PaymentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { listings, buyListing } = useMarketplace();
    const { user } = useAuth();

    const listing = listings.find(l => l.id === Number(id));
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'upi'

    if (!listing) return <div className="container" style={{ padding: '8rem 2rem' }}>Listing not found</div>;

    const handlePayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            buyListing(listing.id, user ? user.name : 'Guest Buyer');
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                <div className="card" style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem' }}>
                    <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', marginBottom: '1.5rem' }}>
                        <CheckCircle size={48} color="var(--color-brand-primary)" />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Payment Successful!</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                        You have successfully purchased {listing.quantity} {listing.unit} of {listing.material}.
                    </p>
                    <button className="btn btn-primary" onClick={() => navigate('/buyer')}>
                        Return to Marketplace
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '8rem 2rem 4rem' }}>
            <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ArrowLeft size={16} /> Back
            </button>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Order Summary</h2>
                    <div className="card">
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', background: '#334155' }}>
                                {listing.image && <img src={listing.image} alt={listing.material} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{listing.material}</h3>
                                <p style={{ color: 'var(--color-text-muted)' }}>{listing.quantity} {listing.unit}</p>
                            </div>
                        </div>

                        <div style={{ padding: '1rem 0', borderTop: '1px solid var(--color-bg-tertiary)', borderBottom: '1px solid var(--color-bg-tertiary)', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal</span>
                                <span>₹{(listing.quantity * listing.pricePerUnit).toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--color-text-secondary)' }}>Platform Fee (2%)</span>
                                <span>₹{(listing.quantity * listing.pricePerUnit * 0.02).toFixed(2)}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                            <span>Total</span>
                            <span>₹{(listing.quantity * listing.pricePerUnit * 1.02).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Payment Details</h2>
                    <div className="card">
                        {/* Payment Method Selector */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: '600' }}>Select Payment Method</label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: `2px solid ${paymentMethod === 'card' ? 'var(--color-brand-primary)' : 'var(--color-bg-tertiary)'}`,
                                        background: paymentMethod === 'card' ? 'rgba(0, 255, 157, 0.1)' : 'var(--color-bg-primary)',
                                        color: 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <CreditCard size={24} color={paymentMethod === 'card' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)'} />
                                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Card</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('upi')}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        border: `2px solid ${paymentMethod === 'upi' ? 'var(--color-brand-primary)' : 'var(--color-bg-tertiary)'}`,
                                        background: paymentMethod === 'upi' ? 'rgba(0, 255, 157, 0.1)' : 'var(--color-bg-primary)',
                                        color: 'white',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <Smartphone size={24} color={paymentMethod === 'upi' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)'} />
                                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>UPI</span>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {paymentMethod === 'card' ? (
                                <>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Cardholder Name</label>
                                        <input type="text" placeholder="John Doe" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white' }} />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Card Number</label>
                                        <div style={{ position: 'relative' }}>
                                            <input type="text" placeholder="0000 0000 0000 0000" required style={{ width: '100%', padding: '0.75rem', paddingLeft: '3rem', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white' }} />
                                            <CreditCard size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Expiry Date</label>
                                            <input type="text" placeholder="MM/YY" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white' }} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>CVC</label>
                                            <input type="text" placeholder="123" required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white' }} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>UPI ID</label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="text"
                                                placeholder="yourname@upi"
                                                required
                                                pattern="[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}"
                                                style={{
                                                    width: '100%',
                                                    padding: '0.75rem',
                                                    paddingLeft: '3rem',
                                                    borderRadius: '8px',
                                                    border: '1px solid var(--color-bg-tertiary)',
                                                    background: 'var(--color-bg-primary)',
                                                    color: 'white'
                                                }}
                                            />
                                            <Smartphone size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                                            Enter your UPI ID (e.g., yourname@paytm, yourname@googlepay)
                                        </p>
                                    </div>

                                    <div style={{
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        background: 'rgba(0, 255, 157, 0.1)',
                                        border: '1px solid rgba(0, 255, 157, 0.2)'
                                    }}>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                                            <strong style={{ color: 'var(--color-brand-primary)' }}>Supported UPI Apps:</strong>
                                        </p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                            Google Pay, PhonePe, Paytm, BHIM, Amazon Pay, and other UPI-enabled apps
                                        </p>
                                    </div>
                                </>
                            )}

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="btn btn-primary"
                                style={{ marginTop: '1rem', width: '100%', justifyContent: 'center', opacity: isProcessing ? 0.7 : 1 }}
                            >
                                {isProcessing ? 'Processing...' : `Pay ₹${(listing.quantity * listing.pricePerUnit * 1.02).toFixed(2)}`}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
