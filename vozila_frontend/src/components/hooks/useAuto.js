import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuto = (carId) => {
  const [auto, setAuto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!carId) {
      setAuto(null); // Resetuje stanje ako nema ID-a
      return;
    }

    const fetchAuto = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/auta/${carId}`);
        setAuto(response.data.data);
      } catch (err) {
        setError('Greška prilikom preuzimanja podataka.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuto();
  }, [carId]);

  return { auto, loading, error };
};

export default useAuto;
