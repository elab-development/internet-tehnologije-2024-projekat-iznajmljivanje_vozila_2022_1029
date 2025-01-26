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
    <div className="carousel-wrapper">
      <img
        src={images[(currentIndex - 1 + images.length) % images.length]}
        alt="Previous Slide"
        className="carousel-side-image left"
      />
      <img
        src={images[currentIndex]}
        alt="Current Slide"
        className="carousel-image"
      />
      <img
        src={images[(currentIndex + 1) % images.length]}
        alt="Next Slide"
        className="carousel-side-image right"
      />
      <Button className="carousel-button left" onClick={goToPrevious}>
        &#8249;
      </Button>
      <Button className="carousel-button right" onClick={goToNext}>
        &#8250;
      </Button>
    </div>
  );
};

export default Carousel;
