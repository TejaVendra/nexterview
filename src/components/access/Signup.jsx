import React, { useState, useEffect } from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { IoMdInformationCircleOutline } from "react-icons/io";
import { auth } from '../../database/firebase'
import { provider } from '../../database/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { googleSignUp } from '../../redux/thunks/authThunk';
import { emailAndPasswordSignUp } from '../../redux/thunks/authThunk';

export const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [FullPasswordError, setFullPasswordError] = useState("");
    const [firebaseError, setFirebaseError] = useState("");
    const [verificationError, setVerificationError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touchedFields, setTouchedFields] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    });

    const nav = useNavigate();
    const dispatch = useDispatch();
    const { user, authLoading, error } = useSelector(state => state.auth);

    // Password strength validation
    const validatePasswordStrength = (password) => {
        const errors = [];
        if (password.length < 8) {
            errors.push("Password must be at least 8 characters");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain at least one uppercase letter");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("Password must contain at least one lowercase letter");
        }
        if (!/[0-9]/.test(password)) {
            errors.push("Password must contain at least one number");
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Password must contain at least one special character");
        }
        return errors;
    };

    // Redirect if user is already logged in
    useEffect(() => {
        if (user && user.emailVerified) {
            nav('/dashboard');
        }
    }, [user, nav]);

    // Handle firebase errors from redux
    useEffect(() => {
        if (error) {
            // Clean up Firebase error messages
            let cleanError = error;
            if (error.includes('Firebase: Error')) {
                cleanError = error.replace('Firebase: Error (auth/', '').replace(').', '').replace(/[()]/g, '');
            }
            
            // Map Firebase error codes to user-friendly messages
            const errorMap = {
                'email-already-in-use': 'This email is already registered. Please sign in instead.',
                'invalid-email': 'Please enter a valid email address.',
                'operation-not-allowed': 'Email/password accounts are not enabled. Please use Google sign-in.',
                'weak-password': 'Password is too weak. Please use a stronger password.',
                'user-not-found': 'No account found with this email.',
                'wrong-password': 'Incorrect password. Please try again.',
                'too-many-requests': 'Too many failed attempts. Please try again later.',
                'network-request-failed': 'Network error. Please check your connection.',
                'popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
                'popup-blocked': 'Popup was blocked. Please allow popups for this site.',
                'account-exists-with-different-credential': 'An account already exists with this email using a different sign-in method.',
            };

            // Check if cleanError matches any error code
            let userFriendlyMessage = cleanError;
            for (const [code, message] of Object.entries(errorMap)) {
                if (cleanError.includes(code)) {
                    userFriendlyMessage = message;
                    break;
                }
            }

            setFirebaseError(userFriendlyMessage);
            setIsSubmitting(false);
        }
    }, [error]);

    // Check for verification after signup
    useEffect(() => {
        if (user && !user.emailVerified && !authLoading) {
            setVerificationError("We've sent a verification email to your address. Please verify your email to continue.");
            setIsSubmitting(false);
        }
    }, [user, authLoading]);

    const handleUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
        setTouchedFields(prev => ({ ...prev, username: true }));

        if (value.trim()) {
            if (value.length < 3) {
                setUsernameError("Username must be at least 3 characters");
            } else if (value.length > 20) {
                setUsernameError("Username must be less than 20 characters");
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                setUsernameError("Username can only contain letters, numbers, and underscores");
            } else {
                setUsernameError("");
            }
        } else {
            setUsernameError("");
        }
    };

    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        setTouchedFields(prev => ({ ...prev, email: true }));

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

        if (value.trim()) {
            const strengthErrors = validatePasswordStrength(value);
            if (strengthErrors.length > 0) {
                setPasswordError(strengthErrors[0]);
            } else {
                setPasswordError("");
            }
        } else {
            setPasswordError("");
        }

        if (confirmPassword && value && value !== confirmPassword) {
            setFullPasswordError("Passwords do not match");
        } else if (confirmPassword && value && value === confirmPassword) {
            setFullPasswordError("");
        }
    };

    const handleConPassword = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setTouchedFields(prev => ({ ...prev, confirmPassword: true }));

        if (value.trim()) {
            if (password && value !== password) {
            
                setFullPasswordError("Passwords do not match");
            } else {
                setConfirmPasswordError("");
                setFullPasswordError("");
            }
        } else {
            setConfirmPasswordError("");
            setFullPasswordError("");
        }
    };

    const handleGooglesubmit = async () => {
        if (isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            setFirebaseError("");
            setVerificationError("");
            
            await dispatch(googleSignUp());

            
            if (auth.currentUser) {
                if (auth.currentUser.emailVerified) {
                    nav('/dashboard');
                }
            }
        } catch (error) {
            console.error("Google signup error:", error);
            let errorMessage = "Something went wrong. Please try again.";
            
            if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = "Sign-in popup was closed. Please try again.";
            } else if (error.code === 'auth/popup-blocked') {
                errorMessage = "Popup was blocked by your browser. Please allow popups for this site.";
            } else if (error.code === 'auth/account-exists-with-different-credential') {
                errorMessage = "An account already exists with this email using a different sign-in method.";
            } else if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already registered. Please sign in instead.";
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            setFirebaseError(errorMessage);
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setTouchedFields({
            username: true,
            email: true,
            password: true,
            confirmPassword: true
        });

        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!username.trim()) {
            setUsernameError("Username is required");
            isValid = false;
        } else if (username.length < 3) {
            setUsernameError("Username must be at least 3 characters");
            isValid = false;
        } else if (username.length > 20) {
            setUsernameError("Username must be less than 20 characters");
            isValid = false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            setUsernameError("Username can only contain letters, numbers, and underscores");
            isValid = false;
        }

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
        } else {
            const strengthErrors = validatePasswordStrength(password);
            if (strengthErrors.length > 0) {
                setPasswordError(strengthErrors[0]);
                isValid = false;
            }
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Please confirm your password");
            isValid = false;
        } else if (password && confirmPassword && password !== confirmPassword) {
            setFullPasswordError("Passwords do not match");
            isValid = false;
        }

        if (isValid && !isSubmitting) {
            try {
                setIsSubmitting(true);
                setFirebaseError("");
                setVerificationError("");

                await dispatch(emailAndPasswordSignUp({email, password}));
                setIsSubmitting(false);
                
            } catch (error) {
                console.error("Signup error:", error);
                let errorMessage = "Something went wrong. Please try again.";
                
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = "This email is already registered. Please sign in instead.";
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = "Invalid email address format.";
                } else if (error.code === 'auth/operation-not-allowed') {
                    errorMessage = "Email/password accounts are not enabled. Please use Google sign-in.";
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = "Password is too weak. Please use a stronger password.";
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                setFirebaseError(errorMessage);
                setIsSubmitting(false);
            }
        }
    };

    return (
        <section className='min-h-screen bg-white/50 pt-20 p-4 md:pt-5  md:rounded-b-[150px] shadow-2xl'>
            <div className="flex justify-center items-center min-h-screen font-rubik">
                <div className="w-sm sm:w-lg p-10 bg-white rounded-lg shadow-2xl flex flex-col">
                    <div className="">
                        <h3 className='text-3xl font-semibold'>Sign Up</h3>
                        <p className='text-gray-600'>Create your account to get started.</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-1 pt-5">
                            <div className="flex flex-col">
                                <label htmlFor="username">Username</label>
                                <input 
                                    value={username} 
                                    onChange={handleUsername} 
                                    className={`border rounded-lg p-2 outline-none ${usernameError && touchedFields.username ? 'border-red-500' : ''}`} 
                                    type="text" 
                                    name='username' 
                                    disabled={isSubmitting}
                                />
                                {usernameError && touchedFields.username && (
                                    <div className="flex justify-left items-center text-red-600 text-sm mt-1">
                                        <IoMdInformationCircleOutline />
                                        <p className='ml-1'>{usernameError}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col pt-4">
                                <label htmlFor="email">Email</label>
                                <input 
                                    value={email} 
                                    onChange={handleEmail} 
                                    className={`border rounded-lg p-2 outline-none ${emailError && touchedFields.email ? 'border-red-500' : ''}`} 
                                    type="email" 
                                    name='email' 
                                    disabled={isSubmitting}
                                />
                                {emailError && touchedFields.email && (
                                    <div className="flex justify-left items-center text-red-600 text-sm mt-1">
                                        <IoMdInformationCircleOutline />
                                        <p className='ml-1'>{emailError}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 pt-4">
                                <div className="flex flex-col flex-1">
                                    <label htmlFor="password">Password</label>
                                    <div className="relative w-full">
                                        <input
                                            value={password}
                                            onChange={handlePassword}
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className={`w-full border rounded-lg p-2 pr-10 outline-none ${passwordError && touchedFields.password ? 'border-red-500' : ''}`}
                                            disabled={isSubmitting}
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
                                  
                                </div>

                                <div className="flex flex-col flex-1 ">
                                    <label htmlFor="confirmpassword">Confirm Password</label>
                                    <div className="relative w-full">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={handleConPassword}
                                            name="confirmpassword"
                                            className={`w-full border rounded-lg p-2 pr-10 outline-none ${confirmPasswordError && touchedFields.confirmPassword ? 'border-red-500' : ''}`}
                                            disabled={isSubmitting}
                                        />
                                        {showConfirmPassword ? (
                                            <RiEyeCloseLine
                                                size={20}
                                                onClick={() => setShowConfirmPassword(false)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                            />
                                        ) : (
                                            <FaEye
                                                size={20}
                                                onClick={() => setShowConfirmPassword(true)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                            />
                                        )}
                                    </div>

                                  
                                </div>
                            </div>

                            <div className="">
                                  {passwordError && touchedFields.password && (
                                        <div className="flex justify-left items-center text-red-600 text-sm mt-1">
                                            <IoMdInformationCircleOutline />
                                            <p className='ml-1'>{passwordError}</p>
                                        </div>
                                    )}
                                    {!passwordError && password && touchedFields.password && (
                                        <div className="flex justify-left items-center text-green-600 text-sm mt-1">
                                            <p>✓ Password meets requirements</p>
                                        </div>
                                    )}
                                      {confirmPasswordError && touchedFields.confirmPassword && (
                                        <div className="flex justify-left items-center text-red-600 text-sm mt-1">
                                            <IoMdInformationCircleOutline />
                                            <p className='ml-1'>{confirmPasswordError}</p>
                                        </div>
                                    )}
                            </div>


                            <div className="space-y-1">
                                {FullPasswordError && (
                                    <div className="flex justify-left items-center text-red-600 text-sm gap-0.5">
                                        <IoMdInformationCircleOutline />
                                        <p className=''>{FullPasswordError}</p>
                                    </div>
                                )}
                                {firebaseError && (
                                    <div className="flex justify-left items-center text-red-600 text-sm gap-0.5">
                                        <IoMdInformationCircleOutline />
                                        <p className=''>{firebaseError}</p>
                                    </div>
                                )}
                                {verificationError && (
                                    <div className="flex justify-left items-center text-blue-600 text-sm gap-0.5">
                                        <IoMdInformationCircleOutline />
                                        <p className=''>{verificationError}</p>
                                    </div>
                                )}
                            </div>
                          <div className="text-sm text-gray-600">
                            <p className="font-medium mb-1">Password must contain:</p>

                            <ul className="list-disc list-inside space-y-1">
                                <li>At least one lowercase letter (a-z)</li>
                                <li>At least one uppercase letter (A-Z)</li>
                                <li>At least one number (0-9)</li>
                                <li>At least one special character (!@#$%^&* etc.)</li>
                                <li>Minimum 8 characters</li>
                            </ul>
                            </div>

                            <div className="flex flex-col pt-3">
                                <button 
                                    type='submit' 
                                    className='bg-blue-800 p-2 text-white font-bold text-lg rounded-lg cursor-pointer hover:bg-blue-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center gap-3 mt-4">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <p className="text-sm text-gray-500">or</p>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        <div className="flex flex-col mt-2">
                            <button 
                                onClick={handleGooglesubmit} 
                                className='flex justify-center items-center p-2 border text-md text-gray-600 rounded-lg cursor-pointer gap-1 hover:bg-pink-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                disabled={isSubmitting}
                            >
                                <div className=""><FcGoogle size={23}/></div>
                                <div className="">CONTINUE WITH GOOGLE</div>
                            </button>
                        </div>

                        <div className="flex flex-col text-sm text-center mt-4">
                            <p className='text-gray-400'>
                                Already have an account? 
                                <span onClick={() => !isSubmitting && nav('/login')} 
                                      className={`text-gray-900 font-semibold cursor-pointer ${!isSubmitting ? 'hover:underline' : 'opacity-50 cursor-not-allowed'}`}>
                                    Sign In
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}