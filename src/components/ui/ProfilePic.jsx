
function ProfilePic({ profilePic, onClick }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl"
        onClick={onClick}
      />

      {/* Profile picture */}
      <div className="relative z-10">
        <img
          src={profilePic}
          alt="Profile"
          className="max-w-[90vw] max-h-screen rounded-lg object-contain scale-200"
        />
      </div>

    </div>
  );
}

export default ProfilePic;