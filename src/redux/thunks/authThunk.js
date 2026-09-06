import { sendEmailVerification, signInWithPopup } from "firebase/auth";
import { auth } from "../../database/firebase.js";
import { provider } from "../../database/firebase.js";
import axiosInstance from "../../axios/axiosInstance.js";
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

      localStorage.setItem("access_token",response.data.accessToken);

      return response.data;

    } catch (error) {
      localStorage.removeItem("access_token");

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

       localStorage.setItem("access_token",response.data.accessToken);

      return response.data;

    } catch (error) {
    
      console.log(error.message);
      localStorage.removeItem("access_token");

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

       localStorage.setItem("access_token",response.data.accessToken);
      return response.data;
      
    } catch (error) {
       localStorage.removeItem("access_token");

      if(error.code === "auth/invalid-credential"){
        return thunkAPI.rejectWithValue("Invalid email or password");
      }

      return thunkAPI.rejectWithValue(error.message);
      
    }
  }
);


export const syncEmailVerification = createAsyncThunk(
  "auth/syncEmailVerification",
  async(_,thunkAPI) => {
        try {

          const user = auth.currentUser;


          if(!user){
            return thunkAPI.rejectWithValue("User is not logged in.");
          }

          await user.reload();

          if(!user.emailVerified){
            return thunkAPI.rejectWithValue("Email is not verified yet.");
          }
 
          // Force the firebase to return fresh token id
          const idToken = await user.getIdToken(true);

          const response = await axiosInstance.post("/auth/authenticate",idToken);

          localStorage.setItem("access_token",response.data.accessToken);

          return response.data;


          
        } catch (error) {

          return thunkAPI.rejectWithValue(error.message);
          
        }
  }
)

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_,thunkAPI) => {
        try {
          const response = await axiosInstance.get("/auth/check");

          return response.data;
          
        } catch (error) {

          return thunkAPI.rejectWithValue(
             error.response?.data?.message || "Authentication failed"
          );
          
        }
  }
)