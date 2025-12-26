import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(null);
  const [isDone, setIsDone] = useState(null);

  useEffect(() => {
  if (isDone) {
    navigate("/");
  }
}, [isDone, navigate]);

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
    try {
      setLoading(true);
      await axios.post(
        "https://prewell-backend-2.onrender.com/api/login",
        user,
        {
          withCredentials: true,
        }
      );
      setIsDone(true);
    } catch (error) {
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
          Login your account
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Start building your career with AI
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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

          {loading ? <Loading></Loading> : ""}
          {isDone ? <p className="text-green-600 text-sm" >Login Successfull</p> : ""}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Don't have account?{" "}
          <Link
            to="/sign-up"
            className="text-red-500 hover:underline cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
