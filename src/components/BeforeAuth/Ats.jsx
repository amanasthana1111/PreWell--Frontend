import { useEffect, useState } from "react";
import useUserAuth from "./hooks/useAuth";
import axios from "axios";

const Ats = () => {
  const isAuth = useUserAuth();
  const [isResumeUploaded, setResumeUploaded] = useState(null);
  const [ats, setAts] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const response = await axios.get(
          "https://prewell-backend-2.onrender.com/start/atsScanner",
          { withCredentials: true }
        );
        setResumeUploaded(true);
        setAts(response.data);
      } catch (error) {
        setResumeUploaded(false);
      }
    };
    check();
  }, []);

  const handleResponse = () => {
    console.log("Start ATS Scan clicked");
    // later you can navigate or start scan
  };

  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!isAuth) return null;

  return (
    <div className="min-h-screen bg-[#FAF4F3] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {isResumeUploaded ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              ATS Scanner Ready ✅
            </h1>
            <p className="text-gray-600 mb-6">
              Your resume is uploaded successfully. You can now analyze your
              resume against ATS filters.
            </p>

            <button
              onClick={handleResponse}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-medium transition"
            >
              Start ATS Scan
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Resume Required 📄
            </h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Please upload your resume first.
              <br />
              Click on your <span className="font-semibold">username</span>,
              upload your resume, submit it, and then retry.
            </p>

            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
              Resume not found for ATS scanning
            </div>
          </>
        )}

        {/* FREE LIMIT MESSAGE */}
        {ats?.message === "Free limit reached. Please upgrade your plan." && (
          <div className="mt-6 bg-yellow-50 border border-yellow-300 text-yellow-700 rounded-lg px-4 py-3 text-sm">
            ⚠️ Free limit reached. Please upgrade your plan to continue.
          </div>
        )}
      </div>
    </div>
  );
};

export default Ats;
