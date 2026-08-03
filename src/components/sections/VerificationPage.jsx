import React from "react";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function VerificationPage() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8">

        <div className="flex justify-center">
          <div className="bg-yellow-100 p-4 rounded-full">
            <MdMarkEmailUnread className="text-yellow-600" size={55} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mt-6">
          Verify Your Email
        </h1>

        <div className="mt-6 flex gap-2 items-start bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <IoInformationCircleOutline
            className="text-yellow-600 mt-0.5"
            size={22}
          />

          <p className="text-gray-700 leading-7">
            We've sent a verification email to your registered email address.
            Please verify your account before accessing the website.
          </p>
        </div>

        <div className="mt-6 bg-gray-50 border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Next Steps</h3>

          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Open your email inbox.</li>
            <li>Click the verification link.</li>
            <li>Return to the application.</li>
            <li>Sign in again to continue.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Go to Login
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full border border-gray-300 hover:bg-gray-100 py-3 rounded-lg font-semibold transition"
          >
            I've Verified My Email
          </button>
        </div>

      </div>
    </section>
  );
}

export default VerificationPage;