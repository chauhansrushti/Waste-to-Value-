import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Initialize user from localStorage if available
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('eco_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const navigate = useNavigate();

    const login = (role, email) => {
        const userData = { role, email, name: email.split('@')[0] || role };
        setUser(userData);
        localStorage.setItem('eco_user', JSON.stringify(userData));

        if (role === 'seller') {
            navigate('/seller');
        } else if (role === 'buyer') {
            navigate('/buyer');
        } else if (role === 'recycler') {
            navigate('/recycler');
        } else {
            navigate('/');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('eco_user');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
