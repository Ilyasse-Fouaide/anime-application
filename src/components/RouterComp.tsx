import _React from 'react'
import NavBar from './pages/NavBar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Container from './pages/Container';
import Search from './pages/Search/Search';
import Popular from './pages/Popular';

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
        element: <Popular />
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