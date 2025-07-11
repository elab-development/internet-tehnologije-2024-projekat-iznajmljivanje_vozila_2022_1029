import React from 'react';
import Carousel from '../carousel/Carousel';
import Button from '../button/Button';
import auto1 from '../images/auto1.jpg';
import auto2 from '../images/auto2.jpg';
import auto3 from '../images/auto3.webp';
import auto4 from '../images/auto4.jpg';
import './Pocetna.css';
import Mapa from '../mapa/Mapa'; 

const Pocetna = () => {
  const images = [auto1, auto2, auto3, auto4];

  return (
    <div className="pocetna-container">
      <header className="pocetna-header">
        <h1>Dobrodošli na naš Rent-a-Car sajt!</h1>
        <p>Najbolji izbor vozila za vaše potrebe, po najpovoljnijim cenama.</p>
      </header>

      <div className="carousel-wrapper">
        <Carousel images={images} />
      </div>

      <section className="pocetna-content">
        <h2>O našim vozilima</h2>
        <p>
          Na našem sajtu možete pronaći širok izbor automobila, od luksuznih
          limuzina do praktičnih porodičnih vozila i SUV-ova. Naša misija je da
          vam omogućimo udobnu i sigurnu vožnju po pristupačnim cenama. 
        </p>
        <Button onClick={() => window.location.href = '/cars'}>
          Rezervisite sada
        </Button>
        <Button onClick={() => window.location.href = '/about'}>
          Procitajte vise
        </Button>
      </section>

      <section className="pocetna-mapa">
        <h2>Naše lokacije</h2>
        <Mapa />
      </section>
    </div>
  );
};

export default Pocetna;