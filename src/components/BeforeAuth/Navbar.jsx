import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./context/userContext";

const Navbar = () => {
  const { isAuth, res, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(
        "https://prewell-backend-2.onrender.com/api/logout",
        { withCredentials: true }
      );

      // ✅ update frontend auth state
      logout();

      // ✅ soft redirect (NO reload)
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed. Try again.");
    }
  };

  return (
    <nav className="bg-[#FAF4F3] w-full shadow-sm py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-gray-600">
        Folify
      </Link>

      {/* Center links */}
      <ul className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
        <li><Link to="/how-it-works">How It Works</Link></li>
        <li><Link to={isAuth ? "/interview-prep" : "/login"}>Interview Prep</Link></li>
        <li><Link to={isAuth ? "/ats-resume-checker" : "/login"}>ATS Checker</Link></li>
        <li><Link to={isAuth ? "/portfolio-builder" : "/login"}>Portfolio Builder</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      {/* Right side */}
      {isAuth ? (
        <div className="flex items-center space-x-4">
          <Link
            to="/my-account"
            className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold"
          >
            {res?.username}
          </Link>

          <button
            onClick={handleLogout}
            className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link to="/sign-up" className="bg-red-500 text-white px-5 py-2 rounded-full">
            Sign Up
          </Link>
          <Link to="/login" className="bg-red-500 text-white px-5 py-2 rounded-full">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
