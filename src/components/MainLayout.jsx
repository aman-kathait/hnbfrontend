import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'
import Navbar from './Navbar'
import Footer from './Footer'
const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <LeftSidebar/>
      <Footer/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout