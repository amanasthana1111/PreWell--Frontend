import { Link } from "react-router";

import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#FAF4F3] text-gray-400 px-6 py-12 border border-black-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className=" w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl">
              <img
                src="https://i.ibb.co/9knDhnVs/Black-White-Modern-Handwriting-Design-Studio-Logo-removebg-preview.png"
                alt="Genwe Logo"
                className="w-12 h-auto object-contain filter invert"
              />
            </div>
            <span className="text-black text-lg font-semibold">Folify</span>
          </div>
          <p className="text-black">
            Built the backend & ATS checker — now it scans resumes, extracts
            keywords & gives smart suggestions instantly.
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
              <Link to={"/ats-resume-checker"}>ATS Checker</Link>
            </li>
            <li className="hover:text-red-600 transition-colors">
              {" "}
              <Link to={"/generate"}>Generate Portfolio website</Link>
            </li>
            <li className="hover:text-red-600 transition-colors">
              
              <Link to={"/how-it-works"}>How It Works</Link>
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
