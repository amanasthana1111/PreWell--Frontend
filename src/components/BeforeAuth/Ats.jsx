import { useEffect, useState } from "react";
import useUserAuth from "./hooks/useAuth";
import axios from "axios";
import Subscription from "./Subscription";
import { Link } from "react-router-dom";
import BlurComponent from "./BlurLoading";
import Graph from "./Graph";

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

  /* ---------------- AUTH STATES ---------------- */

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
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Resume Required 📄
            </h1>
            <p className="text-gray-600 mb-6">
              Please upload your resume first to continue with the ATS scan.
            </p>
            <Link
              to="/my-account"
              className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-medium transition"
            >
              Upload Resume
            </Link>
          </div>
        )}

        {isResumeUploaded && ats && (
          <>
            {/* HEADER */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                ATS Resume Analysis
              </h1>
              <p className="text-gray-600 mt-2">{ats.final_verdict}</p>
            </div>

            {/* SCORES */}
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

            {/* SUMMARY */}
            <div>
              <h2 className="text-xl font-bold mb-3">Resume Summary</h2>
              <p>
                <strong>Profile:</strong> {ats.resume_summary.profile_type}
              </p>
              <p>
                <strong>Experience:</strong>{" "}
                {ats.resume_summary.experience_level}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {ats.resume_summary.primary_stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* SECTION ANALYSIS */}
            <div>
              <h2 className="text-xl font-bold mb-3">Section Analysis</h2>
              {Object.entries(ats.section_analysis).map(([key, val]) => (
                <div key={key} className="mb-3">
                  <h3 className="font-semibold capitalize">
                    {key.replace("_", " ")}
                  </h3>
                  <p className="text-gray-600">{val}</p>
                </div>
              ))}
            </div>

            {/* MISSING SECTIONS */}
            <div>
              <h2 className="text-xl font-bold text-red-600 mb-3">
                Missing Sections
              </h2>
              <div className="flex flex-wrap gap-2">
                {ats.missing_sections.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* KEYWORDS */}
            <div>
              <h2 className="text-xl font-bold text-green-600 mb-3">
                Matched Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                {ats.keyword_analysis.matched_keywords.map((k, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-red-600 mb-3">
                Missing Keywords
              </h2>
              <div className="flex flex-wrap gap-2">
                {ats.keyword_analysis.missing_keywords.map((k, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* FEEDBACK */}
            <div>
              <h2 className="text-xl font-bold text-yellow-600 mb-3">
                Actionable Feedback
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                {ats.actionable_feedback.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            {/* IMPROVEMENTS */}
            <div>
              <h2 className="text-xl font-bold mb-3">Resume Improvements</h2>
              <p className="text-gray-600 mb-4">
                {ats.resume_improvements.summary_rewrite}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                {ats.resume_improvements.project_bullet_upgrade.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            {/* {ats?.graph_data && (
              <Graph
                skillsChartData={Object.entries(
                  ats.graph_data.skills_distribution
                ).map(([name, value]) => ({
                  name,
                  value,
                }))}
                atsChartData={Object.entries(ats.graph_data.ats_breakdown).map(
                  ([name, value]) => ({
                    name,
                    value,
                  })
                )}
              />
            )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default Ats;
