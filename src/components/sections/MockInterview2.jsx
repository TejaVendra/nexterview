import {  useState   } from "react";
import { useNavigate } from "react-router-dom";
import { options } from "../../data/roles.js";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { setIsContinue1 , setSelectedOptions } from "../../redux/slices/mockInterview.js";
import { useDispatch, useSelector } from "react-redux";
import { useCreateMockInterview } from "../../querystack/queries/mockInterviewQuery.js";
import LocalLoader from "../loaders/LocalLoader.jsx";
import { toast } from "react-toastify";

function MockInterview2() {

  const dispatch = useDispatch();

  const navigate  = useNavigate();

  
  
  const { selectedRole, selectedOptions} = useSelector((state) => state.mockInterview);
  console.log(selectedOptions)

  const isComplete = options.every(
  option => selectedOptions[option.title]
);

const { mutate:createInterview, isPending} = useCreateMockInterview();

 const handleContinue = () => {

    const interviewData = {
        role: selectedRole,
        duration: selectedOptions.Duration.split(" ")[0],
        experience: selectedOptions.Experience,
        round: selectedOptions.Round,
  
    };

    console.log("Sending interview data:", interviewData);

    createInterview(interviewData, {
        onSuccess: (data) => {
            console.log("Created:", data);

            const interviewId = data.data.interviewId;

            navigate(
                `/mock-interview/prepare/${interviewId}`
            );
        },

        onError: (error) => {
            console.log(
                "Create interview error:",
                error.response?.data
            );
            toast.error(error.response?.data.message)
        }
    });
};

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
                disabled={!isComplete || isPending}
                className={`rounded-xl px-10 py-3 font-semibold text-white transition-all duration-300 ${
                    isComplete && !isPending
                        ? "bg-black/90 hover:bg-black active:scale-95 shadow-lg cursor-pointer"
                        : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={handleContinue}
            >
                {isPending ? <LocalLoader /> : "Continue"}
            </button>
        </div>
    </div>
  );
}

export default MockInterview2;