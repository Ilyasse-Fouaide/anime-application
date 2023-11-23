import _React from 'react'
import NavBar from './pages/NavBar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Container from './pages/Container';
import Search from './pages/Search/Search';
import AnimeList from './pages/AnimeList';

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
        path: "popular",
        element: <AnimeList />
      },
      {
        path: "airing",
        element: <AnimeList />
      },
      {
        path: "upcoming",
        element: <AnimeList />
      },
      {
        path: "favorite",
        element: <AnimeList />
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