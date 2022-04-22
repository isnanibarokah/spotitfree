import React from 'react';
import { logout } from '../../redux/authSlice';
import { useAppDispatch } from '../../redux/store';

const NavigationBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout: () => void = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Spotitfree</h1>
      </div>
      <div className="navbar-login">
        <button className="btn btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;