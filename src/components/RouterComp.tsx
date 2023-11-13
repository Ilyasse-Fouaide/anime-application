import React from 'react'
import NavBar from './pages/NavBar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    children: [
      {
        index: true,
        element: <Home />
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