import { Link } from "react-router";
const Navbar = () => {
  return (
    <nav className="bg-[#FAF4F3] w-full shadow-sm py-4 px-6 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="text-xl font-bold text-gray-600">
          Folify
        </Link>
      </div>

      <ul className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
        <li>
          <Link to="/how-it-works" className="hover:text-red-600 transition">
            How It Works
          </Link>
        </li>
        <li>
          <Link to="/interview-prep" className="hover:text-red-600 transition">
            Interview Prep 
          </Link>
        </li>
        
        <li>
          <Link
            to="/ats-resume-checker"
            className="hover:text-red-600 transition"
          >
            ATS Checker
          </Link>
        </li>
        <li>
          <Link to="/portfolio-builder" className="hover:text-red-600 transition">
            Portfolio Builder 
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-red-600 transition">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-red-600 transition">
            About
          </Link>
        </li>
      </ul>

      {/* Right: Status + Create Portfolio Button */}
      <div className="flex items-center space-x-4">
        <Link to="/sign-up" className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-red-600 transition">
            Sign Up
          </Link>
        <Link to="/login" className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-red-600 transition">
            Login
          </Link>

      </div>
    </nav>
  );
};

export default Navbar;
