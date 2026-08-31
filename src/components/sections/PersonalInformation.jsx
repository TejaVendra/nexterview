import { IoCameraOutline } from "react-icons/io5";


function PersonalInformation() {
  return (
    <div className="w-full max-w-5xl mx-auto pt-6">
   
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your personal information and profile details.
        </p>
      </div>
 
   
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
      
          <div className="w-full md:w-[30%] flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 p-8">
            
          
            <div className="relative">
              <img
                className="h-40 w-40 rounded-full object-cover border-4 border-white shadow-md"
                src="https://imgs.search.brave.com/pekBFfEBfmZ5mpETqCk6h5lVaECe_fHVPT_Je3dixgI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tdmVj/dG9yL2J1c2luZXNz/LW1hbi1hdmF0YXIt/cHJvZmlsZV8xMTMz/MjU3LTI0MzEuanBn/P3NlbXQ9YWlzX2h5/YnJpZCZ3PTc0MCZx/PTgw"
                alt="Profile"
              />

             
              <button
                type="button"
                className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:bg-gray-800"
              >
                <IoCameraOutline size={20} />
              </button>
            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-900">
              Teja
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Profile Photo
            </p>

            <button
              type="button"
              className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Change photo
            </button>
          </div>

       
          <div className="flex-1 p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              {/* Username */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

            
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                 disabled
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg cursor-not-allowed border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

            
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Login Provider
                </label>

                <input
                  type="text"
                  placeholder="Google"
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none"
                />
              </div>

           
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Account Status
                </label>

                <div className="flex h-[46px] items-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Verified
                  </span>
                </div>
              </div>
            </div>

          
            <div className="my-8 border-t border-gray-200" />

          
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformation;
