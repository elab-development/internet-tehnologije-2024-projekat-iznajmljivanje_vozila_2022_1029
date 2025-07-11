import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Autentifikacija.css';
import Logo from '../images/logo2.png';

const Autentifikacija = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const url = `http://127.0.0.1:8000/api/${isRegister ? 'register' : 'login'}`;
    const payload = isRegister
      ? { name, email, password, password_confirmation: password }
      : { email, password };

    try {
      const res = await axios.post(url, payload, { withCredentials: true });
      
      // Pročitaj poruku iz odgovora (u tvojem API: "Poruka")
      const successMsg = res.data.Poruka || 'Uspešno!';
      
      if (isRegister) {
        toast.success(successMsg);
        // pređi na login formu nakon registracije
        setIsRegister(false);
        setName('');
        setPassword('');
      } else {
        // za login gledamo access_token
        const token = res.data.access_token;
        const username = res.data.username;
        const isAdmin = res.data.isAdmin;
        // pohranite token i username u sessionStorage
        if (token) {
          sessionStorage.setItem('auth_token', token);
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('isAdmin', isAdmin);
          toast.success(successMsg);
          // nakon kratke pauze, idi na /pocetna
          if(isAdmin !== 1){
            setTimeout(() => navigate('/pocetna'), 2000);
          }else{
            setTimeout(() => navigate('/administrator-dashboard'), 2000);
          }
        } else {
          toast.error('Nešto nije u redu: nema tokena u odgovoru.');
        }
      }
    } catch (err) {
      // Ako dobijemo grešku sa Poruka, iskoristimo je, inače generička
      const errMsg =
        err.response?.data?.Poruka ||
        err.response?.data?.message ||
        'Došlo je do greške. Pokušajte ponovo.';
      toast.error(errMsg);
    }
  };

  const toggleMode = e => {
    e.preventDefault();
    setIsRegister(!isRegister);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="autent-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="auth-card">
        {/* LEVI PANEL */}
        <div className="auth-form-panel">
          <img src={Logo} alt="Logo" className="auth-logo" />
          <h2>{isRegister ? 'Kreirajte nalog' : 'Prijavite se'}</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            {isRegister && (
              <div className="input-group">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Korisničko ime</label>
              </div>
            )}
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder=" "
              />
              <label>Email</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder=" "
              />
              <label>Lozinka</label>
            </div>

            <button type="submit" className="btn-gradient">
              {isRegister ? 'Kreirajte nalog' : 'Prijavite se'}
            </button>
          </form>

          <p className="toggle-text">
            {isRegister ? 'Već imate nalog?' : 'Nemate nalog?'}{' '}
            <a href="#" className="auth-toggle" onClick={toggleMode}>
              {isRegister ? 'Prijavite se' : 'Registrujte se'}
            </a>
          </p>
        </div>

        {/* DESNI PANEL */}
        <div className="auth-side-panel">
          <div className="side-content">
            <h3>{isRegister ? 'Dobrodošli!' : 'Dobrodošli nazad!'}</h3>
            <p>
              {isRegister
                ? 'Pridružite se našoj Rent-a-Car zajednici i uživajte u najboljem iskustvu vožnje.'
                : 'Ulogujte se i nastavite da istražujete naš širok asortiman automobila.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autentifikacija;
