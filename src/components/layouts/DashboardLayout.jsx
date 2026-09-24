import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../sections/Sidebar";
import BottomBar from "../ui/BottomBar";
import { useSelector } from "react-redux";

function DashboardLayout() {

    const isSidebarOpen = useSelector(
        (state) => state.sidebar.isSidebarOpen
    );

    const location = useLocation();


    // Hide sidebar on interview preparation/check page
    const isInterviewCheckPage =
        location.pathname.startsWith(
            "/mock-interview/prepare/"
        );

       const isInterviewPage = location.pathname.startsWith("/interview/")

        const hideSidebar =  isInterviewCheckPage || isInterviewPage;

    return (
        <div className="min-h-screen">

           {!hideSidebar && <Sidebar />}

            <BottomBar />


            <main
                className={`
                    min-h-screen
                    transition-all
                    duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${
                        isSidebarOpen && !isInterviewCheckPage && !isInterviewPage
                            ? "lg:ml-[340px]"
                            : "lg:ml-0"
                    }
                `}
            >
                <Outlet />
            </main>

        </div>
    );
}

export default DashboardLayout;