
import useUserAuth from "./hooks/useAuth";
import interviewPic from "./assets/a.png"
import InterviewForm from "./InterviewForm";

const Interview = () => {
  const isAuth = useUserAuth();

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="bg-[#FAF4F3] py-20 px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="max-w-xl text-center lg:text-left mb-12 lg:mb-0">
          <h3 className="text-sm text-blue-600 font-semibold uppercase mb-2">
            Interview Prep
          </h3>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Powered by Google’s Gemini AI model.
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
        </div>

        {/* Right Section (Image) */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={interviewPic}
            alt="OpenAI Logo"
            className="max-w-full h-auto"
          />
        </div>
      </div>
      <InterviewForm></InterviewForm>
      
      
    </>
  );
};

export default Interview;
