import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo3.png'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand-container">
        <img src={logo} alt="Logo" className="nav-logo" />
        <Link to="/" className="nav-link nav-brand">Iznajmljivanje vozila</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Početna</Link>
        <Link to="/about" className="nav-link">O nama</Link>
        <Link to="/cars" className="nav-link">Naša vozila</Link>
      </div>
    </nav>
  );
};

export default Navbar;
