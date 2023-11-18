import React from 'react';
import Hero from './Hero';
import Slide from './newAnimeSlide/Slide';

function Container() {
  const [showSlide, setShowSlide] = React.useState(false);

  React.useEffect(() => {
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
