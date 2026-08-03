import { createSlice } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../../database/firebase.js";
import { provider } from "../../database/firebase.js";
import axiosInstance from '../../axios/axiosInstance.js'
import { googleSignUp } from "../thunks/authThunk.js";
import { emailAndPasswordSignUp } from "../thunks/authThunk.js";
const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    authLoading: true,
    
  },

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    setAuthLoading(state, action) {
      state.authLoading = action.payload;
    },
  
  },
  extraReducers:(builder) =>{
    builder.addCase(
      googleSignUp.fulfilled,
      (state,action) =>{
        state.user = action.payload.user;
      }
    )
    builder.addCase(
      emailAndPasswordSignUp.fulfilled,
      (state,action) =>{
        state.user = action.payload.user;
      }
    )
  }
});

export const {
  setUser,
  setAuthLoading,
} = authSlice.actions;

export default authSlice.reducer;