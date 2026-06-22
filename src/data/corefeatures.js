import ai_mock_interview from '../assets/core_features_svg/ai_mock_interview.svg'
import portfolio_analysis from '../assets/core_features_svg/portfolio_analysis.svg'
import resume_analysis from '../assets/core_features_svg/resume_analysis.svg'
import resume_make from '../assets/core_features_svg/resume_make.svg'
import resume_match from '../assets/core_features_svg/resume_match.svg'

export const features = [
  {
    id: 1,
    title: "AI Mock Interviews",
    description:
      "Practice realistic interviews with AI-generated questions and receive instant feedback on your answers, communication, and confidence.",
    icon:ai_mock_interview
  },
  {
    id: 2,
    title: "Resume Builder",
    description:
      "Create professional, ATS-friendly resumes with customizable templates and AI-powered content suggestions.",
    icon: resume_make,
  },
  {
    id: 3,
    title: "Resume Analyzer",
    description:
      "Get detailed insights into your resume, including strengths, weaknesses, formatting issues, and ATS compatibility.",
    icon: resume_analysis,
  },
  {
    id: 4,
    title: "Portfolio Analysis",
    description:
      "Receive expert AI feedback on your portfolio projects, design, structure, and overall presentation to employers.",
    icon:portfolio_analysis,
  },
  {
    id: 5,
    title: "Resume & JD Matcher",
    description:
      "Compare your resume against a job description and discover missing skills, keywords, and improvement opportunities.",
    icon: resume_match,
  },
 
];