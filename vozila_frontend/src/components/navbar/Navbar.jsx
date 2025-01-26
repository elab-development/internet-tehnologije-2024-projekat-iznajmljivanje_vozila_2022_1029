import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link nav-brand">Iznajmljivanje vozila</Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Pocetna</Link>
        <Link to="/about" className="nav-link">O nama</Link>
        <Link to="/cars" className="nav-link">Nasa vozila</Link>
        
      </div>
    </nav>
  );
};
export default Navbar;