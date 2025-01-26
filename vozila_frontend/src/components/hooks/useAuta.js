import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuta = (url) => {
  const [auta, setAuta] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setAuta(response.data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [url]);

  return [auta, setAuta];

};

export default useAuta;