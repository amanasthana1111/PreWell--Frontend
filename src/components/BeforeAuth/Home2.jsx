import Profile from "./Profile";
import { Link } from "react-router-dom";
import img1 from "./assets/atsimg.png";
import { useAuth } from "./context/userContext";

const Home2 = () => {
  const { isAuth } = useAuth();
  return (
    <>
      <div className="bg-[#FAF4F3] py-20 px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="max-w-xl text-center lg:text-left mb-12 lg:mb-0">
          <h3 className="text-sm text-blue-600 font-semibold uppercase mb-2">
            AI Interview Preparation
          </h3>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Powered by Google’s Gemini AI
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            Prepare smarter with AI-generated interview questions, ATS resume
            insights, and portfolio building — all tailored directly from your
            resume.
          </p>

          <ul className="text-left mb-8 space-y-2 text-gray-800">
            <li>✓ AI-driven interview preparation & portfolio generation</li>
            <li>✓ Resume-based questions using real hiring patterns</li>
            <li>✓ ATS-friendly resume analysis and improvement tips</li>
          </ul>

          <Link
            to={isAuth ? "/interview-prep" : "/login"}
            className="bg-red-500 text-white px-6 py-3 rounded-md shadow hover:bg-red-600 transition"
          >
            Start AI Interview Prep
          </Link>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2025/02/google-gemini-memory-anim.gif?q=70&fit=crop&w=825&dpr=1"
            alt="OpenAI Logo"
            className="max-w-full h-auto"
          />
        </div>
      </div>
      <div className="bg-[#FAF4F3] py-20 px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2025/02/google-gemini-memory-anim.gif?q=70&fit=crop&w=825&dpr=1"
              alt="Gemini AI GIF"
              className="max-w-full h-auto rounded-lg"
            />
          </div>

          {/* Right: Text Content */}
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-sm text-blue-600 font-semibold uppercase mb-2">
              Automatic Resume to Portfolio Generator
            </h3>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              How the AI Turns Your Resume Into a Portfolio
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Use our AI-powered tool to instantly convert your resume into a
              sleek personal portfolio. It reads your resume, highlights key
              info like skills and experience, and builds a stylish site in
              seconds—no design or coding needed. Try it free and go live in
              moments.
            </p>
            <ul className="text-left mb-8 space-y-2 text-gray-800">
              <li>✓ Instantly turns your resume into a stunning portfolio</li>
              <li>✓ No code needed – just upload your resume</li>
            </ul>
            <Link
              to={isAuth ? "/portfolio-builder" : "/login"}
              className="bg-red-500 text-white px-6 py-3 rounded-md shadow hover:bg-red-600 transition"
            >
              Try Our AI-Powered Portfolio Builder
            </Link>
          </div>
        </div>
      </div>
      <Profile></Profile>
      <div className="bg-[#FAF4F3] py-20 px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="max-w-xl text-center lg:text-left mb-12 lg:mb-0">
          <h3 className="text-sm text-blue-600 font-semibold uppercase mb-2">
            Ats scanners
          </h3>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Powered by Google’s Gemini AI model.
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            ATS Checker is a smart resume analysis tool designed to boost your
            chances of landing interviews. It scans your resume like a real
            recruiter, detects the job position, and scores it for ATS
            compatibility. It highlights matched and missing keywords, provides
            personalized suggestions, and offers clear pros and cons. With ATS
            Checker, optimizing your resume becomes effortless. Try it now and
            make your resume stand out.
          </p>
          <ul className="text-left mb-8 space-y-2 text-gray-800">
            <li>✓ AI-Powered ATS Resume Scanner and Scoring Tool</li>
            <li>
              ✓ Detects job position, matched & missing keywords instantly
            </li>
            <li>
              ✓ Provides actionable suggestions to improve resume strength
            </li>
            <li>
              ✓ Highlights pros, cons, and career-tailored recommendations
            </li>
          </ul>
          <Link
            to={isAuth ? "/ats-resume-checker" : "/login"} 
            className="bg-red-500 text-white px-6 py-3 rounded-md shadow hover:bg-red-600 transition"
          >
            Try Our AI-Powered Ats Scanner
          </Link>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={img1} alt="OpenAI Logo" className="max-w-full h-auto" />
        </div>
      </div>
    </>
  );
};

export default Home2;
