import {  useState } from "react";
import { options } from "../../data/roles.js";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { setIsContinue1 , setSelectedOptions } from "../../redux/slices/mockInterview.js";
import { useDispatch, useSelector } from "react-redux";


function MockInterview2() {

  const dispatch = useDispatch();
  
  const { selectedOptions} = useSelector((state) => state.mockInterview);
  console.log(selectedOptions)

  const isComplete = options.every(
  option => selectedOptions[option.title]
);

  return (
    <div>
      {/* Roles */}
      <div className="mt-12 ">
             <button
                  className="
                    h-12 w-12 rounded-full
                     flex 
                    text-black
                     items-center justify-center
                    border-2 border-white

                    hover:bg-white/10
                    hover:backdrop-blur-md
                    hover:scale-105
                    hover:shadow-xl
                    active:scale-95
                    cursor-pointer

                    transition-all duration-200
                  "
                  onClick={() => dispatch(setIsContinue1(false))}
                >
                  <MdOutlineArrowBackIos size={25} />
                </button>
        {options.map((option, index) => (
          <div key={index} className="p-2">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">
                {option.title}
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

              {option.types.map((type, index) => {
                const isSelected =
                  selectedOptions[option.title] === type;

                return (
                  <button
                    key={index}
                    onClick={() => {
                      dispatch(setSelectedOptions({
                          category: option.title,
                          value: type,
                        }))}}
                      className={`
                      p-5 rounded-2xl border
                      cursor-pointer
                      transition-all duration-300
                      hover:-translate-y-1
                      active:scale-95

                      ${
                        isSelected
                          ? "bg-purple-100 text-purple-700 "
                          : "bg-gray-200 border border-white text-gray-900 hover:border-purple-500"
                      }
                    `}
                  >
                    {type}
                  </button>
                );
              })}

            </div>
          </div>
        ))}
      </div>

      {/* Continue */}
      <div className="mt-10 flex justify-center">
        <button
                disabled={!isComplete}
                className={`rounded-xl px-10 py-3 font-semibold text-white transition-all duration-300 ${
                  isComplete
                    ? "bg-black/90 hover:bg-black active:scale-95 shadow-lg cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Continue
              </button>

          
      </div>
    </div>
  );
}

export default MockInterview2;