import React from 'react'
import NavBar from './pages/NavBar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />
  }
])

function RouterComp() {
  return (
    <RouterProvider router={router} />
  )
}

export default RouterComp