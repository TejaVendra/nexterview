import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../database/firebase";
import {
  setUser,
  setAuthLoading,
} from "../redux/slices/authSlice";

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
       dispatch(setAuthLoading(true));
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

     
      console.log(user)
           if (!user) {
        dispatch(setUser(null));
        dispatch(setAuthLoading(false));

        return;
      }

      const token = await user.getIdToken();
      localStorage.setItem("token",token)
      console.log(token)
 
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified:user.emailVerified,
        })
      );

      dispatch(setAuthLoading(false));
    });

    return unsubscribe;
  }, [dispatch]);
};