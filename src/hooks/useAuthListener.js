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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(setUser(null));
        dispatch(setAuthLoading(false));

        return;
      }

      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );

      dispatch(setAuthLoading(false));
    });

    return unsubscribe;
  }, [dispatch]);
};