// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/footer/Footer';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Pocetna from './components/pocetna/Pocetna';
import Cars from './components/cars/Cars';
import CarDetails from './components/cars/CarDetails';
import About from './components/about/About';
import Autentifikacija from './components/autentifikacija/Autentifikacija';
import Rezervacije from './components/rezervacije/Rezervacije';
import AdministratorDashboard from './components/administrator-dashboard/AdministratorDashboard';
import AdministratorKorisnici from './components/administrator-korisnici/AdministratorKorisnici';
import AdministratorAutomobili from './components/administrator-automobili/AdministratorAutomobili';

function App() {
  const [isAuth, setIsAuth] = useState(
    !!sessionStorage.getItem('auth_token')
  );

  // Svakih 500ms proverava da li je token i ažurira isAuth
  useEffect(() => {
    const id = setInterval(() => {
      setIsAuth(!!sessionStorage.getItem('auth_token'));
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {isAuth && <Navbar />}

        <Routes>
          {/* Korak 1: Korisnik ide na korenski URL */}
          <Route
            path="/"
            element={
              isAuth ? <Navigate to="/pocetna" replace /> : <Autentifikacija />
            }
          />

          {/* Zaštićene rute */}
          <Route
            path="/pocetna"
            element={isAuth ? <Pocetna /> : <Navigate to="/" replace />}
          />
          <Route
            path="/cars"
            element={isAuth ? <Cars /> : <Navigate to="/" replace />}
          />
          <Route
            path="/cars/:id"
            element={isAuth ? <CarDetails /> : <Navigate to="/" replace />}
          />
          <Route
            path="/about"
            element={isAuth ? <About /> : <Navigate to="/" replace />}
          />

          <Route
            path="/rezervacije"
            element={isAuth ? <Rezervacije /> : <Navigate to="/" replace />}
          />

          <Route
            path="/administrator-dashboard"
            element={isAuth ? <AdministratorDashboard /> : <Navigate to="/" replace />}
          />

          <Route
            path="/users"
            element={isAuth ? <AdministratorKorisnici /> : <Navigate to="/" replace />}
          />

          <Route
            path="/cars-admin"
            element={isAuth ? <AdministratorAutomobili /> : <Navigate to="/" replace />}
          />


          {/* Svi ostali URL-ovi */}
          <Route
            path="*"
            element={<Navigate to={isAuth ? '/pocetna' : '/'} replace />}
          />
        </Routes>

        {isAuth && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
