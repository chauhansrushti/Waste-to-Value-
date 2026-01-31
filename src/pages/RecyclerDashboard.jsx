import React, { useState } from 'react';
import { Truck, CheckCircle2, MapPin, Package, X, RotateCw } from 'lucide-react'; // Changed CheckCircle to CheckCircle2
import { useMarketplace } from '../context/MarketplaceContext';

const RecyclerDashboard = () => {
    const { listings, updatePickupStatus, updateListingStatus, recyclingRequests, acceptRecycleRequest, rejectRecycleRequest, maxCapacity, updateMaxCapacity } = useMarketplace();

    const [currentUsage, setCurrentUsage] = useState(1200); // Simulated usage

    const pendingRequests = recyclingRequests.filter(req => req.status === 'Pending');

    // Filter for items that need pickup or processing
    const pendingCollection = listings.filter(l => l.status === 'Sold' && l.pickupStatus === 'Pending');
    const collectedItems = listings.filter(l => l.status === 'Sold' && l.pickupStatus === 'Collected');

    const handleCollect = (id) => {
        updatePickupStatus(id, 'Collected');
    };

    const handleProcess = (id) => {
        updateListingStatus(id, 'Processed');
        // Also clear pickup status or mark complete
        updatePickupStatus(id, 'Completed');
    };



    return (
        <div className="container" style={{ padding: '8rem 2rem 4rem', background: 'transparent' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Recycler Operations</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Capacity: <span style={{ fontWeight: 'bold', color: 'var(--color-brand-primary)' }}>{currentUsage}</span> / {maxCapacity} kg
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                </div>
            </header>



            {/* Incoming Requests */}
            {pendingRequests.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Package color="var(--color-brand-primary)" /> Incoming Requests
                        <span style={{ fontSize: '0.8rem', background: 'var(--color-bg-tertiary)', padding: '0.2rem 0.6rem', borderRadius: '99px' }}>{pendingRequests.length}</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {pendingRequests.map(req => (
                            <div key={req.id} className="card" style={{ padding: '1.5rem', borderColor: 'var(--color-brand-primary)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{req.material}</h3>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{new Date(req.dateRequested).toLocaleDateString()}</span>
                                </div>
                                <div style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                                    <p>Quantity: {req.quantity} {req.unit}</p>
                                    <p>Location: {req.location}</p>
                                    <p>From: {req.requester}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => acceptRecycleRequest(req.id)}
                                        className="btn btn-primary"
                                        style={{ flex: 1, justifyContent: 'center' }}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => rejectRecycleRequest(req.id)}
                                        className="btn btn-secondary"
                                        style={{ flex: 1, justifyContent: 'center', borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Queues */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Pending Collections Column */}
                <div>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Truck color="var(--color-warning)" /> Pending Collections
                        <span style={{ fontSize: '0.8rem', background: 'var(--color-bg-tertiary)', padding: '0.2rem 0.6rem', borderRadius: '99px' }}>{pendingCollection.length}</span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {pendingCollection.length > 0 ? (
                            pendingCollection.map(item => (
                                <div key={item.id} className="card" style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{item.material}</h3>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>#{item.id}</span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <Package size={14} /> {item.quantity} {item.unit}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <MapPin size={14} /> {item.location}
                                        </div>
                                    </div>

                                    <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '1rem' }}>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Seller Contact:</p>
                                        <p style={{ fontWeight: '500' }}>{item.seller}</p>
                                    </div>

                                    <button
                                        onClick={() => handleCollect(item.id)}
                                        className="btn btn-primary"
                                        style={{ width: '100%', justifyContent: 'center', background: 'var(--color-warning)', color: 'black' }}
                                    >
                                        Mark Collected
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                No pending collections.
                            </div>
                        )}
                    </div>
                </div>

                {/* Processing Column */}
                <div>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <RotateCw color="var(--color-brand-primary)" /> Ready for Processing
                        <span style={{ fontSize: '0.8rem', background: 'var(--color-bg-tertiary)', padding: '0.2rem 0.6rem', borderRadius: '99px' }}>{collectedItems.length}</span>
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {collectedItems.length > 0 ? (
                            collectedItems.map(item => (
                                <div key={item.id} className="card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--color-brand-primary)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{item.material}</h3>
                                        <div style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--color-brand-primary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                            Quality: {item.quality}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                        <span>{item.quantity} {item.unit} from {item.seller}</span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => handleProcess(item.id)}
                                            className="btn btn-primary"
                                            style={{ flex: 1, justifyContent: 'center' }}
                                        >
                                            <CheckCircle2 size={16} /> Verify & Recycle
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ flex: 1, justifyContent: 'center', color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                No items in facility.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecyclerDashboard;
