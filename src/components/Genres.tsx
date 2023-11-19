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

const genreRelated: { id: number, image: any }[] = [
  { id: 4, image: gintama },
  { id: 15, image: boku_no_hero },
  { id: 10, image: kimetsu_no_yaiba },
  { id: 1, image: jujutsu },
  { id: 2, image: one_piece },
  { id: 19, image: Your_Lie_in_April },
  { id: 24, image: Neon_Genesis_Evangelion },
  { id: 8, image: Grave_of_the_Fireflies },
  { id: 22, image: Love_Is_War },
  { id: 23, image: Classroom_of_the_elit },
  { id: 27, image: Naruto },
  { id: 36, image: Violet_evergarden },
  { id: 13, image: Vinland_Saga },
  { id: 37, image: Attack_on_Titan },
  { id: 18, image: Code_Geass },
  { id: 42, image: Monster },
  { id: 51, image: Doraemon },
];

const GenreCard = ({ name, count, mal_id }: GenresType) => {

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: .8 }} className='bg-[var(--red)] relative w-full aspect-[3/2] rounded-lg overflow-hidden'>
      <p className='relative bg-[var(--red)] p-4 uppercase font-bold text-xl text-zinc-50 rounded-lg break-words w-fit'>
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
      <div className='z-10 min-[280px]:w-[100px] min-[320px]:w-[150px] min-[425px]:w-[190px] lg:w-[150px] aspect-square rounded-md overflow-hidden absolute -bottom-7 -right-7 rotate-[30deg] shadow-2xl shadow-zinc-950/60'>
        <div className='w-full h-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url('${genreRelated.find((el) => el.id === mal_id)?.image}')` }}></div>
      </div>
    </motion.div>
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
    return "Loading ..."
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