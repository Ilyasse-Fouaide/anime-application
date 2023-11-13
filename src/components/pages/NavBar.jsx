import React from 'react'
import { Outlet } from 'react-router-dom'

function NavBar() {
  return (
    <div>
      <div>Navbar</div>
      <Outlet />
    </div>
  )
}

export default NavBar