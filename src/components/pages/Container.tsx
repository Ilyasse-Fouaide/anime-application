import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import Slide from './newAnimeSlide/Slide';

function Container() {
  const [showSlide, setShowSlide] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSlide(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Hero />
      {showSlide && <Slide />}
    </>
  );
}

export default Container;
