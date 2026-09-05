import { sendEmailVerification, signInWithPopup } from "firebase/auth";
import { auth } from "../../database/firebase";
import { provider } from "../../database/firebase";
import axiosInstance from "../../axios/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword  , signInWithEmailAndPassword} from "firebase/auth";


export const googleSignUp = createAsyncThunk(
  "auth/googleSignUp",
  async (_, thunkAPI) => {
    try {
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();

      const response = await axiosInstance.post(
        "/auth/authenticate",
        {
          idToken,
        }
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refreshToken
      );

      return response.data;

    } catch (error) {
      localStorage.removeItem("refresh_token");

      return thunkAPI.rejectWithValue(error.message);
    }
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
      
      
      await sendEmailVerification(auth.currentUser);

      const idToken = await result.user.getIdToken();

      const response = await axiosInstance.post(
        "/auth/authenticate",
        {
          idToken,
        }
      );

       localStorage.setItem("refresh_token",response.data.refreshToken);



      return response.data;
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      localStorage.removeItem("refresh_token");

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const emailAndPasswordSignIn = createAsyncThunk(
  "auth/emailAndPasswordSignIn",
  async({email,password},thunkAPI) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if(!result){
        return thunkAPI.rejectWithValue("Login failed...");
      }

      const idToken = await result.user.getIdToken();

      const response = await axiosInstance.post(
        "/auth/authenticate",
        {
          idToken,
        }
      );
       localStorage.setItem("refresh_token",response.data.refreshToken);
      return response.data;
      
    } catch (error) {
       localStorage.removeItem("refresh_token");
      if(error.code == "auth/invalid-credential"){
        return thunkAPI.rejectWithValue("Invalid email or password");
      }

      return thunkAPI.rejectWithValue(error.message);
      
    }
  }
)