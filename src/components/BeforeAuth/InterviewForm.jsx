import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link } from "react-router-dom";

import Subscription from "./Subscription";
import BlurComponent from "./BlurLoading";

export const InterviewForm = () => {
  const [userQ, setUserQ] = useState({
    instruction: "",
    difficulty: "easy",
    no_of_Q: 10,
  });
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isResumeUploaded, setResumeUploaded] = useState(null);
  const [Questions, setQuestion] = useState(null);
  const [access, setAccess] = useState(null);
  const [finalobj , setObj] = useState({})
  const [UserAnswer, setUserAnswer] = useState({
    question: [],
  });


  const [err, setErr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserQ((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAnswerChange = (index, value) => {
    setUserAnswer((prev) => {
      const updated = [...prev.question];
      updated[index] = value;
      return { question: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    try {
      setLoading(true);
      setErr("");

      const response = await axios.post(
        "https://prewell-backend-2.onrender.com/start/interview",
        userQ,
        { withCredentials: true }
      );

      setQuestion(response.data);
      setLoading(false);
      setObj["Questions"] = response?.data?.questions;
      setResumeUploaded(true);
      setAccess(true);
    } catch (error) {
      const message = error?.response?.data?.message;
      if (message === "Free limit reached. Please upgrade your plan.") {
        setResumeUploaded(true); 
        setAccess(false);
      } else {
        setAccess(false);
        setResumeUploaded(false);
      }
    } finally {
      setLoading(false);
    }
  };
  const sumitAns = () => {
    setObj["answer"] = UserAnswer
    console.log(finalobj)
  };
  if (hasSubmitted && isResumeUploaded === null) {
    return <BlurComponent />;
  }

  if (hasSubmitted && access === false) {
    return <Subscription />;
  }

  return (
    <div className="bg-[#FAF4F3] min-h-screen px-4 py-10">
      <div className="max-w-xl mx-auto">
        {/* LEFT: FORM */}
        <div className="bg-[#FAF4F3]  rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Instruct AI
          </h2>
          <p className="text-sm text-gray-500 text-center mt-2">
            Generate interview questions using AI
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Instruction */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instruction
              </label>
              <input
                type="text"
                name="instruction"
                value={userQ.instruction}
                onChange={handleChange}
                required
                placeholder="Ask about my project / skills"
                className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={userQ.difficulty}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 text-sm"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Questions
              </label>
              <select
                name="no_of_Q"
                value={userQ.no_of_Q}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-2 text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>

            {loading && <Loading />}
            {err && <p className="text-red-500 text-sm">{err}</p>}

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg"
            >
              Generate Questions
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Go back to{" "}
            <Link to="/" className="text-red-500 hover:underline">
              Home
            </Link>
          </p>
        </div>

        {/* RIGHT: RESULT / STATES */}

        <div className=" mt-4 flex items-center justify-center">
          {hasSubmitted && isResumeUploaded === false && (
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Resume Required 📄
              </h1>
              <p className="text-gray-600 mb-6">
                Please upload your resume first to continue.
              </p>
              <Link
                to="/my-account"
                className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-medium transition"
              >
                Upload Resume
              </Link>
            </div>
          )}

          {hasSubmitted && isResumeUploaded && Questions && (
            <div className=" mt-12 bg-[#FAF4F3] rounded-2xl shadow-lg p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-3">
                Interview Questions
              </h2>

              <div className="space-y-5">
                {Questions?.questions?.map((ques, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-red-500">
                        Question {index + 1}
                      </span>
                      <span className="text-xs text-gray-400">
                        AI Generated
                      </span>
                    </div>

                    <p className="text-gray-800 leading-relaxed">{ques}</p>

                    {/* Answer Input */}
                    <input
                      type="text"
                      placeholder="Type your answer here..."
                      value={UserAnswer.question[index] || ""}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <button
                  onClick={sumitAns}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg transition"
                >
                  Submit Answers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewForm;
