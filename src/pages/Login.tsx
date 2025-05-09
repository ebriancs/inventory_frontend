import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../features/auth/authSlice';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await API.post('/login/', { username, password });
      dispatch(setToken(response.data.access));
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
