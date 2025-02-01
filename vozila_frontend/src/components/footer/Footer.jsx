import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer" >
      <div className="footer-content">
        <p> Iznajmljivanje vozila d.o.o </p>
        <p> iznajmljivanje.vozila@gmail.com </p>
        <p> +38169787632</p>

        <div className="social-links">
          <p> Pogledajte nase drustvene mreze: </p>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
        
      </div>
    </footer>
  );
};
export default Footer;