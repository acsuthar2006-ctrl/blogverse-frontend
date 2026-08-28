/**
 * @file axiosConfig.js
 * @description Centralized Axios HTTP client configuration.
 * Creates a pre-configured Axios instance with the API base URL and
 * automatically attaches the JWT bearer token from localStorage to
 * every outgoing request via a request interceptor.
 *
 * Usage:
 *   import api from './api/axiosConfig';
 *   const res = await api.get('/posts');
 */
import axios from 'axios';

/** Base Axios instance pointed at the Spring Boot backend */
const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor — attaches the JWT token stored in localStorage
 * to the Authorization header of every outgoing request.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
