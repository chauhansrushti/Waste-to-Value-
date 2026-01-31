import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const MarketplaceContext = createContext();

export const useMarketplace = () => useContext(MarketplaceContext);

export const MarketplaceProvider = ({ children }) => {
    const { user } = useAuth();

    // Initial seed data
    const initialListings = [
        {
            id: 1,
            seller: 'Green Earth Co.',
            material: 'PET Plastic Bottles',
            category: 'Plastic',
            quantity: 500,
            unit: 'kg',
            pricePerUnit: 25.00,
            location: 'New Delhi',
            quality: 'High',
            status: 'Available',
            image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&q=80',
            dateListed: new Date().toISOString()
        },
        {
            id: 2,
            seller: 'Tech Solutions Inc.',
            material: 'Electronic Waste (PCBs)',
            category: 'E-Waste',
            quantity: 50,
            unit: 'kg',
            pricePerUnit: 1200.00,
            location: 'Mumbai, MH',
            quality: 'Medium',
            status: 'Available',
            image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80',
            dateListed: new Date().toISOString()
        },
        {
            id: 3,
            seller: 'Local Grocers',
            material: 'Cardboard Bales',
            category: 'Paper',
            quantity: 1200,
            unit: 'kg',
            pricePerUnit: 8.00,
            location: 'Bangalore, KA',
            quality: 'Medium',
            status: 'Sold',
            buyer: 'Packaging Co.',
            pickupStatus: 'Pending',
            image: 'https://images.unsplash.com/photo-1585842826884-6302213e2f5b?w=800&q=80',
            dateListed: new Date(Date.now() - 86400000).toISOString()
        }
    ];

    // Load from localStorage or use initial data
    const [listings, setListings] = useState(() => {
        const saved = localStorage.getItem('marketplace_listings');
        return saved ? JSON.parse(saved) : initialListings;
    });

    // Save to localStorage whenever listings change
    useEffect(() => {
        localStorage.setItem('marketplace_listings', JSON.stringify(listings));
    }, [listings]);

    const [users, setUsers] = useState({
        currentUser: { name: 'Demo User', role: 'seller', balance: 85450.00 }
    });

    // Actions
    const addListing = (newListing) => {
        const listing = {
            id: Date.now(),
            seller: user ? user.name : 'Guest Seller',
            status: 'Available',
            dateListed: new Date().toISOString(),
            pickupStatus: 'None',
            ...newListing
        };
        setListings(prev => [listing, ...prev]);
    };

    const updateListingStatus = (id, newStatus) => {
        setListings(prev => prev.map(item =>
            item.id === id ? { ...item, status: newStatus } : item
        ));
    };

    const editListing = (id, updatedData) => {
        setListings(prev => prev.map(item =>
            item.id === id ? { ...item, ...updatedData } : item
        ));
    };

    const deleteListing = (id) => {
        setListings(prev => prev.filter(item => item.id !== id));
    };

    const buyListing = (id, buyerName) => {
        setListings(prev => prev.map(item =>
            item.id === id ? {
                ...item,
                status: 'Sold',
                buyer: buyerName,
                pickupStatus: 'Pending'
            } : item
        ));
    };

    const updatePickupStatus = (id, status) => {
        setListings(prev => prev.map(item =>
            item.id === id ? { ...item, pickupStatus: status } : item
        ));
    };

    // Recycling Requests
    const initialRecyclingRequests = [
        {
            id: 101,
            itemId: 2,
            material: 'Industrial Grade Scrap',
            quantity: 2500,
            unit: 'kg',
            location: 'Gurugram, HR',
            requester: 'Admin',
            seller: 'Tech Solutions Inc.',
            status: 'Pending',
            dateRequested: new Date().toISOString()
        }
    ];

    const [recyclingRequests, setRecyclingRequests] = useState(() => {
        const saved = localStorage.getItem('marketplace_recycling_requests');
        return saved ? JSON.parse(saved) : initialRecyclingRequests;
    });

    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('marketplace_notifications');
        return saved ? JSON.parse(saved) : [];
    });

    // Save recycling requests to localStorage
    useEffect(() => {
        localStorage.setItem('marketplace_recycling_requests', JSON.stringify(recyclingRequests));
    }, [recyclingRequests]);

    // Save notifications to localStorage
    useEffect(() => {
        localStorage.setItem('marketplace_notifications', JSON.stringify(notifications));
    }, [notifications]);

    const [maxCapacity, setMaxCapacity] = useState(5000);

    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('marketplace_cart');
        return saved ? JSON.parse(saved) : [];
    });

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('marketplace_cart', JSON.stringify(cart));
    }, [cart]);

    const addRecycleRequest = (item, requester) => {
        const request = {
            id: Date.now(),
            itemId: item.id,
            material: item.material,
            quantity: item.quantity,
            unit: item.unit,
            location: item.location,
            requester: requester,
            seller: item.seller, // Store seller info
            status: 'Pending',
            dateRequested: new Date().toISOString()
        };
        setRecyclingRequests(prev => [request, ...prev]);
    };

    const acceptRecycleRequest = (requestId) => {
        setRecyclingRequests(prev => prev.map(req => {
            if (req.id === requestId) {
                // Update the associated listing if it exists
                if (req.itemId) {
                    setListings(prevListings => prevListings.map(listing =>
                        listing.id === req.itemId
                            ? { ...listing, status: 'Sold', buyer: 'Recycler', pickupStatus: 'Pending' }
                            : listing
                    ));
                }

                // Create notification for the requester (Buyer/User)
                const requesterNotif = {
                    id: Date.now(),
                    userId: req.requester,
                    message: `Your recycling request for ${req.material} has been accepted by a recycler!`,
                    date: new Date().toISOString(),
                    read: false
                };

                // Create notification for the seller
                const sellerNotif = {
                    id: Date.now() + 1,
                    userId: req.seller,
                    message: `A recycler has accepted to process your material: ${req.material}. They will contact you soon.`,
                    date: new Date().toISOString(),
                    read: false
                };

                setNotifications(prevNotifs => [requesterNotif, sellerNotif, ...prevNotifs]);
                return { ...req, status: 'Accepted' };
            }
            return req;
        }));
    };

    const rejectRecycleRequest = (requestId) => {
        setRecyclingRequests(prev => prev.map(req => {
            if (req.id === requestId) {
                // Create notification for the requester (Buyer/User)
                const requesterNotif = {
                    id: Date.now(),
                    userId: req.requester,
                    message: `Your recycling request for ${req.material} was declined by the recycler.`,
                    date: new Date().toISOString(),
                    read: false
                };

                setNotifications(prevNotifs => [requesterNotif, ...prevNotifs]);
                return { ...req, status: 'Rejected' };
            }
            return req;
        }));
    };

    const updateMaxCapacity = (newCapacity) => {
        setMaxCapacity(newCapacity);
    };

    const addToCart = (item) => {
        setCart(prev => {
            const exists = prev.find(i => i.id === item.id);
            if (exists) return prev;
            return [...prev, item];
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prev => prev.filter(i => i.id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const clearNotifications = (userName) => {
        setNotifications(prev => prev.filter(n => n.userId !== userName));
    };

    return (
        <MarketplaceContext.Provider value={{
            listings,
            users,
            recyclingRequests,
            notifications,
            maxCapacity,
            cart,
            addListing,
            updateListingStatus,
            editListing,
            deleteListing,
            buyListing,
            updatePickupStatus,
            addRecycleRequest,
            acceptRecycleRequest,
            rejectRecycleRequest,
            updateMaxCapacity,
            clearNotifications,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </MarketplaceContext.Provider>
    );
};
