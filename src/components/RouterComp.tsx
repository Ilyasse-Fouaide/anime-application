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
    ]
  }
])

function RouterComp() {
  return (
    <RouterProvider router={router} />
  )
}

export default RouterComp