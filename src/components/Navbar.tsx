import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar__content">
        <h1>Inventory</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
