import React from 'react'
import Sidebar from '../sections/Sidebar.jsx'
import { Outlet } from 'react-router-dom'
function MockInterviewLayout() {
  return (
     <div className="min-h-screen">
      <Sidebar />

      <main className="min-h-screen lg:ml-[340px]">
        <Outlet />
      </main>
    </div>
  )
}

export default MockInterviewLayout
