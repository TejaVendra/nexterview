import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sections/Sidebar";
import BottomBar from "../ui/BottomBar";
import { useSelector } from "react-redux";

function DashboardLayout() {
  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen);
  return (
    <div className="min-h-screen">
      <Sidebar />
      <BottomBar/>
  
      <main
        className={`
          min-h-screen
          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isSidebarOpen ? "lg:ml-[340px]" : "lg:ml-0"}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout; 