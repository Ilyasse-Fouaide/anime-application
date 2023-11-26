import _React from 'react';
import Hero from './Hero';
import Slide from './newAnimeSlide/Slide';
import Genres from '../Genres';
import LazyLoadComponent from '../LazyLoadComp/LazyLoadComponent';

function Container() {

  return (
    <>
      <Hero />
      <Slide />
      <LazyLoadComponent>
        <Genres />
      </LazyLoadComponent>
    </>
  );
}

export default Container;
