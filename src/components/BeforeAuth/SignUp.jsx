import axios from "axios";
import React, { useState } from "react";
import Loading from "./Loading";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [err, seterr] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", user);
    seterr(null);
    setIsDone(false);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://folify.onrender.com/api/register",
        user,
        {
          validateStatus: (status) => status >= 200 && status < 300,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setIsDone(true);
        navigate("/login");
        return;
      }

      seterr("Signup failed");
      setIsDone(false);
    } catch (error) {
      try {
        const zodString = error.response?.data?.message?.message;
        const parsed = JSON.parse(zodString);
        seterr(parsed[0].message); // "Invalid email address"
      } catch {
        seterr(error.response?.data?.message || "Signup failed");
      }
      setIsDone(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Create your account
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Start building your career with AI
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="yourusername"
              value={user.username}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={user.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={user.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            <p className="font-medium text-gray-800 mb-2">
              Signup Requirements:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <span className="font-medium">Username</span> must be unique
                (3–15 characters)
              </li>
              <li>
                <span className="font-medium">Email</span> must be in a valid
                format
              </li>
              <li>
                <span className="font-medium">Password</span> must be 4–15
                characters long
              </li>
            </ul>
          </div>

          {loading && <Loading />}
          {isDone && <p className="text-green-600 text-sm">Sign up successful</p>}
          {err && <p className="text-red-600 text-sm">{err}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-500 hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
