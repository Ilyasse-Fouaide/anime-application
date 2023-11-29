import _React from 'react'
import NavBar from './pages/NavBar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Container from './pages/Container';
import Search from './pages/Search/Search';
import AnimeList from './pages/List-Anime/AnimeList';
import Popular from './pages/List-Anime/Popular';
import Airing from './pages/List-Anime/Airing';
import Upcoming from './pages/List-Anime/Upcoming';
import Favorite from './pages/List-Anime/Favorite';
import AnimeDetail from './pages/Anime-details/AnimeDetail';
import GenresAnime from './pages/Genres/GenresAnime';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    children: [
      {
        index: true,
        element: <Container />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "videos",
        element: <AnimeList />,
        children: [
          {
            path: "popular",
            element: <Popular />
          },
          {
            path: "airing",
            element: <Airing />
          },
          {
            path: "upcoming",
            element: <Upcoming />
          },
          {
            path: "favorite",
            element: <Favorite />
          },
        ]
      },
      {
        path: "series/:id/:title",
        element: <AnimeDetail />
      },
      {
        path: "genre/:id/:name",
        element: <GenresAnime />
      },
      {
        path: "/error",
        element: <div className='h-[calc(100vh-486px-60px)] flex items-center justify-center'>
          <div>
            <h1 className='text-center text-6xl font-semibold text-[var(--red)]'>Ooops...</h1>
            <div className='max-w-lg text-center font-medium mt-4 text-white'>Network Error: Unable to connect. Please check your internet connection and try again.</div>
          </div>
        </div>
      },
    ]
  }
])

function RouterComp() {
  return (
    <RouterProvider router={router} />
  )
}

export default RouterComp