import React from 'react';
import Hero from './Hero';
import Slide from './newAnimeSlide/Slide';

function Container() {
  const [showSlide, setShowSlide] = React.useState(false);
  const [viewAll, setViewAll] = React.useState(false);

  React.useEffect(() => {
    const second = setTimeout(() => {
      setShowSlide(true);
    }, 1000);
    const threeSecond = setTimeout(() => {
      setViewAll(true);
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
      {viewAll &&
        <div className='bg-red-500 h-5'>
          <div className='w-full flex justify-center'>
            <div className='font-medium'>Still looking for Anime to watch?</div>
          </div>
        </div>
      }
    </>
  );
}

export default Container;
