import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth, provider } from "../../database/firebase";
import {
  emailAndPasswordSignIn,
  googleSignUp,
} from "../../redux/thunks/authThunk";


export const Signin = () => {

  // --------------------------------------------------
  // State
  // --------------------------------------------------

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [firebaseError, setFirebaseError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [resetPasswordSent, setResetPasswordSent] = useState(false);

  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  });


  // --------------------------------------------------
  // Hooks
  // --------------------------------------------------

  const nav = useNavigate();
  const dispatch = useDispatch();

  const {
    user,
    loading,
    error,
  } = useSelector((state) => state.auth);


  // --------------------------------------------------
  // Constants
  // --------------------------------------------------

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const MIN_PASSWORD_LENGTH = 8;


  // --------------------------------------------------
  // Redirect authenticated user
  // --------------------------------------------------

  useEffect(() => {
    if (user) {
      nav("/dashboard", { replace: true });
    }
  }, [user, nav]);


  // --------------------------------------------------
  // Handle Redux errors
  // --------------------------------------------------

  useEffect(() => {

    if (!error) {
      return;
    }

    const cleanError = getCleanErrorMessage(error);

    setFirebaseError(cleanError);

  }, [error]);


  // --------------------------------------------------
  // Firebase error handler
  // --------------------------------------------------

  const getCleanErrorMessage = (error) => {

    if (!error) {
      return "Something went wrong. Please try again.";
    }

    let errorCode = "";
    let errorMessage = "";

    // -----------------------------------------------
    // Error can be:
    // 1. Firebase error object
    // 2. Redux error object
    // 3. String
    // -----------------------------------------------

    if (typeof error === "string") {

      errorMessage = error;

    } else {

      errorCode =
        error?.code ||
        error?.error?.code ||
        "";

      errorMessage =
        error?.message ||
        error?.error?.message ||
        "";
    }


    // -----------------------------------------------
    // Normalize Firebase code
    // -----------------------------------------------

    errorCode = errorCode
      .replace("auth/", "")
      .trim();


    // -----------------------------------------------
    // Firebase error mapping
    // -----------------------------------------------

    const errorMap = {

      "email-already-in-use":
        "This email is already registered. Please sign in instead.",

      "invalid-email":
        "Please enter a valid email address.",

      "user-not-found":
        "No account found with this email. Please sign up first.",

      "wrong-password":
        "Incorrect password. Please try again.",

      "invalid-credential":
        "Invalid email or password. Please check your credentials.",

      "too-many-requests":
        "Too many failed attempts. Please try again later.",

      "network-request-failed":
        "Network error. Please check your internet connection.",

      "popup-closed-by-user":
        "Google sign-in was cancelled.",

      "popup-blocked":
        "Google sign-in popup was blocked. Please allow popups for this site.",

      "account-exists-with-different-credential":
        "An account already exists with this email using a different sign-in method.",

      "operation-not-allowed":
        "This sign-in method is currently unavailable.",

      "user-disabled":
        "This account has been disabled. Please contact support.",

      "invalid-verification-code":
        "The verification code is invalid.",

      "expired-action-code":
        "This password reset link has expired.",

      "weak-password":
        "Please choose a stronger password.",
        "Invalid or expired refresh token.":""
    };


    if (errorCode && errorMap[errorCode]) {
      return errorMap[errorCode];
    }


    // -----------------------------------------------
    // Sometimes the Firebase error is inside message
    // -----------------------------------------------

    for (const [code, message] of Object.entries(errorMap)) {

      if (
        errorMessage.includes(code) ||
        errorMessage.includes(`auth/${code}`)
      ) {
        return message;
      }
    }


    // -----------------------------------------------
    // Unknown error
    // -----------------------------------------------

    if (errorMessage) {

      // Remove ugly Firebase prefix if present
      return errorMessage
        .replace(/^Firebase:\s*/i, "")
        .replace(/\(auth\/.*?\)\.?$/i, "")
        .trim();

    }

    return "Something went wrong. Please try again.";
  };


  // --------------------------------------------------
  // Validate email
  // --------------------------------------------------

  const validateEmail = (value) => {

    const trimmedEmail = value.trim();

    if (!trimmedEmail) {
      return "Email is required";
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return "Please enter a valid email address";
    }

    return "";
  };


  // --------------------------------------------------
  // Validate password
  // --------------------------------------------------

  const validatePassword = (value) => {

    if (!value) {
      return "Password is required";
    }

    if (value.length < MIN_PASSWORD_LENGTH) {
      return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    }

    return "";
  };


  // --------------------------------------------------
  // Email change
  // --------------------------------------------------

  const handleEmail = (e) => {

    const value = e.target.value;

    setEmail(value);

    setTouchedFields((prev) => ({
      ...prev,
      email: true,
    }));

    // Clear server/Firebase error when user edits
    setFirebaseError("");

    setResetPasswordSent(false);


    // -----------------------------------------------
    // Don't show "required" while typing
    // -----------------------------------------------

    if (!value.trim()) {
      setEmailError("");
      return;
    }


    const error = validateEmail(value);

    setEmailError(error);
  };


  // --------------------------------------------------
  // Password change
  // --------------------------------------------------

  const handlePassword = (e) => {

    const value = e.target.value;

    setPassword(value);

    setTouchedFields((prev) => ({
      ...prev,
      password: true,
    }));

    // Clear Firebase error when user changes password
    setFirebaseError("");


    // Don't show required error while typing
    if (!value) {
      setPasswordError("");
      return;
    }


    const error = validatePassword(value);

    setPasswordError(error);
  };


  // --------------------------------------------------
  // Submit email/password login
  // --------------------------------------------------

  const handleSubmit = async (e) => {

    e.preventDefault();


    // Prevent double submission
    if (isSubmitting || loading) {
      return;
    }


    // Mark fields as touched
    setTouchedFields({
      email: true,
      password: true,
    });


    // -----------------------------------------------
    // Validate
    // -----------------------------------------------

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    setFirebaseError("");
    setResetPasswordSent(false);


    if (emailValidation || passwordValidation) {
      return;
    }


    // -----------------------------------------------
    // Normalize email
    // -----------------------------------------------

    const normalizedEmail = email.trim().toLowerCase();


    try {

      setIsSubmitting(true);

      /*
       * IMPORTANT:
       *
       * Await the thunk.
       *
       * If your thunk uses createAsyncThunk,
       * .unwrap() allows the catch block to receive
       * the rejected error.
       */

      await dispatch(
        emailAndPasswordSignIn({
          auth,
          email: normalizedEmail,
          password,
        })
      ).unwrap?.();

    } catch (error) {

      console.error("Signin error:", error);

      const errorMessage = getCleanErrorMessage(error);

    } finally {

      setIsSubmitting(false);
    }
  };


  // --------------------------------------------------
  // Forgot password
  // --------------------------------------------------

  const handleForgotPassword = async () => {

    // Prevent multiple requests
    if (isSubmitting || loading) {
      return;
    }


    // -----------------------------------------------
    // Validate email
    // -----------------------------------------------

    const emailValidation = validateEmail(email);

    setTouchedFields((prev) => ({
      ...prev,
      email: true,
    }));


    if (emailValidation) {

      setEmailError(
        emailValidation === "Email is required"
          ? "Please enter your email address to reset your password"
          : emailValidation
      );

      return;
    }


    const normalizedEmail = email.trim().toLowerCase();


    try {

      setIsSubmitting(true);

      setFirebaseError("");
      setResetPasswordSent(false);


      await sendPasswordResetEmail(
        auth,
        normalizedEmail
      );


      setResetPasswordSent(true);

      setEmailError("");

    } catch (error) {

      console.error(
        "Password reset error:",
        error
      );

      const errorMessage =
        getCleanErrorMessage(error);

      setFirebaseError(errorMessage);

    } finally {

      setIsSubmitting(false);
    }
  };


  // --------------------------------------------------
  // Google sign in
  // --------------------------------------------------

  const handleGoogleSubmit = async () => {

    if (isSubmitting || loading) {
      return;
    }


    try {

      setIsSubmitting(true);

      setFirebaseError("");
      setResetPasswordSent(false);


      /*
       * Keeping your existing Google thunk logic.
       *
       * If googleSignUp is a createAsyncThunk,
       * .unwrap() will allow errors to reach catch.
       */

      await dispatch(
        googleSignUp(auth, provider)
      ).unwrap?.();

    } catch (error) {

      console.error(
        "Google signin error:",
        error
      );

      const errorMessage =
        getCleanErrorMessage(error);

      setFirebaseError(errorMessage);

    } finally {

      setIsSubmitting(false);
    }
  };


  // --------------------------------------------------
  // UI loading state
  // --------------------------------------------------

  const submitting =
    isSubmitting || loading;


  // --------------------------------------------------
  // JSX
  // --------------------------------------------------

  return (

    <section className="min-h-screen bg-white/50 p-5 rounded-b-[150px] shadow-2xl">

      <div className="flex justify-center items-center min-h-screen font-rubik">

        <div className="w-sm sm:w-md p-10 bg-white rounded-lg shadow-2xl flex flex-col">

          {/* -----------------------------------------
              Heading
          ------------------------------------------ */}

          <h3 className="text-3xl font-semibold">
            Sign In
          </h3>

          <p className="text-gray-600">
            Enter your email and password to sign in.
          </p>


          <div className="flex flex-col gap-4 pt-5">


            {/* ========================================
                EMAIL/PASSWORD FORM
            ========================================= */}

            <form onSubmit={handleSubmit} noValidate>

              {/* ---------------------------------------
                  Email
              ---------------------------------------- */}

              <div className="flex flex-col">

                <label
                  htmlFor="email"
                  className="mb-1"
                >
                  Email
                </label>

                <input
                  id="email"
                  value={email}
                  onChange={handleEmail}
                  className={`
                    border
                    rounded-lg
                    p-2
                    outline-none
                    transition-colors
                    ${
                      emailError && touchedFields.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-300 focus:border-blue-700"
                    }
                  `}
                  type="email"
                  name="email"
                  disabled={submitting}
                  placeholder="Enter your email"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={
                    !!(
                      emailError &&
                      touchedFields.email
                    )
                  }
                  aria-describedby={
                    emailError &&
                    touchedFields.email
                      ? "email-error"
                      : undefined
                  }
                />


                {emailError &&
                  touchedFields.email && (

                    <div
                      id="email-error"
                      className="flex items-center text-red-600 text-sm mt-1"
                    >

                      <IoMdInformationCircleOutline />

                      <p className="ml-1">
                        {emailError}
                      </p>

                    </div>

                  )}

              </div>


              {/* ---------------------------------------
                  Password
              ---------------------------------------- */}

              <div className="flex flex-col pt-2">

                <div className="flex justify-between items-center">

                  <label
                    htmlFor="password"
                  >
                    Password
                  </label>


                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={submitting}
                    className={`
                      text-sm
                      ${
                        !submitting
                          ? "cursor-pointer hover:underline"
                          : "cursor-not-allowed opacity-50"
                      }
                    `}
                  >
                    Forgot Password?
                  </button>

                </div>


                {/* Password input */}

                <div className="relative w-full">

                  <input
                    id="password"
                    value={password}
                    onChange={handlePassword}
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    className={`
                      w-full
                      border
                      rounded-lg
                      p-2
                      pr-10
                      outline-none
                      transition-colors
                      ${
                        passwordError &&
                        touchedFields.password
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-blue-700"
                      }
                    `}
                    disabled={submitting}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    aria-invalid={
                      !!(
                        passwordError &&
                        touchedFields.password
                      )
                    }
                  />


                  {/* Show / Hide password */}

                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className={`
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                      ${
                        submitting
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }
                    `}
                  >

                    {showPassword ? (
                      <RiEyeCloseLine
                        size={20}
                      />
                    ) : (
                      <FaEye
                        size={20}
                      />
                    )}

                  </button>

                </div>


                {passwordError &&
                  touchedFields.password && (

                    <div
                      className="flex items-center text-red-600 text-sm mt-1"
                    >

                      <IoMdInformationCircleOutline />

                      <p className="ml-1">
                        {passwordError}
                      </p>

                    </div>

                  )}

              </div>


              {/* ---------------------------------------
                  Firebase / Reset messages
              ---------------------------------------- */}

              <div className="space-y-1 pt-2">

            


                {resetPasswordSent && (

                  <div
                    className="flex items-center text-green-600 text-sm"
                    role="status"
                  >

                    <p>
                      ✓ Password reset email sent!
                      Please check your inbox.
                    </p>

                  </div>

                )}

              </div>


              {/* ---------------------------------------
                  Sign In button
              ---------------------------------------- */}

              <div className="flex flex-col pt-3">

                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    bg-blue-800
                    p-2
                    text-white
                    font-bold
                    text-lg
                    rounded-lg
                    cursor-pointer
                    hover:bg-blue-900
                    transition-colors
                    duration-200
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >

                  {submitting
                    ? "Signing In..."
                    : "Sign In"}

                </button>

              </div>

            </form>


            {/* ========================================
                OR
            ========================================= */}

            <div className="flex items-center gap-3">

              <div className="flex-1 border-t border-gray-300" />

              <p className="text-sm text-gray-500">
                or
              </p>

              <div className="flex-1 border-t border-gray-300" />

            </div>


            {/* ========================================
                GOOGLE SIGN IN
            ========================================= */}

            <div className="flex flex-col">

              <button
                type="button"
                onClick={handleGoogleSubmit}
                disabled={submitting}
                className="
                  flex
                  justify-center
                  items-center
                  p-2
                  border
                  text-md
                  text-gray-600
                  rounded-lg
                  cursor-pointer
                  gap-1
                  hover:bg-pink-100
                  transition-colors
                  duration-200
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >

                <FcGoogle size={23} />

                <span>
                  {submitting
                    ? "SIGNING IN..."
                    : "CONTINUE WITH GOOGLE"}
                </span>

              </button>

            </div>


            {/* ========================================
                SIGN UP
            ========================================= */}

            <div className="flex flex-col text-sm text-center">

              <p className="text-gray-400">

                Don't have an account?{" "}

                <button
                  type="button"
                  onClick={() => {
                    if (!submitting) {
                      nav("/signup");
                    }
                  }}
                  disabled={submitting}
                  className="
                    text-gray-900
                    font-semibold
                    cursor-pointer
                    hover:underline
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  Sign Up
                </button>

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
