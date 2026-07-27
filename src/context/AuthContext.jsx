import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ 
          email: decoded.sub, 
          username: decoded.username || decoded.sub 
        });
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser({ 
        email: decoded.sub, 
        username: decoded.username || decoded.sub 
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const register = async (username, email, password, fullName) => {
    try {
      const response = await api.post('/auth/register', { username, email, password, fullName });
      const token = response.data.data.token;
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser({ 
        email: decoded.sub, 
        username: decoded.username || decoded.sub 
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = async () => {
    await new Promise(resolve => setTimeout(resolve, 600)); // buffer animation
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
