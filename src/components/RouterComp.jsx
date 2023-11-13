import React from 'react'
import NavBar from './pages/NavBar'
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />
  }
])

function RouterComp() {
  return (
    <div>RouterComp</div>
  )
}

export default RouterComp