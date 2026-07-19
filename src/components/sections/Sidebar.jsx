import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { useSelector } from "react-redux";
import { setSidebarOpen } from "../../redux/slices/sideBar";
import { useDispatch } from "react-redux";

function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();

  const isSidebarOpen = useSelector((state) => state.sidebar.isSidebarOpen)

  const [hoveredIndex, setHoveredIndex] = useState(null);
  

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Mock Interview",
      path: "/mock-interview",
    },
    {
      name: "Resume Analysis",
      path: "/resume-analysis",
    },
    {
      name: "Resume Maker",
      path: "/resume-maker",
    },
    {
      name: "Portfolio Analysis",
      path: "/portfolio",
    },
    {
      name: "Resume Matches",
      path: "/resume-matches",
    },
  ];

  const activeIndex = links.findIndex(
    (link) => location.pathname === link.path
  );

  const indicatorIndex =
    hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <>
      {/* ================= SHOW SIDEBAR BUTTON ================= */}

      <button
        type="button"
        onClick={() => dispatch(setSidebarOpen())}
        aria-label="Show sidebar"
        className={`
          fixed
          left-10
          top-30
          z-50
          hidden
          h-14
          w-14
          cursor-pointer
          items-center
          justify-center
          rounded-2xl
          border
          border-white/70
          bg-white/50
          text-gray-600
          shadow-lg
          shadow-black/5
          backdrop-blur-xl
          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          lg:flex

          ${
            isSidebarOpen
              ? "pointer-events-none scale-[0.2] opacity-0 blur-md"
              : "pointer-events-auto scale-100 opacity-100 blur-0"
          }
        `}
      >
        <PanelLeftOpen
          size={24}
          strokeWidth={1.8}
          className="
            transition-transform
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            hover:scale-110
          "
        />
      </button>

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed
          bottom-20
          left-10
          top-30
          z-50
          hidden
          w-70
          origin-top-left
          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          lg:block

          ${
            isSidebarOpen
              ? `
                  pointer-events-auto
                  translate-x-0
                  translate-y-0
                  scale-100
                  opacity-100
                  blur-0
                `
              : `
                  pointer-events-none
                  -translate-x-1
                  -translate-y-1
                  scale-[0.2]
                  opacity-0
                  blur-md
                `
          }
        `}
      >
        {/* ================= MAIN SIDEBAR ================= */}

        <div
          className="
            flex
            h-[80%]
            flex-col
            items-center
            justify-center
            rounded-t-[60px]
            bg-white/50
            backdrop-blur-xl
            [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,20px_100%,0_calc(100%-20px))]
          "
        >
          <nav
            className="
              relative
              -translate-y-8
              flex
              w-full
              flex-col
              gap-2
              px-5
              py-8
            "
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* ================= HIDE SIDEBAR BUTTON ================= */}

            <button
              type="button"
              onClick={() => dispatch( setSidebarOpen())}
              aria-label="Hide sidebar"
              className="
                group
                absolute
                -top-10
                right-5
                z-20
                flex
                h-10
                w-10
                cursor-pointer
                items-center
                justify-center
                rounded-xl
                text-gray-500
                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:scale-110
                hover:bg-white/60
                hover:text-black
                hover:shadow-lg
                hover:shadow-black/5
              "
            >
              <PanelLeftClose
                size={21}
                strokeWidth={1.8}
                className="
                  transition-transform
                  duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:-translate-x-0.5
                "
              />
            </button>

            {/* ================= SLIDING GLASS INDICATOR ================= */}

            {indicatorIndex !== -1 && (
              <div
                className="
                  pointer-events-none
                  absolute
                  left-5
                  right-5
                  top-8
                  h-12
                  rounded-2xl
                  border
                  border-white/70
                  bg-white/15
                  shadow-lg
                  shadow-black/5
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                "
                style={{
                  transform: `
                    translateY(${indicatorIndex * 56}px)
                    scale(1.03)
                  `,
                }}
              />
            )}

            {/* ================= NAVIGATION LINKS ================= */}

            {links.map((link, index) => {
              const isHighlighted =
                hoveredIndex === index ||
                (hoveredIndex === null &&
                  activeIndex === index);

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`
                    relative
                    z-10
                    flex
                    h-12
                    items-center
                    px-5
                    text-sm
                    font-medium
                    transition-all
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    ${
                      isHighlighted
                        ? "scale-[1.03] text-black"
                        : "scale-100 text-gray-600"
                    }
                  `}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* ================= GAP ================= */}

        <div className="h-2" />

        {/* ================= LOGOUT SECTION ================= */}

        <div
          className="
            flex
            h-[20%]
            flex-col
            items-center
            justify-center
            rounded-b-[60px]
            bg-white/50
            backdrop-blur-xl
            [clip-path:polygon(20px_0,calc(100%-20px)_0,100%_20px,100%_100%,0_100%,0_20px)]
          "
        >
          <button
            type="button"
            className="
              group
              flex
              cursor-pointer
              items-center
              gap-3
              rounded-2xl
              border
              border-transparent
              px-5
              py-3
              text-gray-600
              transition-all
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              hover:scale-105
              hover:border-white/40
              hover:bg-white
              hover:text-black
              hover:shadow-lg
              hover:shadow-black/5
            "
          >
            <LogOut
              size={18}
              strokeWidth={1.8}
              className="
                transition-transform
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:-translate-x-1
              "
            />

            <span className="text-sm font-medium">
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;