import {
  sendEmailVerification,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, provider , authReady, } from "../../database/firebase.js";
import axiosInstance from "../../axios/axiosInstance.js";
import { createAsyncThunk } from "@reduxjs/toolkit";


// --------------------------------------------------
// Detect mobile device
// --------------------------------------------------

const isMobileDevice = () => {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};


// --------------------------------------------------
// Google Sign Up / Login
// --------------------------------------------------

export const googleSignUp = createAsyncThunk(
  "auth/googleSignUp",

  async (_, thunkAPI) => {
    try {

      // Mobile → Redirect
      if (isMobileDevice()) {
          await authReady;

          sessionStorage.setItem("googleRedirectPending", "true");

          await signInWithRedirect(auth, provider);

          return null;
        }

      // Desktop → Popup
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();

      const response = await axiosInstance.post(
        "/auth/authenticate",
        {
          idToken,
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.accessToken
      );

      return response.data;

    } catch (error) {

      console.error("Google authentication error:", error);

      localStorage.removeItem("access_token");

      return thunkAPI.rejectWithValue(
        error.message || "Google authentication failed."
      );
    }
  }
);


// --------------------------------------------------
// Handle Google Redirect Result
// --------------------------------------------------

export const handleGoogleRedirect = createAsyncThunk(
  "auth/handleGoogleRedirect",
  async (_, thunkAPI) => {
    try {
      await authReady;

      const redirectPending =
        sessionStorage.getItem("googleRedirectPending") === "true";

      console.log("Redirect pending:", redirectPending);

      const result = await getRedirectResult(auth);

      if (!result) {
        console.log("No redirect result found");

        if (redirectPending) {
          sessionStorage.removeItem("googleRedirectPending");
          console.error(
            "A redirect was expected, but Firebase returned no result."
          );
        }

        return null;
      }

      sessionStorage.removeItem("googleRedirectPending");

      const idToken = await result.user.getIdToken();

      const response = await axiosInstance.post(
        "/auth/authenticate",
        { idToken }
      );

      localStorage.setItem(
        "access_token",
        response.data.accessToken
      );

      return response.data;
    } catch (error) {
      console.error("Redirect authentication error:", error);

      sessionStorage.removeItem("googleRedirectPending");

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Google authentication failed"
      );
    }
  }
);

// --------------------------------------------------
// Email + Password Sign Up
// --------------------------------------------------

export const emailAndPasswordSignUp = createAsyncThunk(
  "auth/emailAndPasswordSignUp",

  async ({ email, password }, thunkAPI) => {

    try {

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(result.user);

      const idToken = await result.user.getIdToken();

      const response = await axiosInstance.post(
        "/auth/authenticate",
        {
          idToken,
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.accessToken
      );

      return response.data;

    } catch (error) {

      console.log(error.message);

      localStorage.removeItem("access_token");

      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// --------------------------------------------------
// Email + Password Sign In
// --------------------------------------------------

export const emailAndPasswordSignIn = createAsyncThunk(
  "auth/emailAndPasswordSignIn",

  async ({ email, password }, thunkAPI) => {

    try {

      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!result) {
        return thunkAPI.rejectWithValue(
          "Login failed..."
        );
      }

      const idToken = await result.user.getIdToken();

      const response = await axiosInstance.post(
        "/auth/authenticate",
        {
          idToken,
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.accessToken
      );

      return response.data;

    } catch (error) {

      localStorage.removeItem("access_token");

      if (error.code === "auth/invalid-credential") {
        return thunkAPI.rejectWithValue(
          "Invalid email or password"
        );
      }

      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// --------------------------------------------------
// Sync Email Verification
// --------------------------------------------------

export const syncEmailVerification = createAsyncThunk(
  "auth/syncEmailVerification",

  async (_, thunkAPI) => {

    try {

      // Get currently logged-in Firebase user
      const user = auth.currentUser;

      if (!user) {
        return thunkAPI.rejectWithValue(
          "User is not logged in."
        );
      }

      // Refresh Firebase user information
      await user.reload();

      // Check whether email is verified
      if (!user.emailVerified) {
        return thunkAPI.rejectWithValue(
          "Email is not verified yet."
        );
      }

      // Force Firebase to generate a fresh ID token
      const idToken = await user.getIdToken(true);

      const response = await axiosInstance.post(
        "/auth/authenticate",
        {
          idToken,
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.accessToken
      );

      return response.data;

    } catch (error) {

      console.error(
        "Email verification sync error:",
        error
      );

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to sync email verification."
      );
    }
  }
);


// --------------------------------------------------
// Check Authentication
// --------------------------------------------------

export const checkAuth = createAsyncThunk(
  "auth/check",

  async (_, thunkAPI) => {

    try {

      const response = await axiosInstance.get(
        "/auth/check"
      );

      return response.data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Authentication failed"
      );
    }
  }
);
