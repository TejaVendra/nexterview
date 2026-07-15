import React, { useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../redux/slices/navBar";
import { LogOut } from "lucide-react";

function ProfileCard() {
  const dispatch = useDispatch();

  const profileRef = useRef(null);

  const isOpen = useSelector((state) => state.navbar.isOpen);

  const { user } = useSelector((state) => state.auth);

  const handleOpen = () => {
    dispatch(setOpen());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        dispatch(setOpen());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  return (
    <div
      ref={profileRef}
      className="relative mr-3 md:mr-6"
    >
      {/* Profile Image */}

      <div
        onClick={handleOpen}
        className="
          cursor-pointer
          rounded-full
          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:scale-105
          hover:shadow-2xl
        "
      >
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={user?.photoURL}
          alt="profile"
        />
      </div>

      {/* Dropdown */}

      <div
        className={`
          absolute
          top-full
          right-0
          z-50
          mt-3
          w-44
          origin-top-right
          rounded-xl
          bg-white/60
          p-4
          shadow-xl
          backdrop-blur-xl

          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            isOpen
              ? `
                visible
                translate-y-0
                scale-100
                opacity-100
              `
              : `
                invisible
                pointer-events-none
                -translate-y-3
                scale-75
                opacity-0
              `
          }
        `}
      >
        <button
          type="button"
          className="
            group
            flex
            w-full
            cursor-pointer
            items-center
            gap-3
            rounded-2xl
            px-5
            py-3
            transition-all
            duration-500
            hover:scale-105
            hover:bg-white
            hover:shadow-lg
          "
        >
          <CgProfile size={18} />

          <span className="text-sm font-medium">
            Profile
          </span>
        </button>

        <button
          type="button"
          className="
            group
            flex
            w-full
            cursor-pointer
            items-center
            gap-3
            rounded-2xl
            px-5
            py-3
            text-red-600
            transition-all
            duration-500
            hover:scale-105
            hover:bg-white
            hover:shadow-lg
          "
        >
          <LogOut size={18} />

          <span className="text-sm font-medium">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;