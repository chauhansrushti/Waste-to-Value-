import React, { useState } from 'react';
import { Package, Plus, DollarSign, MapPin, X, Edit, Trash2, Bell, Recycle as RecycleIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useMarketplace } from '../context/MarketplaceContext';

const SellerDashboard = () => {
    const { user } = useAuth();
    const { listings, addListing, editListing, deleteListing, notifications, addRecycleRequest, clearNotifications } = useMarketplace();
    // Filter listings for the current seller
    const myListings = listings.filter(l => l.seller === (user ? user.name : 'Demo User'));
    // Filter notifications for the current seller
    const myNotifications = notifications.filter(n => n.userId === (user ? user.name : 'Demo User'));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newListing, setNewListing] = useState({
        material: '',
        category: 'Plastic',
        quantity: '',
        unit: 'kg',
        pricePerUnit: '',
        location: '',
        quality: 'Medium',
        image: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewListing(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewListing(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = (listing) => {
        setEditingId(listing.id);
        setNewListing({
            material: listing.material,
            category: listing.category || 'Plastic',
            quantity: listing.quantity,
            unit: listing.unit,
            pricePerUnit: listing.pricePerUnit,
            location: listing.location,
            quality: listing.quality,
            image: listing.image || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            deleteListing(id);
        }
    };

    const openNewListingModal = () => {
        setEditingId(null);
        setNewListing({
            material: '',
            category: 'Plastic',
            quantity: '',
            unit: 'kg',
            pricePerUnit: '',
            location: '',
            quality: 'Medium',
            image: ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const listingData = {
            ...newListing,
            quantity: Number(newListing.quantity),
            pricePerUnit: Number(newListing.pricePerUnit),
            seller: user ? user.name : 'Demo User'
        };

        if (editingId) {
            editListing(editingId, listingData);
        } else {
            addListing(listingData);
        }

        setIsModalOpen(false);
        setEditingId(null);
        setNewListing({ material: '', category: 'Plastic', quantity: '', unit: 'kg', pricePerUnit: '', location: '', quality: 'Medium', image: '' });
    };

    return (
        <div className="container" style={{ padding: '8rem 2rem 4rem', background: 'transparent' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Seller Dashboard</h1>
                    <p>Manage your waste listings and track pickups.</p>
                </div>
                <button className="btn btn-primary" onClick={openNewListingModal}>
                    <Plus size={18} /> New Listing
                </button>
            </header>

            {/* Notifications */}
            {myNotifications.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bell size={20} color="var(--color-brand-primary)" /> Notifications
                        </h2>
                        <button
                            onClick={() => clearNotifications(user ? user.name : 'Demo User')}
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

            {/* Overview Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div className="card">
                    <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Total Earnings</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹85,450.00</p>
                </div>
                <div className="card">
                    <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Active Listings</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{myListings.filter(l => l.status === 'Available').length}</p>
                </div>
                <div className="card">
                    <h3 style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Waste Recycled</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>450 kg</p>
                </div>
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Your Listings</h2>
            <div style={{ overflowX: 'auto', background: 'var(--color-bg-secondary)', borderRadius: '1rem', border: '1px solid var(--color-bg-tertiary)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-bg-tertiary)', textAlign: 'left' }}>
                            <th style={{ padding: '1.5rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>Material</th>
                            <th style={{ padding: '1.5rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>Quantity</th>
                            <th style={{ padding: '1.5rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>Price / Unit</th>
                            <th style={{ padding: '1.5rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>Total Value</th>
                            <th style={{ padding: '1.5rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>Status</th>
                            <th style={{ padding: '1.5rem', color: 'var(--color-text-muted)', fontWeight: '500' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myListings.length > 0 ? (
                            myListings.map(listing => (
                                <tr key={listing.id} style={{ borderBottom: '1px solid var(--color-bg-tertiary)' }}>
                                    <td style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0,
                                                background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                {listing.image ? (
                                                    <img src={listing.image} alt={listing.material} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <Package size={20} color="var(--color-brand-primary)" />
                                                )}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600' }}>{listing.material}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                    <MapPin size={12} /> {listing.location}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.5rem' }}>{listing.quantity} {listing.unit}</td>
                                    <td style={{ padding: '1.5rem' }}>₹{listing.pricePerUnit}</td>
                                    <td style={{ padding: '1.5rem', fontWeight: '600' }}>₹{(listing.quantity * listing.pricePerUnit).toFixed(2)}</td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '999px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            background: listing.status === 'Available' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: listing.status === 'Available' ? 'var(--color-brand-primary)' : 'var(--color-danger)'
                                        }}>
                                            {listing.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                className="btn btn-secondary"
                                                style={{ padding: '0.5rem' }}
                                                onClick={() => handleEdit(listing)}
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                className="btn btn-secondary"
                                                style={{ padding: '0.5rem', color: 'var(--color-warning)' }}
                                                onClick={() => {
                                                    addRecycleRequest(listing, user ? user.name : 'Demo User');
                                                    alert('Recycling request sent to partners!');
                                                }}
                                                title="Request Recycling"
                                            >
                                                <RecycleIcon size={14} />
                                            </button>
                                            <button
                                                className="btn btn-secondary"
                                                style={{ padding: '0.5rem', color: 'var(--color-danger)' }}
                                                onClick={() => handleDelete(listing.id)}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No listings found. Create one to get started!</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for New/Edit Listing */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>{editingId ? 'Edit Listing' : 'New Listing'}</h2>
                            <button onClick={() => setIsModalOpen(false)} style={{ padding: '0.5rem' }}><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Material Image</label>
                                <div style={{
                                    border: '1px dashed var(--color-bg-tertiary)',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    textAlign: 'center',
                                    position: 'relative',
                                    background: 'rgba(255,255,255,0.02)'
                                }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0,
                                            cursor: 'pointer'
                                        }}
                                    />
                                    {newListing.image ? (
                                        <div style={{ position: 'relative', height: '150px' }}>
                                            <img src={newListing.image} alt="Preview" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
                                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0}>
                                                <span style={{ color: 'white' }}>Change Image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ padding: '1rem 0', color: 'var(--color-text-muted)' }}>
                                            <Package size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
                                            <p style={{ fontSize: '0.9rem' }}>Click or drag to upload image</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Material Type</label>
                                <input
                                    type="text" name="material" required
                                    placeholder="e.g. HDPE Plastic, Aluminum Cans"
                                    value={newListing.material} onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Category</label>
                                <select
                                    name="category"
                                    value={newListing.category} onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white' }}
                                >
                                    <option value="Plastic">Plastic</option>
                                    <option value="E-Waste">E-Waste</option>
                                    <option value="Paper">Paper & Cardboard</option>
                                    <option value="Metal">Metal</option>
                                    <option value="Biomedical Waste">Biomedical Waste</option>
                                    <option value="Hazardous Waste">Hazardous Waste</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Quantity</label>
                                    <input
                                        type="number" name="quantity" required
                                        placeholder="0.00"
                                        value={newListing.quantity} onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Unit</label>
                                    <select
                                        name="unit"
                                        value={newListing.unit} onChange={handleInputChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white' }}
                                    >
                                        <option value="kg">kg</option>
                                        <option value="ton">ton</option>
                                        <option value="pcs">pcs</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Price per Unit (₹)</label>
                                <input
                                    type="number" step="0.01" name="pricePerUnit" required
                                    placeholder="0.00"
                                    value={newListing.pricePerUnit} onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Location</label>
                                <input
                                    type="text" name="location" required
                                    placeholder="City, State"
                                    value={newListing.location} onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Quality Grade</label>
                                <select
                                    name="quality"
                                    value={newListing.quality} onChange={handleInputChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-bg-tertiary)', background: 'var(--color-bg-primary)', color: 'white' }}
                                >
                                    <option value="High">High (Clean, Sorted)</option>
                                    <option value="Medium">Medium (Mixed)</option>
                                    <option value="Low">Low (Unsorted/Dirty)</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                                {editingId ? 'Update Listing' : 'Publish Listing'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SellerDashboard;


