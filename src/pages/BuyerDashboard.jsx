import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Filter, MapPin, Package, X, Recycle, Bell, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';

const BuyerDashboard = () => {
    const { listings, buyListing, addRecycleRequest, recyclingRequests, notifications, clearNotifications, cart, addToCart, removeFromCart, clearCart } = useMarketplace();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedListing, setSelectedListing] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const categories = ['All', 'Plastic', 'E-Waste', 'Paper', 'Metal', 'Biomedical Waste', 'Hazardous Waste', 'Other'];

    // Filter notifications for the current user
    const myNotifications = notifications.filter(n => n.userId === (user ? user.name : 'Guest User'));

    // Filter recycling requests for the current user
    const myRecycleRequests = recyclingRequests.filter(req => req.requester === (user ? user.name : 'Guest User'));

    // Filter for available listings matching search
    const availableListings = listings.filter(item => {
        const matchesSearch = item.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        return item.status === 'Available' && matchesSearch && matchesCategory;
    });

    const handleBuy = (id) => {
        navigate(`/payment/${id}`);
    };

    const handleRecycle = (item) => {
        const requesterName = user ? user.name : 'Guest User';
        addRecycleRequest(item, requesterName);
        alert('We will reach you soon');
    };

    const openDetails = (item) => {
        setSelectedListing(item);
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0);

    return (
        <div className="container" style={{ padding: '8rem 2rem 4rem', background: 'transparent' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Buyer Marketplace</h1>
                    <p>Source verified materials directly from generators.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        style={{ background: isFilterOpen ? 'var(--color-bg-tertiary)' : '' }}
                    >
                        <Filter size={18} /> Filters {selectedCategory !== 'All' && `(${selectedCategory})`}
                    </button>
                    <button className="btn btn-primary" onClick={() => setIsCartOpen(true)} style={{ position: 'relative' }}>
                        <ShoppingCart size={18} /> Cart
                        {cart.length > 0 && (
                            <span style={{
                                position: 'absolute', top: '-8px', right: '-8px',
                                background: 'var(--color-danger)', color: 'white',
                                fontSize: '0.7rem', padding: '0.2rem 0.5rem',
                                borderRadius: '999px', fontWeight: 'bold'
                            }}>
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            {/* Category Filter Tray */}
            {isFilterOpen && (
                <div style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--color-bg-secondary)', borderRadius: '12px', border: '1px solid var(--color-bg-tertiary)', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginRight: '0.5rem' }}>Categories:</span>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid',
                                borderColor: selectedCategory === cat ? 'var(--color-brand-primary)' : 'var(--color-bg-tertiary)',
                                background: selectedCategory === cat ? 'rgba(0, 255, 157, 0.1)' : 'transparent',
                                color: selectedCategory === cat ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                    {selectedCategory !== 'All' && (
                        <button
                            onClick={() => setSelectedCategory('All')}
                            style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            Reset
                        </button>
                    )}
                </div>
            )}

            {/* Active Recycling Requests */}
            {myRecycleRequests.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Recycle size={20} color="var(--color-warning)" /> My Recycling Requests
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {myRecycleRequests.map(req => (
                            <div key={req.id} className="card" style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: '600' }}>{req.material}</span>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '99px',
                                        background: req.status === 'Accepted' ? 'rgba(16, 185, 129, 0.1)' : req.status === 'Rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                        color: req.status === 'Accepted' ? 'var(--color-brand-primary)' : req.status === 'Rejected' ? 'var(--color-danger)' : 'var(--color-warning)',
                                        fontWeight: '600'
                                    }}>
                                        {req.status}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                    {req.quantity} {req.unit} • {req.location}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Notifications */}
            {myNotifications.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bell size={20} color="var(--color-brand-primary)" /> Notifications
                        </h2>
                        <button
                            onClick={() => clearNotifications(user ? user.name : 'Guest User')}
                            style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            Clear All
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {myNotifications.map(notif => (
                            <div key={notif.id} className="card" style={{ padding: '1rem', borderLeft: '4px solid var(--color-brand-primary)', background: 'rgba(0, 255, 157, 0.05)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ margin: 0, fontWeight: '500' }}>{notif.message}</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                        {new Date(notif.date).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: '3rem' }}>
                <input
                    type="text"
                    placeholder="Search materials (e.g., 'HDPE Plastic', 'Aluminum Can')"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '1rem 3rem', borderRadius: '12px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-secondary)', color: 'white', fontSize: '1rem' }}
                />
                <Search size={20} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            </div>

            {/* Listings Grid */}
            {availableListings.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableListings.map((item) => (
                        <div key={item.id} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            {/* Image / Placeholder */}
                            <div style={{ height: '200px', background: `linear-gradient(45deg, #1e293b, #334155)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                {item.image ? (
                                    <img src={item.image} alt={item.material} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <Package size={48} color="var(--color-text-muted)" />
                                )}
                                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--color-brand-primary)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', color: 'white', fontWeight: 'bold' }}>
                                    {item.category}
                                </div>
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', color: 'white' }}>
                                    {item.quality} Grade
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{item.material}</h3>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <MapPin size={12} /> {item.location}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ color: 'var(--color-brand-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>₹{item.pricePerUnit}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>per {item.unit}</div>
                                    </div>
                                </div>

                                <div style={{ margin: '1rem 0', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '0.875rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Quantity:</span>
                                        <span style={{ fontWeight: '500' }}>{item.quantity} {item.unit}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Seller:</span>
                                        <span style={{ fontWeight: '500' }}>{item.seller}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-bg-tertiary)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>Total:</span>
                                        <span style={{ fontWeight: 'bold', color: 'white' }}>₹{(item.quantity * item.pricePerUnit).toFixed(2)}</span>
                                    </div>
                                </div>

                                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => openDetails(item)}
                                            className="btn btn-secondary"
                                            style={{ flex: 1, justifyContent: 'center' }}
                                        >
                                            Details
                                        </button>
                                        <button
                                            onClick={() => handleRecycle(item)}
                                            className="btn btn-secondary"
                                            style={{ flex: 1, justifyContent: 'center', borderColor: 'var(--color-warning)', color: 'var(--color-warning)' }}
                                        >
                                            <Recycle size={18} /> Recycle
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => { addToCart(item); alert('Item added to your cart!'); }}
                                            className="btn btn-secondary"
                                            style={{ flex: 1, justifyContent: 'center' }}
                                        >
                                            <ShoppingCart size={18} style={{ marginRight: '0.5rem' }} /> Add to Cart
                                        </button>
                                        <button
                                            onClick={() => handleBuy(item.id)}
                                            className="btn btn-primary"
                                            style={{ flex: 1, justifyContent: 'center' }}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
                    <Package size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                    <p>No listings found matching "{searchTerm}".</p>
                </div>
            )}

            {/* Cart Modal */}
            {isCartOpen && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <ShoppingCart color="var(--color-brand-primary)" />
                                <h2 style={{ fontSize: '1.5rem' }}>Your Cart ({cart.length})</h2>
                            </div>
                            <button onClick={() => setIsCartOpen(false)} style={{ padding: '0.5rem' }}><X size={24} /></button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem' }}>
                            {cart.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {cart.map(item => (
                                        <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', alignItems: 'center' }}>
                                            <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', background: '#334155', flexShrink: 0 }}>
                                                {item.image && <img src={item.image} alt={item.material} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ margin: 0, fontSize: '1rem' }}>{item.material}</h4>
                                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{item.quantity} {item.unit} • ₹{item.pricePerUnit}/{item.unit}</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontWeight: '600' }}>₹{(item.pricePerUnit * item.quantity).toFixed(2)}</div>
                                                <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--color-danger)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-text-muted)' }}>
                                    <ShoppingCart size={48} style={{ opacity: 0.1, marginBottom: '1rem' }} />
                                    <p>Your cart is empty</p>
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div style={{ borderTop: '1px solid var(--color-bg-tertiary)', paddingTop: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                                    <span>Total</span>
                                    <span>₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button onClick={clearCart} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Clear Cart</button>
                                    <button onClick={() => { setIsCartOpen(false); alert('Checkout logic goes here!'); }} className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }}>Checkout Now</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Product Details Modal */}
            {
                selectedListing && (
                    <div style={{
                        position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)'
                    }}>
                        <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.5rem' }}>Product Details</h2>
                                <button onClick={() => setSelectedListing(null)} style={{ padding: '0.5rem' }}><X size={20} /></button>
                            </div>

                            <div style={{ marginBottom: '1.5rem', borderRadius: '12px', overflow: 'hidden', height: '300px', background: '#334155' }}>
                                {selectedListing.image ? (
                                    <img src={selectedListing.image} alt={selectedListing.material} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : (
                                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Package size={64} style={{ opacity: 0.2 }} />
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-brand-primary)' }}>{selectedListing.material}</h3>
                                    <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <MapPin size={16} /> {selectedListing.location}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>₹{selectedListing.pricePerUnit}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>per {selectedListing.unit}</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '2rem' }}>
                                <div className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Quality Grade</span>
                                    <div style={{ fontWeight: '500', fontSize: '1.1rem' }}>{selectedListing.quality}</div>
                                </div>
                                <div className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Total Quantity</span>
                                    <div style={{ fontWeight: '500', fontSize: '1.1rem' }}>{selectedListing.quantity} {selectedListing.unit}</div>
                                </div>
                                <div className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Total Cost</span>
                                    <div style={{ fontWeight: '500', fontSize: '1.1rem' }}>₹{(selectedListing.quantity * selectedListing.pricePerUnit).toFixed(2)}</div>
                                </div>
                                <div className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Seller</span>
                                    <div style={{ fontWeight: '500', fontSize: '1.1rem' }}>{selectedListing.seller}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => handleBuy(selectedListing.id)}
                                    className="btn btn-secondary"
                                    style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', justifyContent: 'center' }}
                                >
                                    Buy Now
                                </button>
                                <button
                                    onClick={() => { addToCart(selectedListing); alert('Added to cart!'); }}
                                    className="btn btn-primary"
                                    style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', justifyContent: 'center' }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default BuyerDashboard;
