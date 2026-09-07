import  { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  googleSignUp,
  emailAndPasswordSignUp,
} from "../../redux/thunks/authThunk";


export const Signup = () => {

  // ==================================================
  // STATE
  // ==================================================

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [fullPasswordError, setFullPasswordError] = useState("");

  const [firebaseError, setFirebaseError] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [touchedFields, setTouchedFields] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });


  // ==================================================
  // HOOKS
  // ==================================================

  const nav = useNavigate();
  const dispatch = useDispatch();

  const {
    user,
    authLoading,
    error,
  } = useSelector((state) => state.auth);


  // ==================================================
  // CONSTANTS
  // ==================================================

  const MIN_USERNAME_LENGTH = 3;
  const MAX_USERNAME_LENGTH = 20;
  const MIN_PASSWORD_LENGTH = 8;

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

  const SPECIAL_CHARACTER_REGEX =
    /[!@#$%^&*(),.?":{}|<>[\]\\/'`~;+=_-]/;


  // ==================================================
  // PASSWORD STRENGTH VALIDATION
  // ==================================================

  const validatePasswordStrength = (value) => {

    const errors = [];

    if (value.length < MIN_PASSWORD_LENGTH) {
      errors.push(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
      );
    }

    if (!/[A-Z]/.test(value)) {
      errors.push(
        "Password must contain at least one uppercase letter"
      );
    }

    if (!/[a-z]/.test(value)) {
      errors.push(
        "Password must contain at least one lowercase letter"
      );
    }

    if (!/[0-9]/.test(value)) {
      errors.push(
        "Password must contain at least one number"
      );
    }

    if (!SPECIAL_CHARACTER_REGEX.test(value)) {
      errors.push(
        "Password must contain at least one special character"
      );
    }

    return errors;
  };


  // ==================================================
  // EMAIL VALIDATION
  // ==================================================

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


  // ==================================================
  // USERNAME VALIDATION
  // ==================================================

  const validateUsername = (value) => {

    const trimmedUsername = value.trim();

    if (!trimmedUsername) {
      return "Username is required";
    }

    if (trimmedUsername.length < MIN_USERNAME_LENGTH) {
      return `Username must be at least ${MIN_USERNAME_LENGTH} characters`;
    }

    if (trimmedUsername.length > MAX_USERNAME_LENGTH) {
      return `Username must be at most ${MAX_USERNAME_LENGTH} characters`;
    }

    if (!USERNAME_REGEX.test(trimmedUsername)) {
      return "Username can only contain letters, numbers, and underscores";
    }

    return "";
  };


  // ==================================================
  // CONFIRM PASSWORD VALIDATION
  // ==================================================

  const validateConfirmPassword = (
    passwordValue,
    confirmPasswordValue
  ) => {

    if (!confirmPasswordValue) {
      return "Please confirm your password";
    }

    if (passwordValue !== confirmPasswordValue) {
      return "Passwords do not match";
    }

    return "";
  };


  // ==================================================
  // REDIRECT AUTHENTICATED USER
  // ==================================================

  useEffect(() => {

    if (user && user.emailVerified) {
      nav("/dashboard", { replace: true });
    }

  }, [user, nav]);


  // ==================================================
  // HANDLE REDUX AUTH ERROR
  // ==================================================

  useEffect(() => {

    if (!error) {
      return;
    }

    const cleanError = getCleanErrorMessage(error);

    setFirebaseError(cleanError);

  }, [error]);


  // ==================================================
  // HANDLE EMAIL VERIFICATION STATE
  // ==================================================

  useEffect(() => {

    if (
      user &&
      !user.emailVerified &&
      !authLoading &&
      !isSubmitting
    ) {
      setVerificationError(
        "We've sent a verification email to your address. Please verify your email to continue."
      );
    }

  }, [user, authLoading, isSubmitting]);


  // ==================================================
  // FIREBASE ERROR HANDLER
  // ==================================================

  const getCleanErrorMessage = (error) => {

    if (!error) {
      return "Something went wrong. Please try again.";
    }

    let errorCode = "";
    let errorMessage = "";


    // --------------------------------------------------
    // Firebase / Redux error can have different shapes
    // --------------------------------------------------

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


    // --------------------------------------------------
    // Normalize error code
    // --------------------------------------------------

    errorCode = errorCode
      .replace("auth/", "")
      .trim();


    // --------------------------------------------------
    // Firebase error messages
    // --------------------------------------------------

    const errorMap = {

      "email-already-in-use":
        "This email is already registered. Please sign in instead.",

      "invalid-email":
        "Please enter a valid email address.",

      "operation-not-allowed":
        "Email/password accounts are not enabled. Please use Google sign-in.",

      "weak-password":
        "Password is too weak. Please use a stronger password.",

      "user-not-found":
        "No account found with this email.",

      "wrong-password":
        "Incorrect password. Please try again.",

      "invalid-credential":
        "Invalid credentials. Please try again.",

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

      "user-disabled":
        "This account has been disabled. Please contact support.",

      "requires-recent-login":
        "Please sign in again and try again.",

      "credential-already-in-use":
        "This account is already associated with another user.",

      "invalid-verification-code":
        "The verification code is invalid.",

      "expired-action-code":
        "This verification link has expired.",
        "Invalid or expired refresh token.":"",
    };


    // --------------------------------------------------
    // Match error code
    // --------------------------------------------------

    if (errorCode && errorMap[errorCode]) {
      return errorMap[errorCode];
    }


    // --------------------------------------------------
    // Sometimes Firebase code is inside message
    // --------------------------------------------------

    for (const [code, message] of Object.entries(errorMap)) {

      if (
        errorMessage.includes(code) ||
        errorMessage.includes(`auth/${code}`)
      ) {
        return message;
      }

    }


    // --------------------------------------------------
    // Unknown error
    // --------------------------------------------------

    if (errorMessage) {

      return errorMessage
        .replace(/^Firebase:\s*/i, "")
        .replace(/\(auth\/.*?\)\.?$/i, "")
        .trim();

    }


    return "Something went wrong. Please try again.";
  };


  // ==================================================
  // USERNAME CHANGE
  // ==================================================

  const handleUsername = (e) => {

    const value = e.target.value;

    setUsername(value);

    setTouchedFields((prev) => ({
      ...prev,
      username: true,
    }));

    setFirebaseError("");
    setVerificationError("");


    // Don't show validation error for empty field
    // while user is typing
    if (!value.trim()) {
      setUsernameError("");
      return;
    }


    const error = validateUsername(value);

    setUsernameError(error);
  };


  // ==================================================
  // EMAIL CHANGE
  // ==================================================

  const handleEmail = (e) => {

    const value = e.target.value;

    setEmail(value);

    setTouchedFields((prev) => ({
      ...prev,
      email: true,
    }));

    setFirebaseError("");
    setVerificationError("");


    if (!value.trim()) {
      setEmailError("");
      return;
    }


    const error = validateEmail(value);

    setEmailError(error);
  };


  // ==================================================
  // PASSWORD CHANGE
  // ==================================================

  const handlePassword = (e) => {

    const value = e.target.value;

    setPassword(value);

    setTouchedFields((prev) => ({
      ...prev,
      password: true,
    }));

    setFirebaseError("");
    setVerificationError("");


    // Empty password while typing
    if (!value) {

      setPasswordError("");
      setFullPasswordError("");

      return;
    }


    const strengthErrors =
      validatePasswordStrength(value);


    if (strengthErrors.length > 0) {

      setPasswordError(
        strengthErrors[0]
      );

    } else {

      setPasswordError("");

    }


    // -----------------------------------------------
    // Revalidate confirm password
    // -----------------------------------------------

    if (confirmPassword) {

      const confirmError =
        validateConfirmPassword(
          value,
          confirmPassword
        );

      setFullPasswordError(confirmError);

    }

  };


  // ==================================================
  // CONFIRM PASSWORD CHANGE
  // ==================================================

  const handleConPassword = (e) => {

    const value = e.target.value;

    setConfirmPassword(value);

    setTouchedFields((prev) => ({
      ...prev,
      confirmPassword: true,
    }));

    setFirebaseError("");
    setVerificationError("");


    if (!value) {

      setConfirmPasswordError("");

      setFullPasswordError("");

      return;
    }


    // -----------------------------------------------
    // Password hasn't been entered yet
    // -----------------------------------------------

    if (!password) {

      setConfirmPasswordError(
        "Please enter your password first"
      );

      setFullPasswordError("");

      return;
    }


    // -----------------------------------------------
    // Compare passwords
    // -----------------------------------------------

    if (value !== password) {

      setFullPasswordError(
        "Passwords do not match"
      );

      setConfirmPasswordError("");

    } else {

      setFullPasswordError("");
      setConfirmPasswordError("");

    }

  };


  // ==================================================
  // GOOGLE SIGN UP
  // ==================================================

  const handleGoogleSubmit = async () => {

    // Prevent double clicks
    if (isSubmitting || authLoading) {
      return;
    }


    try {

      setIsSubmitting(true);

      setFirebaseError("");
      setVerificationError("");


      // -----------------------------------------------
      // Dispatch Google signup
      // -----------------------------------------------

      await dispatch(
        googleSignUp()
      ).unwrap();


      /*
       * Don't manually redirect here.
       *
       * Redux updates `user`, and the useEffect above
       * handles the redirect.
       */

    } catch (error) {

      console.error(
        "Google signup error:",
        error
      );

      const errorMessage =
        getCleanErrorMessage(error);

      setFirebaseError(errorMessage);

    } finally {

      setIsSubmitting(false);

    }

  };


  // ==================================================
  // EMAIL/PASSWORD SIGN UP
  // ==================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // -----------------------------------------------
    // Prevent multiple submissions
    // -----------------------------------------------

    if (isSubmitting || authLoading) {
      return;
    }


    // -----------------------------------------------
    // Mark all fields as touched
    // -----------------------------------------------

    setTouchedFields({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });


    setFirebaseError("");
    setVerificationError("");


    // -----------------------------------------------
    // Validate username
    // -----------------------------------------------

    const usernameValidation =
      validateUsername(username);

    setUsernameError(usernameValidation);


    // -----------------------------------------------
    // Validate email
    // -----------------------------------------------

    const emailValidation =
      validateEmail(email);

    setEmailError(emailValidation);


    // -----------------------------------------------
    // Validate password
    // -----------------------------------------------

    const passwordValidation =
      validatePasswordStrength(password);

    if (!password) {

      setPasswordError(
        "Password is required"
      );

    } else if (passwordValidation.length > 0) {

      setPasswordError(
        passwordValidation[0]
      );

    } else {

      setPasswordError("");

    }


    // -----------------------------------------------
    // Validate confirm password
    // -----------------------------------------------

    const confirmValidation =
      validateConfirmPassword(
        password,
        confirmPassword
      );


    if (!confirmPassword) {

      setConfirmPasswordError(
        "Please confirm your password"
      );

      setFullPasswordError("");

    } else if (
      password !== confirmPassword
    ) {

      setFullPasswordError(
        "Passwords do not match"
      );

      setConfirmPasswordError("");

    } else {

      setFullPasswordError("");
      setConfirmPasswordError("");

    }


    // -----------------------------------------------
    // Final validation
    // -----------------------------------------------

    const isValid =
      !usernameValidation &&
      !emailValidation &&
      password &&
      passwordValidation.length === 0 &&
      confirmPassword &&
      !confirmValidation;


    if (!isValid) {
      return;
    }


    // -----------------------------------------------
    // Normalize values
    // -----------------------------------------------

    const normalizedUsername =
      username.trim();

    const normalizedEmail =
      email.trim().toLowerCase();


    try {

      setIsSubmitting(true);

      setFirebaseError("");
      setVerificationError("");


      // -----------------------------------------------
      // Signup
      // -----------------------------------------------

      await dispatch(
        emailAndPasswordSignUp({
          username: normalizedUsername,
          email: normalizedEmail,
          password,
        })
      ).unwrap();


      /*
       * Do not manually set isSubmitting(false)
       * here.
       *
       * finally{} handles it.
       *
       * If signup creates a Firebase user,
       * Redux should update `user`.
       *
       * The verification useEffect will then
       * display the verification message.
       */

    } catch (error) {

      console.error(
        "Signup error:",
        error
      );

      const errorMessage =
        getCleanErrorMessage(error);

      setFirebaseError(errorMessage);

    } finally {

      setIsSubmitting(false);

    }

  };


  // ==================================================
  // LOADING STATE
  // ==================================================

  const submitting =
    isSubmitting || authLoading;


  // ==================================================
  // PASSWORD REQUIREMENT STATUS
  // ==================================================

  const passwordRequirements = [
    {
      label: "At least one lowercase letter (a-z)",
      valid: /[a-z]/.test(password),
    },
    {
      label: "At least one uppercase letter (A-Z)",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "At least one number (0-9)",
      valid: /[0-9]/.test(password),
    },
    {
      label:
        "At least one special character (!@#$%^&* etc.)",
      valid: SPECIAL_CHARACTER_REGEX.test(password),
    },
    {
      label: "Minimum 8 characters",
      valid: password.length >= MIN_PASSWORD_LENGTH,
    },
  ];


  // ==================================================
  // JSX
  // ==================================================

  return (

    <section
      className="
        min-h-screen
        bg-white/50
        pt-20
        p-4
        md:pt-5
        md:rounded-b-[150px]
        shadow-2xl
      "
    >

      <div
        className="
          flex
          justify-center
          items-center
          min-h-screen
          font-rubik
        "
      >

        <div
          className="
            w-sm
            sm:w-lg
            p-10
            bg-white
            rounded-lg
            shadow-2xl
            flex
            flex-col
          "
        >

          {/* ==========================================
              HEADER
          =========================================== */}

          <div>

            <h3 className="text-3xl font-semibold">
              Sign Up
            </h3>

            <p className="text-gray-600">
              Create your account to get started.
            </p>

          </div>


          {/* ==========================================
              FORM
          =========================================== */}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-1 pt-5"
          >

            {/* ----------------------------------------
                USERNAME
            ----------------------------------------- */}

            <div className="flex flex-col">

              <label
                htmlFor="username"
                className="mb-1"
              >
                Username
              </label>

              <input
                id="username"
                value={username}
                onChange={handleUsername}
                className={`
                  border
                  rounded-lg
                  p-2
                  outline-none
                  transition-colors
                  ${
                    usernameError &&
                    touchedFields.username
                      ? "border-red-500"
                      : "border-gray-300 focus:border-blue-700"
                  }
                `}
                type="text"
                name="username"
                disabled={submitting}
                placeholder="Enter your username"
                autoComplete="username"
                maxLength={MAX_USERNAME_LENGTH}
                aria-invalid={
                  !!(
                    usernameError &&
                    touchedFields.username
                  )
                }
              />


              {usernameError &&
                touchedFields.username && (

                  <div
                    className="
                      flex
                      items-center
                      text-red-600
                      text-sm
                      mt-1
                    "
                  >

                    <IoMdInformationCircleOutline />

                    <p className="ml-1">
                      {usernameError}
                    </p>

                  </div>

                )}

            </div>


            {/* ----------------------------------------
                EMAIL
            ----------------------------------------- */}

            <div className="flex flex-col pt-4">

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
                    emailError &&
                    touchedFields.email
                      ? "border-red-500"
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
              />


              {emailError &&
                touchedFields.email && (

                  <div
                    className="
                      flex
                      items-center
                      text-red-600
                      text-sm
                      mt-1
                    "
                  >

                    <IoMdInformationCircleOutline />

                    <p className="ml-1">
                      {emailError}
                    </p>

                  </div>

                )}

            </div>


            {/* ----------------------------------------
                PASSWORD + CONFIRM PASSWORD
            ----------------------------------------- */}

            <div
              className="
                flex
                flex-col
                md:flex-row
                gap-4
                pt-4
              "
            >

              {/* PASSWORD */}

              <div className="flex flex-col flex-1">

                <label
                  htmlFor="password"
                  className="mb-1"
                >
                  Password
                </label>


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
                          ? "border-red-500"
                          : "border-gray-300 focus:border-blue-700"
                      }
                    `}
                    disabled={submitting}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    aria-invalid={
                      !!(
                        passwordError &&
                        touchedFields.password
                      )
                    }
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    disabled={submitting}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                      cursor-pointer
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
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

              </div>


              {/* CONFIRM PASSWORD */}

              <div className="flex flex-col flex-1">

                <label
                  htmlFor="confirmPassword"
                  className="mb-1"
                >
                  Confirm Password
                </label>


                <div className="relative w-full">

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={handleConPassword}
                    name="confirmPassword"
                    className={`
                      w-full
                      border
                      rounded-lg
                      p-2
                      pr-10
                      outline-none
                      transition-colors
                      ${
                        (
                          confirmPasswordError &&
                          touchedFields.confirmPassword
                        ) ||
                        fullPasswordError
                          ? "border-red-500"
                          : "border-gray-300 focus:border-blue-700"
                      }
                    `}
                    disabled={submitting}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    aria-invalid={
                      !!(
                        (
                          confirmPasswordError &&
                          touchedFields.confirmPassword
                        ) ||
                        fullPasswordError
                      )
                    }
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    disabled={submitting}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                      cursor-pointer
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >

                    {showConfirmPassword ? (
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

              </div>

            </div>


            {/* ==========================================
                PASSWORD ERRORS
            =========================================== */}

            <div>

              {passwordError &&
                touchedFields.password && (

                  <div
                    className="
                      flex
                      items-center
                      text-red-600
                      text-sm
                      mt-1
                    "
                  >

                    <IoMdInformationCircleOutline />

                    <p className="ml-1">
                      {passwordError}
                    </p>

                  </div>

                )}


              {!passwordError &&
                password &&
                touchedFields.password && (

                  <div
                    className="
                      flex
                      items-center
                      text-green-600
                      text-sm
                      mt-1
                    "
                  >

                    <p>
                      ✓ Password meets all requirements
                    </p>

                  </div>

                )}


              {confirmPasswordError &&
                touchedFields.confirmPassword && (

                  <div
                    className="
                      flex
                      items-center
                      text-red-600
                      text-sm
                      mt-1
                    "
                  >

                    <IoMdInformationCircleOutline />

                    <p className="ml-1">
                      {confirmPasswordError}
                    </p>

                  </div>

                )}

            </div>


            {/* ==========================================
                PASSWORD MATCH ERROR
            =========================================== */}

            <div className="space-y-1">

              {fullPasswordError && (

                <div
                  className="
                    flex
                    items-center
                    text-red-600
                    text-sm
                    gap-0.5
                  "
                >

                  <IoMdInformationCircleOutline />

                  <p>
                    {fullPasswordError}
                  </p>

                </div>

              )}


              {/* Firebase error */}

              


              {/* Email verification */}

              {verificationError && (

                <div
                  className="
                    flex
                    items-center
                    text-blue-600
                    text-sm
                    gap-0.5
                  "
                  role="status"
                >

                  <IoMdInformationCircleOutline />

                  <p>
                    {verificationError}
                  </p>

                </div>

              )}

            </div>


            {/* ==========================================
                PASSWORD REQUIREMENTS
            =========================================== */}

            <div
              className="
                text-sm
                text-gray-600
                pt-2
              "
            >

              <p className="font-medium mb-1">
                Password must contain:
              </p>


              <ul
                className="
                  list-disc
                  list-inside
                  space-y-1
                "
              >

                {passwordRequirements.map(
                  (requirement) => (

                    <li
                      key={requirement.label}
                      className={
                        password &&
                        requirement.valid
                          ? "text-green-600"
                          : ""
                      }
                    >
                      {password &&
                      requirement.valid
                        ? "✓ "
                        : ""}
                      {requirement.label}
                    </li>

                  )
                )}

              </ul>

            </div>


            {/* ==========================================
                SIGN UP BUTTON
            =========================================== */}

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
                  ? "Creating Account..."
                  : "Sign Up"}

              </button>

            </div>

          </form>


          {/* ==========================================
              OR
          =========================================== */}

          <div
            className="
              flex
              items-center
              gap-3
              mt-4
            "
          >

            <div
              className="
                flex-1
                border-t
                border-gray-300
              "
            />

            <p className="text-sm text-gray-500">
              or
            </p>

            <div
              className="
                flex-1
                border-t
                border-gray-300
              "
            />

          </div>


          {/* ==========================================
              GOOGLE SIGN UP
          =========================================== */}

          <div className="flex flex-col mt-2">

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
                  ? "CREATING ACCOUNT..."
                  : "CONTINUE WITH GOOGLE"}
              </span>

            </button>

          </div>


          {/* ==========================================
              SIGN IN
          =========================================== */}

          <div
            className="
              flex
              flex-col
              text-sm
              text-center
              mt-4
            "
          >

            <p className="text-gray-400">

              Already have an account?{" "}

              <button
                type="button"
                onClick={() => {
                  if (!submitting) {
                    nav("/login");
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
                Sign In
              </button>

            </p>

          </div>

        </div>

      </div>

    </section>

  );
};
