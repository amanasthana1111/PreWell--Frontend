import { useMemo, useState } from "react";
import axios from "axios";
import useUserAuth from "./hooks/useAuth";

const COMPARE_URL = "https://folify.onrender.com/resumes/compare";

const emptyResume = {
  file: null,
  label: "",
};

const scoreClass = (score) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

const normalizeList = (value) => (Array.isArray(value) ? value : []);

const ResumeComparer = () => {
  const isAuth = useUserAuth();
  const [resumeA, setResumeA] = useState(emptyResume);
  const [resumeB, setResumeB] = useState(emptyResume);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const winnerName = useMemo(() => {
    if (!result?.winner) return "";
    if (result.winner === "resumeA") return resumeA.label || "Resume A";
    if (result.winner === "resumeB") return resumeB.label || "Resume B";
    return result.winner;
  }, [result, resumeA.label, resumeB.label]);

  const handleFileChange = (event, setter, label) => {
    const file = event.target.files[0];
    event.target.value = "";

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF resumes are allowed.");
      return;
    }

    setError("");
    setter({ file, label: file.name || label });
  };

  const handleCompare = async () => {
    if (!resumeA.file || !resumeB.file) {
      setError("Upload both resumes before comparing.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const formData = new FormData();
      formData.append("resumeA", resumeA.file);
      formData.append("resumeB", resumeB.file);
      formData.append("jobDescription", jobDescription);

      const response = await axios.post(COMPARE_URL, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Resume comparison failed. Please try again.");
    } finally {
      setLoading(false);
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

  const resumeScores = [
    {
      key: "resumeA",
      title: resumeA.label || "Resume A",
      score: result?.resumeA?.ats_score ?? result?.resumeA?.score ?? 0,
      summary: result?.resumeA?.summary || "Upload the first resume to compare.",
      strengths: normalizeList(result?.resumeA?.strengths),
      weaknesses: normalizeList(result?.resumeA?.weaknesses),
    },
    {
      key: "resumeB",
      title: resumeB.label || "Resume B",
      score: result?.resumeB?.ats_score ?? result?.resumeB?.score ?? 0,
      summary: result?.resumeB?.summary || "Upload the second resume to compare.",
      strengths: normalizeList(result?.resumeB?.strengths),
      weaknesses: normalizeList(result?.resumeB?.weaknesses),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF4F3] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h3 className="text-sm text-red-500 font-semibold uppercase mb-2">
            Resume Comparer
          </h3>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Compare two resumes with AI.
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Upload two PDF resumes and Folify will rank which one is stronger
            for ATS, keywords, structure, readability, and job fit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            ["Resume A", resumeA, setResumeA],
            ["Resume B", resumeB, setResumeB],
          ].map(([label, resume, setter]) => (
            <div key={label} className="bg-white/70 rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{label}</h2>
              <p className="text-gray-600 mb-5">
                Select a PDF resume for comparison.
              </p>
              <label className="cursor-pointer bg-red-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-600 transition inline-block">
                Upload PDF
                <input
                  disabled={loading}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(event) => handleFileChange(event, setter, label)}
                />
              </label>
              <p className="text-sm text-gray-600 mt-4">
                {resume.file ? resume.label : "No file selected"}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white/70 rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Optional Job Description
          </h2>
          <p className="text-gray-600 mb-4">
            Paste a job description to compare both resumes against one target
            role.
          </p>
          <textarea
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste job description here..."
            className="w-full min-h-36 rounded-xl border border-red-100 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-red-300"
          />
          {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
          <button
            onClick={handleCompare}
            disabled={loading}
            className="mt-5 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-8 py-3 rounded-md shadow-md transition"
          >
            {loading ? "Comparing..." : "Compare Resumes"}
          </button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <p className="text-sm text-gray-500 uppercase font-semibold">
                Stronger Resume
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {winnerName || "Tie"}
              </h2>
              <p className="text-gray-600 mt-3">
                {result.final_verdict || result.verdict || "Comparison complete."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {resumeScores.map((resume) => (
                <div key={resume.key} className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {resume.title}
                      </h2>
                      <p className="text-gray-600 mt-1">{resume.summary}</p>
                    </div>
                    <p className={`text-4xl font-bold ${scoreClass(resume.score)}`}>
                      {resume.score}%
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-green-600 mb-2">
                        Strengths
                      </h3>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        {resume.strengths.length ? (
                          resume.strengths.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))
                        ) : (
                          <li>No strengths returned.</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-600 mb-2">
                        Weaknesses
                      </h3>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        {resume.weaknesses.length ? (
                          resume.weaknesses.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))
                        ) : (
                          <li>No weaknesses returned.</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Recommended Improvements
              </h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {normalizeList(result.recommendations).length ? (
                  result.recommendations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No recommendations returned.</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeComparer;
