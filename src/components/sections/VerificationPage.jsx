import React from "react";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { auth } from "../../database/firebase";
import { sendEmailVerification } from "firebase/auth";
import {
  Mail,
  CheckCircle2,
  UserRoundX,
} from "lucide-react";
function VerificationPage() {
  const navigate = useNavigate();

  const handleDelete = async()=>{
    await deleteUser(auth.currentUser);
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 md:pt-5 bg-white/50 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8">

        <div className="flex justify-center">
          <div className="bg-yellow-100 p-4 rounded-full">
            <MdMarkEmailUnread className="text-yellow-600" size={55} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mt-6">
          Verify Your Email
        </h1>

        <div className="mt-6 flex gap-2 items-start bg-yellow-50 border border-yellow-300 rounded-lg p-4 hover:scale-[1.01] transition-all duration-300">
          <IoInformationCircleOutline
            className="text-yellow-600 mt-0.5"
            size={22}
          />

          <p className="text-gray-700 leading-7 ">
            We've sent a verification email to your registered email address.
            Please verify your account before accessing the website.
          </p>
        </div>

        <div className="mt-6 bg-gray-50 border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Next Steps</h3>

          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Open your email inbox or spam folder.</li>
            <li>Click the verification link.</li>
            <li>Return to the application.</li>
            <li>click the I have Verified.</li>
          </ul>
        </div>

        <div className="mt-8 space-y-4">
            {/* Resend Verification */}
            <button
              onClick={() => sendEmailVerification(auth.currentUser)}
              className="w-full flex items-center cursor-pointer justify-center gap-2 bg-linear-to-r from-gray-700 to-black/90 hover:from-black hover:to-gray-700 transition-colors duration-300 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg"
            >
              <Mail size={18} />
              Send Verification Email Again
            </button>

            {/* Refresh Verification */}
            <button
              onClick={() => window.location.reload()}
              className="w-full flex items-center cursor-pointer justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 hover:border-blue-500 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              <CheckCircle2 size={18} />
              I've Verified My Email
            </button>

            {/* Use Another Account */}
            <button
              onClick={handleDelete}
              className="w-full flex items-center cursor-pointer justify-center gap-2 border border-red-300 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              <UserRoundX size={18} />
              Use Another Account
            </button>
          </div>

      </div>
    </section>
  );
}

export default VerificationPage;