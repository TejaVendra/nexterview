import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowProfilePic } from "../../redux/slices/Profile";

function ProfilePic({ profilePic }) {

  const dispatch = useDispatch();


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClick();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/40"
        onClick={() => dispatch(setShowProfilePic())}
      />

      {/* Image */}
      <div
        className="relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={profilePic}
          alt="Profile"
          className="
            w-[min(450px,80vw)]
            h-[min(450px,80vw)]
            rounded-2xl
            object-contain
            backdrop-blur-sm
            shadow-2xl
            border-4 border-gray-100
          "
        />

        {/* Close button */}
        <button
          type="button"
          onClick={() => dispatch(setShowProfilePic())}
          className="
            absolute top-3 right-3
            flex h-9 w-9
            items-center justify-center
            rounded-full
            bg-white
            text-gray-700
            shadow-lg
            transition
            hover:bg-gray-100
          "
          aria-label="Close profile picture"
        >
          <span className="text-xl leading-none">×</span>
        </button>
      </div>
    </div>
  );
}

export default ProfilePic;