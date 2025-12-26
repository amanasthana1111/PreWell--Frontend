import { Link } from "react-router";

import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useAuth } from "./context/userContext";

const Footer = () => {
  const {isAuth} = useAuth();
  return (
    <footer className="bg-[#FAF4F3] text-gray-400 px-6 py-12 border border-black-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5">
        <div>
          <div className="flex items-center gap-2 mb-4">
            
            <span className="text-black text-lg font-semibold">Folify</span>
          </div>
          <p className="text-black">
            Don’t just share your resume — optimize it for ATS, practice AI mock
          interviews, and build a professional portfolio website.
          </p>
        </div>

        <div className="w-[100px]">
          <h4 className="text-black font-semibold mb-4">Folify</h4>
          <ul className=" text-black space-y-2">
            <li className="hover:text-red-600 transition-colors">
              {" "}
              <Link to={"/"}>Home</Link>
            </li>
            <li className="hover:text-red-600 transition-colors">
              {" "}
              <Link to={"/about"}>About</Link>
            </li>
            <li className="hover:text-red-600 transition-colors">
              {" "}
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
        
        <div className="w-[200px]">
          <h4 className="text-black font-semibold mb-4">Features</h4>
          <ul className=" text-black space-y-2">
            <li className="hover:text-red-600 transition-colors">
              {" "}
              <Link to={isAuth ? "/ats-resume-checker" : "/login"}>ATS Checker</Link>
            </li>
            <li className="hover:text-red-600 transition-colors">
              {" "}
              <Link to={isAuth ? "/portfolio-builder" :"/login"}>Generate Portfolio website</Link>
            </li>
            <li className="hover:text-red-600 transition-colors">
              
              <Link to={isAuth ? "/interview-prep" :"/login"}>Interview Prep</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-black font-semibold mb-4">Connect</h4>
          <div className=" text-black flex gap-4 text-xl">
            <a
              href="https://github.com/amanasthana1111"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600"
            >
              <FaGithub />
            </a>
            <a
              href="https://x.com/dev_aman12"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/amanasthanacse/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
