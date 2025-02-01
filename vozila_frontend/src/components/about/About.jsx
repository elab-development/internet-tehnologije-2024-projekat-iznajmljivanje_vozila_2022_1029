import React from 'react';
import './About.css';
import logo1 from '../images/logo1.png';
import logo2 from '../images/logo2.png';
import logo3 from '../images/logo3.png';
import { Link } from 'react-router-dom';

const About = () => {

    const recenzije = [
            { id: 1, ime: 'Marko Petrović', ocena: 5, komentar: 'Odlična usluga, brzo i jednostavno rezervisanje vozila!' },
            { id: 2, ime: 'Jelena Jovanović', ocena: 4, komentar: 'Veliki izbor vozila, vrlo profesionalno osoblje.' },
            { id: 3, ime: 'Nikola Nikolić', ocena: 3, komentar: 'Dobra aplikacija, ali bi moglo biti više opcija za filtriranje vozila.' },
            { id: 4, ime: 'Ana Savić', ocena: 5, komentar: 'Najbolje iskustvo sa iznajmljivanjem vozila do sada!' },
        ];
      
    const renderStars = (ocena) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} style={{ color: index < ocena ? '#E6B31E' : '#CACACA' }}>★</span>
            ));
        };

  return (
    <div className="about-container">
      <nav className="breadcrumbs">
        <Link to="/">Početna</Link> / <span>O nama</span>
      </nav>

      <div className='about-first-text'>
        <h1>O nama</h1>
        <p>
        Naša aplikacija omogućava jednostavan i brz pregled širokog izbora vozila prilagođenih različitim potrebama i preferencijama korisnika. 
        Korisnici mogu lako da se registruju, pretražuju dostupna vozila, pregledaju detaljne informacije o svakom automobilu, 
        i obave rezervaciju u samo nekoliko klikova. 
        Takođe, aplikacija pruža mogućnost upravljanja svim vašim rezervacijama na jednom mestu, uz uvid u detalje i istoriju iznajmljivanja. 
        Naša misija je da omogućimo korisnički prijatno iskustvo, uz modernu i intuitivnu platformu koja štedi vaše vreme i olakšava ceo proces iznajmljivanja. 
        Bez obzira da li vam je potrebno vozilo za poslovni put, odmor ili svakodnevne potrebe, naša aplikacija je tu da vam obezbedi najbolje rešenje.
        </p>
      </div>

      <div className="logos-section">
        <img src={logo2} alt="Logo 2" className="logo-image" />
        <img src={logo1} alt="Logo 1" className="logo-image" />
        <img src={logo3} alt="Logo 3" className="logo-image" />
      </div>

      <section className="recenzije">
        <h2>Šta naši korisnici kažu:</h2>
        <div className="recenzije-list">
          {recenzije.map((recenzija) => (
            <div key={recenzija.id} className="recenzija-card">
              <h3>{recenzija.ime}</h3>
              <p>Ocena: {renderStars(recenzija.ocena)}</p>
              <p>Komentar: "{recenzija.komentar}"</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default About;
