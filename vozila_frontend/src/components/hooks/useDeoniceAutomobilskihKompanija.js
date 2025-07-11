import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useDeoniceAutomobilskihKompanija() {
  const [stocks, setStocks]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    // Tickere и имена компанија
    const companies = [
      { symbol: 'TSLA',  name: 'Tesla, Inc.' },
      { symbol: 'BMWYY', name: 'BMW AG' },
      { symbol: 'MBGAF', name: 'Mercedes-Benz Group' },
      { symbol: 'VLKAF', name: 'Volkswagen AG' },
      { symbol: 'TM',    name: 'Toyota Motor Corp.' }
    ];
    const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_KEY;
    if (!apiKey) {
      setError('Alpha Vantage API ključ nije podešen.');
      setLoading(false);
      return;
    }

    Promise.all(
      companies.map(c =>
        axios.get('https://www.alphavantage.co/query', {
          params: {
            function: 'GLOBAL_QUOTE',
            symbol: c.symbol,
            apikey: apiKey
          }
        })
        .then(res => {
          const q = res.data['Global Quote'] || {};
          return {
            symbol: c.symbol,
            name:   c.name,
            price:  parseFloat(q['05. price']) || 0
          };
        })
      )
    )
    .then(data => setStocks(data))
    .catch(err => {
      console.error(err);
      setError('Neuspešno učitavanje cena deonica.');
    })
    .finally(() => setLoading(false));
  }, []);

  return { stocks, loading, error };
}
