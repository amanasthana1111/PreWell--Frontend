import { useEffect, useState } from "react";
import useUserAuth from "./hooks/useAuth";
import axios from "axios";
import Subscription from "./Subscription";
import BlurComponent from "./BlurLoading";
import atsImage from "./assets/Resumstoportfoilo.png";

const Ats = () => {
  const isAuth = useUserAuth();
  const [isResumeUploaded, setResumeUploaded] = useState(null);
  const [ats, setAts] = useState(null);
  const [access, setAccess] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const resumeSummary = ats?.resume_summary ?? {};
  const primaryStack = Array.isArray(resumeSummary.primary_stack)
    ? resumeSummary.primary_stack
    : [];
  const sectionAnalysis = ats?.section_analysis ?? {};
  const missingSections = Array.isArray(ats?.missing_sections)
    ? ats.missing_sections
    : [];
  const keywordAnalysis = ats?.keyword_analysis ?? {};
  const matchedKeywords = Array.isArray(keywordAnalysis.matched_keywords)
    ? keywordAnalysis.matched_keywords
    : [];
  const missingKeywords = Array.isArray(keywordAnalysis.missing_keywords)
    ? keywordAnalysis.missing_keywords
    : [];
  const actionableFeedback = Array.isArray(ats?.actionable_feedback)
    ? ats.actionable_feedback
    : [];
  const resumeImprovements = ats?.resume_improvements ?? {};
  const projectBulletUpgrades = Array.isArray(
    resumeImprovements.project_bullet_upgrade
  )
    ? resumeImprovements.project_bullet_upgrade
    : [];

  const checkAtsScanner = async () => {
    try {
      const response = await axios.get(
        "https://folify.onrender.com/start/atsScanner",
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
        setAts(null);
      }
    }
  };

  useEffect(() => {
    checkAtsScanner();
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    event.target.value = "";

    if (!file) return;

    if (file.type !== "application/pdf") {
      setUploadError("Only PDF resumes are allowed.");
      return;
    }

    try {
      setUploading(true);
      setUploadError("");

      const formData = new FormData();
      formData.append("file", file);

      await axios.post("https://folify.onrender.com/resumes/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await checkAtsScanner();
    } catch (error) {
      console.error(error);
      setUploadError("Resume upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  if (!isAuth) return null;

  if (isResumeUploaded === null) {
    return <BlurComponent />;
  }

  if (access === false) {
    return <Subscription />;
  }

  return (
    <div className="min-h-screen bg-[#FAF4F3] py-10 px-4">
      <div className="max-w-6xl mx-auto bg-[#FAF4F3] rounded-2xl shadow-lg p-8 space-y-10">
        {!isResumeUploaded && (
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-sm text-red-500 font-semibold uppercase mb-2">
                ATS Scanner
              </h3>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Scan your resume for ATS performance.
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Upload your PDF resume and Folify will check structure,
                readability, keywords, missing sections, and practical
                improvements so your resume is easier for hiring systems to
                understand.
              </p>
              <ul className="text-left mb-8 space-y-2 text-gray-800">
                <li>- Scores your resume for ATS readiness</li>
                <li>- Finds missing keywords and sections</li>
                <li>- Gives clear suggestions to improve your resume</li>
              </ul>

              <div className="w-full max-w-md p-6 rounded-xl shadow-lg flex flex-col items-center gap-6 bg-white/50">
                <div className="text-center">
                  <p className="text-gray-700 font-semibold">
                    Upload your resume (PDF)
                  </p>
                  {uploadError && (
                    <p className="text-sm text-red-600 mt-2">{uploadError}</p>
                  )}
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                  <label className="cursor-pointer bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600 transition duration-300 inline-block">
                    {uploading ? "Uploading..." : "Upload PDF"}
                    <input
                      disabled={uploading}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </form>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={atsImage}
                alt="ATS scanner resume analysis"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        )}

        {isResumeUploaded && ats && (
          <>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                ATS Resume Analysis
              </h1>
              <p className="text-gray-600 mt-2">{ats.final_verdict}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                ["ATS Score", ats.ats_score],
                ["Readability", ats.readability_score],
                ["Keyword Match", ats.keyword_match_score],
                ["Section Completeness", ats.section_completeness_score],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-[#FAF4F3] rounded-xl p-4 text-center"
                >
                  <p className="text-sm text-gray-600">{label}</p>
                  <p className="text-2xl font-bold text-gray-900">{value}%</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Resume Summary</h2>
              <p>
                <strong>Profile:</strong>{" "}
                {resumeSummary.profile_type || "Not available"}
              </p>
              <p>
                <strong>Experience:</strong>{" "}
                {resumeSummary.experience_level || "Not available"}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {primaryStack.length > 0 ? (
                  primaryStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600">No primary stack returned.</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Section Analysis</h2>
              {Object.keys(sectionAnalysis).length > 0 ? (
                Object.entries(sectionAnalysis).map(([key, val]) => (
                  <div key={key} className="mb-3">
                    <h3 className="font-semibold capitalize">
                      {key.replace("_", " ")}
                    </h3>
                    <p className="text-gray-600">{val}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No section analysis returned.</p>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold text-red-600 mb-3">
                Missing Sections
              </h2>
              <div className="flex flex-wrap gap-2">
                {missingSections.length > 0 ? (
                  missingSections.map((section, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm"
                    >
                      {section}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600">No missing sections returned.</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-green-600 mb-3">
                Matched Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                {matchedKeywords.length > 0 ? (
                  matchedKeywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
                    >
                      {keyword}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600">No matched keywords returned.</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-red-600 mb-3">
                Missing Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.length > 0 ? (
                  missingKeywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm"
                    >
                      {keyword}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600">No missing keywords returned.</p>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-yellow-600 mb-3">
                Actionable Feedback
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                {actionableFeedback.length > 0 ? (
                  actionableFeedback.map((feedback, i) => (
                    <li key={i}>{feedback}</li>
                  ))
                ) : (
                  <li className="text-gray-600">No feedback returned.</li>
                )}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Resume Improvements</h2>
              <p className="text-gray-600 mb-4">
                {resumeImprovements.summary_rewrite ||
                  "No summary rewrite returned."}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                {projectBulletUpgrades.length > 0 ? (
                  projectBulletUpgrades.map((project, i) => (
                    <li key={i}>{project}</li>
                  ))
                ) : (
                  <li className="text-gray-600">
                    No project bullet upgrades returned.
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Ats;
