import _React from 'react'
import NavBar from './pages/NavBar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Container from './pages/Container';
import Search from './pages/Search';

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
    ]
  }
])

function RouterComp() {
  return (
    <RouterProvider router={router} />
  )
}

export default RouterComp