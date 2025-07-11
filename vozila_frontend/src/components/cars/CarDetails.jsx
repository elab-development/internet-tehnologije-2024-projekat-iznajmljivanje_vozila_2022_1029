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
        const apiKey = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;
        const response = await axios.get('http://api.currencylayer.com/live', {
          params: {
            access_key: apiKey,
            source: 'EUR',                // želite cene za EUR →
            currencies: 'USD,CAD,RSD'     // filtriramo samo ove valute
          }
        });
        // response.data.quotes ima ključeve kao EURUSD, EURCAD, EURRSD...
        const { quotes } = response.data;
        setConversionRates({
          USD: quotes.EURUSD,
          CAD: quotes.EURCAD,
          RSD: quotes.EURRSD,
          EUR: 1
        });
        setShowTable(true);
      } catch (err) {
        console.error('Error fetching conversion rates:', err);
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
                      {['USD', 'CAD', 'RSD', 'EUR'].map(cur => {
                        const rate = conversionRates[cur];
                        return (
                          <tr key={cur}>
                            <td>{cur}</td>
                            <td>{rate.toFixed(2)}</td>
                            <td>
                              {(Number(auto.price_per_day) * rate).toFixed(2)} {cur}
                            </td>
                          </tr>
                        );
                      })}
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
