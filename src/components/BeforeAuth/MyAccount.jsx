import React from "react";
import { useAuth } from "./context/userContext";
import useUserAuth from "./hooks/useAuth"; // protect route

function MyAccount() {
  useUserAuth(); // redirect if not logged in

  const { isAuth, res } = useAuth();
  const user = res;

  // while auth is checking
  if (isAuth === null) {
    return <div className="p-6 text-center">Loading...</div>;
  }

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
