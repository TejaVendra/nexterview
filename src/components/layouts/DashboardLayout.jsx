import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sections/Sidebar";

function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <main className="min-h-screen lg:ml-[340px]">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout; 