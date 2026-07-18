import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutGrid,
  Mic,
  FileText,
  User,
  Briefcase,
  FilePlus2,
} from "lucide-react";

const links = [
  {
    name: "Home",
    path: "/dashboard",
    icon: LayoutGrid,
  },
  {
    name: "Interview",
    path: "/mock-interview",
    icon: Mic,
  },
  {
    name: "Resume",
    path: "/resume-analysis",
    icon: FileText,
  },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: User,
  },
  {
    name: "JD",
    path: "/resume-matches",
    icon: Briefcase,
  },
  {
    name: "Builder",
    path: "/resume-maker",
    icon: FilePlus2,
  },
];

export default function BottomBar() {
  const [hovered, setHovered] = useState(null);

  return (
    <nav className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 md:hidden">
      <div
        className="
          flex items-center gap-2
          rounded-full
          border border-white/30
          bg-white/20
          backdrop-blur-3xl
          shadow-[0_10px_35px_rgba(0,0,0,0.12)]
          px-3 py-2
        "
      >
        {links.map((link, index) => {
          const Icon = link.icon;

          const distance =
            hovered === null
              ? 10
              : Math.abs(index - hovered);

          const scale =
            distance === 0
              ? 1.28
              : distance === 1
              ? 1.12
              : 1;

          return (
            <NavLink key={link.path} to={link.path}>
              {({ isActive }) => (
                <motion.div
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{
                    scale,
                    y: distance === 0 ? -8 : distance === 1 ? -3 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 22,
                  }}
                  className="relative"
                >
                  {/* Sliding Hover Pill */}
                  {(hovered === index || isActive) && (
                    <motion.div
                      layoutId="dock-pill"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                      className="
                        absolute inset-0
                        rounded-full
                        bg-white/70
                        backdrop-blur-xl
                        shadow-sm
                      "
                    />
                  )}

                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="
                      relative
                      z-10
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                    "
                  >
                    <Icon
                      size={22}
                      className={
                        isActive
                          ? "text-black"
                          : "text-neutral-600"
                      }
                    />
                  </motion.div>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}