import React from 'react'
import Sidebar from '../sections/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
import BottomBar from '../ui/BottomBar.jsx'

function MockInterviewLayout() {
  return (
     <div className="min-h-screen">
      <main className="min-h-screen ">
        <Outlet />
      </main>
    </div>
  )
}

export default MockInterviewLayout
