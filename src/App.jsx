import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/sections/Navbar";
import Footer from "./components/sections/Footer";

import { Signin } from "./components/access/Signin";
import { Signup } from "./components/access/Signup";

import PrivateRoute from "./routes/PrivateRoutes";
import PublicRoute from "./routes/PublicRoutes";
import VerifiedRoutes from "./routes/VerifiedRoutes";

import DashboardLayout from "./components/layouts/DashboardLayout";
import MockInterviewLayout from "./components/layouts/MockInterviewLayout";

import { useAuthListener } from "./hooks/useAuthListener";

import MockInterview from "./pages/MockInterview";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import PortfolioAnalyzer from "./pages/PortfolioAnalyzer";
import JDMatcher from "./pages/JDMatcher";
import ResumeMaker from "./pages/ResumeMaker";

import MockInterviewSelect from "./components/sections/MockInterviewSelect";
import BottomBar from "./components/ui/BottomBar";
import Sidebar from "./components/sections/Sidebar";

import VerificationPage from "./components/sections/VerificationPage";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
function App() {
  useAuthListener();

  const location = useLocation();
   const { user, authLoading } = useSelector((state) => state.auth);
   console.log(user)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,#ECD4FF,#C0F8FF,#D6E5FF,#E9E9E9)]">
      <Navbar />

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
          <Route element={<VerifiedRoutes />}>
              <Route
                  path="/verification"
                  element={<VerificationPage />}
              />
          </Route>
                

          {/* ================= PRIVATE ROUTES ================= */}

          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/resume-analysis" element={<ResumeAnalyzer />} />

              <Route path="/resume-maker" element={<ResumeMaker />} />

              <Route path="/portfolio" element={<PortfolioAnalyzer />} />
              <Route path="/profile" element={<Profile/>}/>
      
            <Route element={<MockInterviewLayout />}>
                <Route path="/mock-interview" element={<MockInterview />} />

                <Route
                  path="/mock-interview-1"
                  element={<MockInterviewSelect />}
                />
            
            </Route>

              <Route path="/resume-matches" element={<JDMatcher />} />
            </Route>
          </Route>

          
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;