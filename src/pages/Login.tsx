import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginAsync } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginAsync({ username, password })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <h2>Login</h2>
        {error && <p className="error">Error: {error}</p>}
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
