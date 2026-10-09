import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import Navbar from "./components/sections/Navbar.jsx";
import Footer from "./components/sections/Footer.jsx";

import { Signin } from "./components/access/Signin.jsx";
import { Signup } from "./components/access/Signup.jsx";

import PrivateRoute from "./routes/PrivateRoutes.jsx";
import PublicRoute from "./routes/PublicRoutes.jsx";


import DashboardLayout from "./components/layouts/DashboardLayout.jsx";
import MockInterviewLayout from "./components/layouts/MockInterviewLayout.jsx";


import MockInterview from "./pages/MockInterview.jsx";
import ResumeAnalyzer from "./pages/ResumeAnalyzer.jsx";
import PortfolioAnalyzer from "./pages/PortfolioAnalyzer.jsx";
import JDMatcher from "./pages/JDMatcher.jsx";
import ResumeMaker from "./pages/ResumeMaker.jsx";



import VerificationPage from "./components/sections/VerificationPage.jsx";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile.jsx";
import GlobalLoader from "./components/loaders/GlobalLoader.jsx";
import VerificationRoute from "./routes/VerificationRoute.jsx";

import { useDispatch } from "react-redux";

import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { checkAuth } from "./redux/thunks/authThunk.js";

import MockInterview3 from "./components/sections/MockInterview3.jsx";
import Interview from "./pages/Interview.jsx";
import ResumeAnalysisResult from "./components/sections/ResumeAnalysisResult.jsx";
import PortfolioAnalysisResult from "./components/sections/PortfolioAnalysisResult.jsx";
import JDMatcherResult from "./components/sections/JDMatcherResult.jsx";
import ResumeMakerGuide from "./pages/ResumeMakerGuide.jsx";
import MockInterviewResult from "./components/sections/MockInterviewResult.jsx";
import NotFound from "./pages/NotFound.jsx";
import Contact from "./pages/Contact.jsx";


function App() {
  
    const location = useLocation();

    const dispatch = useDispatch();


    const { user, authLoading } = useSelector((state) => state.auth); // takes the values from the redux store 

    const isInterviewCheckPage =
        location.pathname.startsWith(
            "/mock-interview/prepare"
        );
      
        const isInterviewPage =
        location.pathname.startsWith(
            "/interview/"
        );

        const isResumeResultPage = location.pathname.startsWith("/resume-analysis/result");
        const isPortfolioResultPage = location.pathname.startsWith("/portfolio/result");
        const isResumeMatchResultPage = location.pathname.startsWith("/resume-matches/result");
        const isResumeEditorPage = location.pathname.startsWith("/resume-editor");
        const isInterviewResultPage = location.pathname.startsWith("/mock-interview/") && location.pathname.endsWith("/result");
        const hidePage = isInterviewResultPage || isInterviewPage || isInterviewCheckPage || isResumeResultPage || isPortfolioResultPage ||isResumeMatchResultPage || isResumeEditorPage;


useEffect(() => {
  dispatch(checkAuth());
}, [dispatch]);

  if(authLoading){
    return <GlobalLoader/>
  } // checking wheather the user is authenticated or not



  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,#ECD4FF,#C0F8FF,#D6E5FF,#E9E9E9)]">
      {!isResumeEditorPage && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ================= PUBLIC ROUTES ================= */}

          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
           path="*"
           element={
             <NotFound/>
           }/>
           <Route
           path="/contact"
           element={<Contact/>}/>
          <Route
          path='/loader'
          element={<GlobalLoader/>}/>

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Signin />
              </PublicRoute>
            }
          />
  

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
    
        
            <Route element={<VerificationRoute />}>
          <Route path="/verification" element={<VerificationPage />} />
        </Route>
          
                

          {/* ================= PRIVATE ROUTES ================= */}

          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/resume-analysis" element={<ResumeAnalyzer />} />
              <Route path="/resume-analysis/result" element={<ResumeAnalysisResult/>}/>

              <Route path="/resume-maker" element={<ResumeMakerGuide />} />

              <Route path="/portfolio" element={<PortfolioAnalyzer />} />
              <Route path="/portfolio/result" element={<PortfolioAnalysisResult/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/resume-editor" element={<ResumeMaker/>}/>

              <Route path="/mock-interview/:id/result" element={<MockInterviewResult/>}/>
      
            <Route element={<MockInterviewLayout />}>
                <Route path="/mock-interview" element={<MockInterview />} />
                <Route path="/mock-interview/prepare/:id" element={<MockInterview3/>}/>
                <Route path="/interview/:id" element={<Interview/>}/>


             
            
            </Route>

              <Route path="/resume-matches" element={<JDMatcher />} />
              <Route path="/resume-matches/result" element={<JDMatcherResult/>}/>
            </Route>
          </Route>

          
        </Routes>
      </AnimatePresence>

    { !hidePage &&  <Footer />}
      <ToastContainer/>
    </div>
  );
}

export default App;