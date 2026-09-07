import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuth,
  emailAndPasswordSignIn,
  emailAndPasswordSignUp,
  googleSignUp,
  syncEmailVerification,
} from "../thunks/authThunk.js";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    authLoading: true,
    error: null,
  },

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    setAuthLoading(state, action) {
      state.authLoading = action.payload;
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= GOOGLE =================

      .addCase(googleSignUp.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })

      .addCase(googleSignUp.fulfilled, (state, action) => {
        state.authLoading = false;
        
        state.user = action.payload.user;
        state.error = null;
      })

      .addCase(googleSignUp.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      })

      // ================= EMAIL SIGN UP =================

      .addCase(emailAndPasswordSignUp.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })

      .addCase(emailAndPasswordSignUp.fulfilled, (state, action) => {
        state.authLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })

      .addCase(emailAndPasswordSignUp.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      })

      // ================= EMAIL SIGN IN =================

      .addCase(emailAndPasswordSignIn.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })

      .addCase(emailAndPasswordSignIn.fulfilled, (state, action) => {
        state.authLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })

      .addCase(emailAndPasswordSignIn.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      })

      // --------------- checking auth for every reload or refresh ----------
      .addCase(checkAuth.pending,(state) => {
        state.authLoading = true;
        state.error = null;
        
      })

      .addCase(checkAuth.fulfilled,(state,action) =>{
        state.authLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(checkAuth.rejected,(state,action) => {
        state.authLoading = false;
        state.error = action.payload;
      })

       .addCase(syncEmailVerification.pending,(state) => {
        state.authLoading = true;
        state.error = null;
        
      })

      .addCase(syncEmailVerification.fulfilled,(state,action) =>{
        state.authLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(syncEmailVerification.rejected,(state,action) => {
        state.authLoading = false;
        state.error = action.payload;
      })
  },
});

export const {
  setUser,
  setAuthLoading,
  clearError,
  
} = authSlice.actions;

export default authSlice.reducer;