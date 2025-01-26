import React, { useState } from 'react';
import './Carousel.css';
import Button from '../button/Button';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel-container">
      <Button className="carousel-button left" onClick={goToPrevious}>
        &#8249;
      </Button>
      <div className="carousel-image-wrapper">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="carousel-image" />
      </div>
      <Button className="carousel-button right" onClick={goToNext}>
        &#8250;
      </Button>
    </div>
  );
};

export default Carousel;
