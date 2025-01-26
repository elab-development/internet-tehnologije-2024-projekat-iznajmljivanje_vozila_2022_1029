import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuta from '../hooks/useAuta';
import './Cars.css';
import Button from '../button/Button';

const Cars = () => {
  const [auta] = useAuta('http://127.0.0.1:8000/api/auta');
  const navigate = useNavigate(); 

  const handleMoreInfo = (id) => {
    navigate(`/cars/${id}`); 
  };

  return (
    <div className="cars-container">
      <nav className="breadcrumbs">
        <Link to="/">Početna</Link> / <span>Naša vozila</span>
      </nav>

      <h1 className="cars-title">Naša ponuda vozila koja se mogu rezervisati</h1>
      <div className="cars-list">
        {auta.map((auto) => (
          <div key={auto.id} className="car-card">
            <h2 className="car-name">{auto.name}</h2>
            <p className="car-price">Cena po danu: {auto.price_per_day} EUR</p>

            <Button className="car-button" onClick={() => handleMoreInfo(auto.id)}>
              Više informacija
            </Button>
            <Button className="car-button">Rezerviši</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
