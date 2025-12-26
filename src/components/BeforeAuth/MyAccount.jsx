import React, { useState } from "react";
import { useAuth } from "./context/userContext";

function MyAccount() {
 const { isAuth,res } = useAuth();
 const user = res

  const [resume, setResume] = useState(null);

  if (isAuth === null) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!isAuth) return null;

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handlePasswordChange = () => {
    alert("Redirect to change password page");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      {/* Profile Info */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Profile Information</h2>
        <p><strong>Username:</strong> {user?.username || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email || "N/A"}</p>
      </div>

      {/* Change Password */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Security</h2>
        <button
          onClick={handlePasswordChange}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Change Password
        </button>
      </div>

      {/* Resume Upload */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Resume</h2>
        <input
          type="file"
          accept=".pdf"
          onChange={handleResumeUpload}
          className="mb-2"
        />
        {resume && (
          <p className="text-sm text-green-600">
            Selected: {resume.name}
          </p>
        )}
      </div>

      {/* Subscription Details */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Subscription</h2>
        <p>
          <strong>Current Plan:</strong>{" "}
          <span className="text-green-600">
            {user?.plan || "Free"}
          </span>
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
