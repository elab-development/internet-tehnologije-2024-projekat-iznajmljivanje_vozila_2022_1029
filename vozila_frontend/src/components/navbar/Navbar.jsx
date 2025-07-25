// src/components/navbar/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import logo from '../images/logo3.png';

const Navbar = () => {
  const navigate = useNavigate();

  // Čitamo podatke iz sessionStorage
  const username = sessionStorage.getItem('username') || '';
  const isAdmin = sessionStorage.getItem('isAdmin') === '1';

  const handleLogout = async () => {
    const token = sessionStorage.getItem('auth_token');
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('isAdmin');
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand-container">
        <img src={logo} alt="Logo" className="nav-logo" />
        <Link to="/pocetna" className="nav-link nav-brand">
          Iznajmljivanje vozila
        </Link>
      </div>

      <div className="nav-links">
        {isAdmin && (
          <>
            <Link to="/administrator-dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/users" className="nav-link">
              Korisnici
            </Link>
            <Link to="/cars-admin" className="nav-link">
              Automobili
            </Link>
          </>
        )}

        {!isAdmin && (
          <>
            <Link to="/pocetna" className="nav-link">
              Početna
            </Link>
            <Link to="/about" className="nav-link">
              O nama
            </Link>
            <Link to="/cars" className="nav-link">
              Naša vozila
            </Link>
            <Link to="/rezervacije" className="nav-link">
              Vaše rezervacije
            </Link>
          </>
        )}

        <div className="nav-user-info">
          <span>Trenutno prijavljen: </span>
          <strong>{username}</strong>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Odjavi se
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
