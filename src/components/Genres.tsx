import React from 'react'
import { getRequest } from '../axios/axiosClient';
import { GenresType } from './Types/types';
import { motion } from "framer-motion";

import gintama from "../assets/images/gintama.jpg"
import boku_no_hero from "../assets/images/boku_no_hero.jpg"
import kimetsu_no_yaiba from "../assets/images/kimetsu_no_yaiba.jpg"
import jujutsu from "../assets/images/jujutsu.jpg"
import one_piece from "../assets/images/one_piece.jpg"
import Your_Lie_in_April from "../assets/images/Your_Lie_in_April.jpg"
import Neon_Genesis_Evangelion from "../assets/images/Neon_Genesis_Evangelion.jpg"
import Grave_of_the_Fireflies from "../assets/images/Grave_of_the_Fireflies.jpg"
import Love_Is_War from "../assets/images/Love_Is_War.jpg"
import Classroom_of_the_elit from "../assets/images/Classroom_of_the_elit.jpg"
import Naruto from "../assets/images/Naruto.jpg"
import Violet_evergarden from "../assets/images/Violet_evergarden.jpg"
import Vinland_Saga from "../assets/images/Vinland_Saga.jpg"
import Attack_on_Titan from "../assets/images/Attack_on_Titan.jpg"
import Code_Geass from "../assets/images/Code_Geass.jpg"
import Monster from "../assets/images/Monster.jpg"
import Doraemon from "../assets/images/Doraemon.jpg"
import SkeletonGenre from './Skeleton/SkeletonGenre';
import { Link } from 'react-router-dom';
import { slug } from './functions/slug';

const genreRelated: { id: number, image: any, color: string }[] = [
  { id: 4, image: gintama, color: "#BA00D2" },
  { id: 15, image: boku_no_hero, color: "#F00003" },
  { id: 10, image: kimetsu_no_yaiba, color: "#F00093" },
  { id: 1, image: jujutsu, color: "#A13EF0" },
  { id: 2, image: one_piece, color: "#F02900" },
  { id: 19, image: Your_Lie_in_April, color: "#F01600" },
  { id: 24, image: Neon_Genesis_Evangelion, color: "#F06A00" },
  { id: 8, image: Grave_of_the_Fireflies, color: "#F00044" },
  { id: 22, image: Love_Is_War, color: "#F09305" },
  { id: 23, image: Classroom_of_the_elit, color: "#0E31F0" },
  { id: 27, image: Naruto, color: "#7E0EF0" },
  { id: 36, image: Violet_evergarden, color: "#100480" },
  { id: 13, image: Vinland_Saga, color: "#1984E0" },
  { id: 37, image: Attack_on_Titan, color: "#0E78F0" },
  { id: 18, image: Code_Geass, color: "#5B51E0" },
  { id: 42, image: Monster, color: "#F0620C" },
  { id: 51, image: Doraemon, color: "#DB7E0B" },
];

const GenreCard = ({ name, count, mal_id }: GenresType) => {

  return (
    <Link to={`/genre/${mal_id}/${slug(name)}`}>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: .8 }} className='relative w-full aspect-[3/2] rounded-lg overflow-hidden cursor-pointer' style={{ backgroundColor: `${genreRelated.find((el) => el.id === mal_id)?.color}` }}>

        <p className='relative p-4 uppercase font-bold text-xl text-zinc-50 rounded-lg break-words w-fit' style={{ backgroundColor: `${genreRelated.find((el) => el.id === mal_id)?.color}` }}>
          {name.length >= 12 ?
            <>
              {name.split("").splice(0, 12).join("")}...
            </>
            :
            name
          }
          {" "}
          <span className='text-base'>{`(${count})`}</span>
        </p>
        <div className='z-10 min-[280px]:w-[100px] min-[320px]:w-[150px] min-[425px]:w-[190px] lg:w-[150px] aspect-square rounded-md overflow-hidden absolute -bottom-7 -right-7 rotate-[30deg] shadow-md shadow-zinc-950/60'>
          <div className='w-full h-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url('${genreRelated.find((el) => el.id === mal_id)?.image}')` }}></div>
        </div>

      </motion.div>
    </Link>
  )
}

function Genres() {
  const [genres, setGenres] = React.useState<GenresType[]>([]);
  const [loading, setLoadding] = React.useState(true);
  const sfw = [{ name: "Boys Love" }, { name: "Girls Love" }, { name: "Ecchi" }, { name: "Hentai" }];

  const filterArray: GenresType[] = genres.filter((genre) => {
    if (genre.count) {
      return genre.count >= 900 && sfw.filter((sfws) => {
        return genre.name === sfws.name
      }).length == 0
    }
  });

  React.useEffect(() => {
    const fetchAnimeGenres = () => {
      getRequest('genres/anime')
        .then(({ data }) => {
          setGenres(data.data)
          setLoadding(false)
        })
    }
    fetchAnimeGenres();
  }, []);

  if (loading) {
    return <SkeletonGenre />
  }

  return (
    <div className='mt-20 mb-0 lg:mt-0 lg:mb-20'>
      <div className='px-[20px] lg:px-[65px] mb-[16px]'>
        <h2 className='text-[20px] md:text-[25px] text-white font-bold'>Top Genres</h2>
        <p className='text-sm md:text-base text-zinc-400 mt-[8px]'>Explore Top Genre Picks for Your Watching Pleasure!</p>
      </div>
      <div className='px-[20px] lg:px-[65px] mb-[16px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
        {filterArray && filterArray.sort((a, b) => b.count - a.count).map(({ name, count, mal_id }, key) =>
          <GenreCard name={name} count={count} mal_id={mal_id} key={key} />
        )}
      </div>
    </div>
  )
}

export default Genres