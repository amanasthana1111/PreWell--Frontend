import { useEffect, useState } from "react";
import useUserAuth from "./hooks/useAuth";
import axios from "axios";
import Subscription from "./Subscription";
import { Link } from "react-router-dom";

const Ats = () => {
  const isAuth = useUserAuth();
  const [isResumeUploaded, setResumeUploaded] = useState(null);
  const [ats, setAts] = useState(null);
  const [access, setAccess] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const response = await axios.get(
          "https://prewell-backend-2.onrender.com/start/atsScanner",
          { withCredentials: true }
        );

        setResumeUploaded(true);
        setAts(response.data);
        setAccess(true);
      } catch (error) {
        const message = error?.response?.data?.message;

        if (message === "Free limit reached. Please upgrade your plan.") {
          setResumeUploaded(true);
          setAccess(false);
        } else {
          setResumeUploaded(false);
        }
      }
    };

    check();
  }, []);

  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!isAuth) return null;

  //SUBSCRIPTION PAGE
  if (access === false) {
    return (
      <div className="min-h-screen bg-[#FAF4F3] flex items-center justify-center px-4">
        <Subscription />
      </div>
    );
  }

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
            console.log({ats})
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Resume Required 📄
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Please upload your resume first to continue with the ATS scan.
            </p>

            <div className="flex justify-center">
              <Link
                to="/my-account"
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-medium transition shadow-sm"
              >
                Upload Resume
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Ats;
