import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useAuto from '../hooks/useAuto';
import axios from 'axios';
import './Cars.css';
import Button from '../button/Button';

const CarDetails = () => {
  const { id } = useParams(); //id auta koji je prosledjen u urlu
  const { auto, loading, error } = useAuto(id); //koriscenje custom kuke

  const [conversionRates, setConversionRates] = useState(null); //valute
  const [showTable, setShowTable] = useState(false); //da li da se vidi tabela ili ne

  const handleConvert = async () => {
    if (!showTable) {
      try {
        //ucitavanje kljuca iz lokalnog enva
        const apiKey = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;
        const response = await axios.get(
          `https://api.exchangerate.host/latest?access_key=${apiKey}&base=EUR`
        );
        setConversionRates(response.data.rates);
        setShowTable(true);
      } catch (error) {
        console.error('Error fetching conversion rates:', error);
      }
    } else {
      setShowTable(false); 
    }
  };

  return (
    <div className='car-details-page'>
        <nav className="breadcrumbs">
            <Link to="/">Početna</Link> / <Link to="/cars">Naša Vozila</Link> / <span>Detalji</span>
        </nav>
    
        <div className="car-details-container">

        {loading && <p>Učitavanje podataka...</p>}
        {error && <p>{error}</p>}
        {auto && (
            <>
            <h1 className="car-title">{auto.name}</h1>
            <div className="car-info">
                <div className="car-details">
                <p>Kategorija: <span>{auto.kategorija}</span></p>
                <p>Opis: <span>{auto.description}</span></p>
                <p>Cena po danu: <span>{Number(auto.price_per_day).toFixed(2)} EUR</span></p>
                </div>
                <div className="conversion-section">
                <Button onClick={handleConvert}>
                    {showTable ? 'Sakrij konverziju' : 'Prikaži konverziju'}
                </Button>
                {showTable && conversionRates && (
                    <table className="conversion-table">
                    <thead>
                        <tr>
                        <th>Valuta</th>
                        <th>Kurs</th>
                        <th>Konvertovana cena</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>USD</td>
                        <td>{conversionRates.USD.toFixed(2)}</td>
                        <td>{(Number(auto.price_per_day) * conversionRates.USD).toFixed(2)} USD</td>
                        </tr>
                        <tr>
                        <td>CAD</td>
                        <td>{conversionRates.CAD.toFixed(2)}</td>
                        <td>{(Number(auto.price_per_day) * conversionRates.CAD).toFixed(2)} CAD</td>
                        </tr>
                        <tr>
                        <td>RSD</td>
                        <td>{conversionRates.RSD.toFixed(2)}</td>
                        <td>{(Number(auto.price_per_day) * conversionRates.RSD).toFixed(2)} RSD</td>
                        </tr>
                        <tr>
                        <td>EUR</td>
                        <td>1.00</td>
                        <td>{Number(auto.price_per_day).toFixed(2)} EUR</td>
                        </tr>
                    </tbody>
                    </table>
                )}
                </div>
            </div>
            </>
        )}
        </div>
    </div>
  );
};

export default CarDetails;
