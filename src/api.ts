import axios from 'axios';
import { store } from './app/store';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Add a request interceptor to attach the token
API.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;

    if (token) {
      // If there's a token, attach it to the request's Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
