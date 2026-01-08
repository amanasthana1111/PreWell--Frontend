import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./context/userContext";
import useUserAuth from "./hooks/useAuth"; // protect route

function MyAccount() {
  useUserAuth(); // redirect if not logged in

  const { isAuth, res } = useAuth();
  const user = res;

  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);

  // while auth is checking
  if (isAuth === null) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  // File select
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    setResume(file);
  };

  // Submit resume
  const submitResume = async () => {
    if (!resume) {
      alert("Please select a resume");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", resume);

      const response = await axios.post(
        "https://folify.onrender.com/resumes/upload",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Resume uploaded successfully");
      console.log(response.data);
      setResume(null);
    } catch (error) {
      console.error(error);
      alert("Resume upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      {/* Profile Info */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Profile Information</h2>
        <p>
          <strong>Username:</strong> {user?.username || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || "N/A"}
        </p>
      </div>

      {/* Resume Upload */}
      <div className="bg-white shadow rounded-lg p-6 mb-6 w-full max-w-md flex flex-col items-center gap-6">
        <h2 className="text-lg font-semibold self-start">Resume</h2>

        <input
          type="file"
          accept=".pdf"
          onChange={handleResumeUpload}
          className="mb-2"
        />
        <div className="text-center">
          <div className="text-6xl text-red-500 mb-4">📄</div>
          <p className="text-gray-700 font-semibold">
            Upload your resume (PDF)
          </p>
        </div>

        {resume && (
          <>
            <p className="text-sm text-green-600">Selected: {resume.name}</p>

            <button
              onClick={submitResume}
              disabled={uploading}
              className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Submit"}
            </button>
          </>
        )}
      </div>

      {/* Subscription */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Subscription</h2>
        <p>
          <strong>Current Plan:</strong>{" "}
          <span className="text-green-600">{user?.plan || "Free"}</span>
        </p>

        {user?.plan === "free" && (
          <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            Upgrade Plan
          </button>
        )}
      </div>
    </div>
  );
}

export default MyAccount;
