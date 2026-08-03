import { createSlice } from "@reduxjs/toolkit";
import { googleSignUp } from "../thunks/authThunk.js";
import { emailAndPasswordSignUp } from "../thunks/authThunk.js";


const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    authLoading: false,
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

      // ================= EMAIL =================

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
      });
  },
});

export const {
  setUser,
  setAuthLoading,
} = authSlice.actions;

export default authSlice.reducer;