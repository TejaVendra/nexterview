import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged} from "firebase/auth";

import { auth } from "../database/firebase";
import {
  setUser,
  setAuthLoading,
} from "../redux/slices/authSlice.js";

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

                     await user.reload();
                    const currentUser = auth.currentUser;

                    // 🔥 Check how the user signed in
                    const isGoogleUser = currentUser.providerData.some(
                    (provider) => provider.providerId === "google.com"
                    );

                    // 🔥 For Google users, email is always verified
                    // But Firebase should already set it to true
                    const isEmailVerified = isGoogleUser ? true : currentUser.emailVerified;

                    const token = await currentUser.getIdToken(true);
                    localStorage.setItem("token", token);

                    dispatch(
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                        emailVerified: isEmailVerified, // Force true for Google
                        provider: isGoogleUser ? "google" : "email", // Track provider
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