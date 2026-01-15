import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const item = localStorage.getItem('user');
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Failed to parse user from localStorage', e);
            localStorage.removeItem('user');
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/api/auth/login', { email, password });
            setUser(data);
            return data;
        } catch (error) {
            throw error.response?.data?.message || 'Login failed';
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const { data } = await axios.post('/api/auth/register', { name, email, password, role });
            setUser(data);
            return data;
        } catch (error) {
            throw error.response?.data?.message || 'Registration failed';
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
