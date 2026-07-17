import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/sections/Navbar";
import Footer from "./components/sections/Footer";

import { Signin } from "./components/access/Signin";
import { Signup } from "./components/access/Signup";

import PrivateRoute from "./routes/PrivateRoutes";
import PublicRoute from "./routes/PublicRoutes";

import DashboardLayout from "./components/layouts/DashboardLayout";

import { useAuthListener } from "./hooks/useAuthListener";
import MockInterview from "./pages/MockInterview";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import PortfolioAnalyzer from "./pages/PortfolioAnalyzer";
import JDMatcher from "./pages/JDMatcher";
import ResumeMaker from "./pages/ResumeMaker";
import MockInterviewLayout from "./components/layouts/MockInterviewLayout";
import MockInterviewSelect from "./components/sections/MockInterviewSelect";

function App() {
  useAuthListener();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,#ECD4FF,#C0F8FF,#D6E5FF,#E9E9E9)]">
      <Navbar />

      <Routes>
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

        {/* ================= PRIVATE ROUTES ================= */}

        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            {/* Add more private routes here */}

           
            <Route
              path="/mock-interview"
              element={<MockInterview />}
            />

            <Route
              path="/resume-analysis"
              element={<ResumeAnalyzer />}
            />

            <Route
              path="/resume-maker"
              element={<ResumeMaker />}
            />

            <Route
              path="/portfolio"
              element={<PortfolioAnalyzer />}
            />

            <Route
              path="/resume-matches"
              element={<JDMatcher />}
            />
          
          </Route>
        </Route>
        <Route element={<PrivateRoute/>}>
          <Route element={<MockInterviewLayout/>}>
              <Route path="/mock-interview" element={<MockInterview/>}/>
              <Route path="/mock-interview-1" element={<MockInterviewSelect/>}/>
          </Route>
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;