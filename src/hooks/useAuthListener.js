import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged} from "firebase/auth";

import { auth } from "../database/firebase";
import {
  setUser,
  setAuthLoading,
} from "../redux/slices/authSlice";

export const useAuthListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            async (user) => {
              
                console.log(user);
                try {
                    if (!user) {
                        localStorage.removeItem("token");
                        dispatch(setUser(null));
                        return;
                    }

                    const token = await user.getIdToken();

                    localStorage.setItem("token", token);

                    dispatch(
                        setUser({
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                            photoURL: user.photoURL,
                            emailVerified: user.emailVerified,
                        })
                    );
                } catch (error) {
                    console.error("Auth error:", error);

                    localStorage.removeItem("token");
                    dispatch(setUser(null));
                } finally {
                    dispatch(setAuthLoading(false));
                }
            }
        );

        return unsubscribe;
    }, [dispatch]);
};