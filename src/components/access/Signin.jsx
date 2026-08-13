import React, { useState, useEffect } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { auth } from '../../database/firebase';
import { provider } from '../../database/firebase';
import { signInWithPopup, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { emailAndPasswordSignIn, googleSignUp } from '../../redux/thunks/authThunk';

export const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [firebaseError, setFirebaseError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resetPasswordSent, setResetPasswordSent] = useState(false);
    const [touchedFields, setTouchedFields] = useState({
        email: false,
        password: false
    });

    const nav = useNavigate();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector(state => state.auth);

    // Redirect if user is already logged in
    useEffect(() => {
        if (user) {
            nav('/dashboard');
        }
    }, [user, nav]);

    // Handle errors from Redux
    useEffect(() => {
        if (error) {
            const cleanError = getCleanErrorMessage(error);
            setFirebaseError(cleanError);
            setIsSubmitting(false);
        }
    }, [error]);

    // Helper function to clean Firebase error messages
    const getCleanErrorMessage = (error) => {
        let cleanError = error;
        if (typeof error === 'string') {
            if (error.includes('Firebase: Error')) {
                cleanError = error.replace('Firebase: Error (auth/', '').replace(').', '').replace(/[()]/g, '');
            }
        }

        const errorMap = {
            'email-already-in-use': 'This email is already registered. Please sign in instead.',
            'invalid-email': 'Please enter a valid email address.',
            'user-not-found': 'No account found with this email. Please sign up first.',
            'wrong-password': 'Incorrect password. Please try again.',
            'too-many-requests': 'Too many failed attempts. Please try again later.',
            'network-request-failed': 'Network error. Please check your connection.',
            'popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
            'popup-blocked': 'Popup was blocked. Please allow popups for this site.',
            'account-exists-with-different-credential': 'An account already exists with this email using a different sign-in method.',
            'invalid-credential': 'Invalid credentials. Please check your email and password.',
        };

        for (const [code, message] of Object.entries(errorMap)) {
            if (cleanError.includes(code)) {
                return message;
            }
        }
        return cleanError;
    };

    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        setTouchedFields(prev => ({ ...prev, email: true }));
        setFirebaseError("");
        setResetPasswordSent(false);

        if (value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setEmailError("Please enter a valid email address");
            } else {
                setEmailError("");
            }
        } else {
            setEmailError("");
        }
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        setTouchedFields(prev => ({ ...prev, password: true }));
        setFirebaseError("");

        if (value.trim()) {
            if (value.length < 6) {
                setPasswordError("Password must be at least 8 characters");
            } else {
                setPasswordError("");
            }
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setTouchedFields({
            email: true,
            password: true
        });

        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setEmailError("Email is required");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            isValid = false;
        }

        if (!password) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            isValid = false;
        }

        if (isValid && !isSubmitting) {
            try {
                setIsSubmitting(true);
                setFirebaseError("");
                
                // Use Firebase directly or dispatch Redux action
                dispatch(emailAndPasswordSignIn({auth,email,password}));
                setIsSubmitting(false);
            } catch (error) {
                console.error("Signin error:", error);
                const errorMessage = getCleanErrorMessage(error.message || error.code);
                setFirebaseError(errorMessage);
                setIsSubmitting(false);
            }
        }
    };

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            setEmailError("Please enter your email address to reset password");
            setTouchedFields(prev => ({ ...prev, email: true }));
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            setTouchedFields(prev => ({ ...prev, email: true }));
            return;
        }

        try {
            setIsSubmitting(true);
            setFirebaseError("");
            setResetPasswordSent(false);
            
            await sendPasswordResetEmail(auth, email);
            setResetPasswordSent(true);
            setFirebaseError("");
            setIsSubmitting(false);
            
        } catch (error) {
            console.error("Password reset error:", error);
            const errorMessage = getCleanErrorMessage(error.message || error.code);
            setFirebaseError(errorMessage);
            setIsSubmitting(false);
        }
    };

    const handleGoogleSubmit = async () => {
        if (isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            setFirebaseError("");
            
            dispatch(googleSignUp(auth,provider));
            
            
            setIsSubmitting(false);
         
        } catch (error) {
            console.error("Google signin error:", error);
            const errorMessage = getCleanErrorMessage(error.message || error.code);
            setFirebaseError(errorMessage);
            setIsSubmitting(false);
        }
    };

    return (
        <section className='min-h-screen bg-white/50 p-5 rounded-b-[150px] shadow-2xl'>
            <div className="flex justify-center items-center min-h-screen font-rubik">
                <div className="w-sm sm:w-md p-10 bg-white rounded-lg shadow-2xl flex flex-col">
                    <h3 className='text-3xl font-semibold'>Sign In</h3>
                    <p className='text-gray-600'>Enter your email and password to sign in.</p>

                    <div className="flex flex-col gap-4 pt-5">
                        <form onSubmit={handleSubmit} className="">
                            <div className="flex flex-col">
                                <label htmlFor="email">Email</label>
                                <input 
                                    value={email} 
                                    onChange={handleEmail} 
                                    className={`border rounded-lg p-2 outline-none ${emailError && touchedFields.email ? 'border-red-500' : ''}`} 
                                    type="email" 
                                    name='email' 
                                    disabled={isSubmitting}
                                    placeholder="Enter your email"
                                />
                                {emailError && touchedFields.email && (
                                    <div className="flex justify-left items-center text-red-600 text-sm mt-1">
                                        <IoMdInformationCircleOutline />
                                        <p className='ml-1'>{emailError}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col pt-2">
                                <div className="flex justify-between">
                                    <label htmlFor="password">Password</label>
                                    <p onClick={!isSubmitting ? handleForgotPassword : undefined} 
                                       className={`${!isSubmitting ? 'cursor-pointer hover:underline' : 'cursor-not-allowed opacity-50'}`}>
                                        <span>Forgot Password?</span>
                                    </p>
                                </div>
                                <div className="relative w-full">
                                    <input
                                        value={password}
                                        onChange={handlePassword}
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className={`w-full border rounded-lg p-2 pr-10 outline-none ${passwordError && touchedFields.password ? 'border-red-500' : ''}`}
                                        disabled={isSubmitting}
                                        placeholder="Enter your password"
                                    />
                                    {showPassword ? (
                                        <RiEyeCloseLine
                                            size={20}
                                            onClick={() => setShowPassword(false)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                        />
                                    ) : (
                                        <FaEye
                                            size={20}
                                            onClick={() => setShowPassword(true)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                        />
                                    )}
                                </div>
                                {passwordError && touchedFields.password && (
                                    <div className="flex justify-left items-center text-red-600 text-sm mt-1">
                                        <IoMdInformationCircleOutline />
                                        <p className='ml-1'>{passwordError}</p>
                                    </div>
                                )}
                            </div>

                            {/* Error Messages */}
                            <div className="space-y-1 pt-2">
                                {firebaseError && (
                                    <div className="flex justify-left items-center text-red-600 text-sm gap-0.5">
                                        <IoMdInformationCircleOutline />
                                        <p>{firebaseError}</p>
                                    </div>
                                )}
                                {resetPasswordSent && (
                                    <div className="flex justify-left items-center text-green-600 text-sm gap-0.5">
                                        <p>✓ Password reset email sent! Please check your inbox.</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col pt-3">
                                <button 
                                    type='submit' 
                                    className='bg-blue-800 p-2 text-white font-bold text-lg rounded-lg cursor-pointer hover:bg-blue-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center gap-3">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <p className="text-sm text-gray-500">or</p>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        <div className="flex flex-col">
                            <button 
                                onClick={handleGoogleSubmit} 
                                className='flex justify-center items-center p-2 border text-md text-gray-600 rounded-lg cursor-pointer gap-1 hover:bg-pink-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                disabled={isSubmitting}
                            >
                                <div><FcGoogle size={23}/></div>
                                <div>CONTINUE WITH GOOGLE</div>
                            </button>
                        </div>

                        <div className="flex flex-col text-sm text-center">
                            <p className='text-gray-400'>
                                Don't have an account? 
                                <span onClick={() => !isSubmitting && nav('/signup')} 
                                      className={`text-gray-900 font-semibold ${!isSubmitting ? 'cursor-pointer hover:underline' : 'cursor-not-allowed opacity-50'}`}>
                                    Sign Up
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}