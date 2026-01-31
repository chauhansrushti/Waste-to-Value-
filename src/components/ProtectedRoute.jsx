import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, isAuthenticated } = useAuth();

    // Not logged in -> Go to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Checking for role authorization
    if (requiredRole && user.role !== requiredRole) {
        // Redirect to their own dashboard if they try to access another role's page
        if (user.role === 'seller') return <Navigate to="/seller" replace />;
        if (user.role === 'buyer') return <Navigate to="/buyer" replace />;
        if (user.role === 'recycler') return <Navigate to="/recycler" replace />;

        // Final fallback
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
