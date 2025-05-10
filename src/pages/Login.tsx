import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { setToken } from '../features/auth/authSlice';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post('/login/', { username, password });
      dispatch(setToken(res.data.access));
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
