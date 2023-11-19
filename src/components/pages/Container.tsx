import React from 'react';
import Hero from './Hero';
import Slide from './newAnimeSlide/Slide';
import Genres from '../Genres';

function Container() {
  const [showSlide, setShowSlide] = React.useState(false);
  const [genres, setGenres] = React.useState(false);

  React.useEffect(() => {
    const second = setTimeout(() => {
      setShowSlide(true);
    }, 1000);
    const threeSecond = setTimeout(() => {
      setGenres(true);
    }, 3000);
    return () => {
      clearTimeout(second);
      clearTimeout(threeSecond);
    }
  }, []);

  return (
    <>
      <Hero />
      {showSlide && <Slide />}
      {genres && <Genres />}
    </>
  );
}

export default Container;
