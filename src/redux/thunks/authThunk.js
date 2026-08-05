import { sendEmailVerification, signInWithPopup } from "firebase/auth";
import { auth } from "../../database/firebase";
import { provider } from "../../database/firebase";
import axiosInstance from "../../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const googleSignUp = createAsyncThunk(
    "auth/googleSignUp",
    async (_, thunkAPI) => {

        const result = await signInWithPopup(auth, provider);

        const idToken = await result.user.getIdToken();

        const response = await axiosInstance.post(
            "/auth/authenticate",
            {
                idToken
            }
        );

        return response.data;
    }
);

export const emailAndPasswordSignUp = createAsyncThunk(
  "auth/emailAndPasswordSignUp",
  async ({ email, password }, thunkAPI) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

     

      const idToken = await result.user.getIdToken();

      const response = await axiosInstance.post(
        "/auth/authenticate",
        {
          idToken,
        }
      );
       await sendEmailVerification(auth);

      return response.data;
    } catch (error) {
      console.log(error.code);
      console.log(error.message);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);