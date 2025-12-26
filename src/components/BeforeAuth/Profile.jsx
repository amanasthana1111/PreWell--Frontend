import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="bg-[#0b1431] w-full py-20 px-4 text-white">
      {/* Top Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Developed by Aman asthnaa.
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          We build our platform alongside web and career experts to ensure your
          resume transforms into a portfolio that truly stands out.{" "}
        </p>
      </div>

      {/* HR Profile Card */}
      <div className="max-w-5xl mx-auto bg-[#1e2a48] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-lg">
        {/* Image */}
        <img
          src="https://avatars.githubusercontent.com/u/120777911?s=400&u=7dd231d3ccd818bbad615fa4fb67dfeb6e786bca&v=4" // replace with your own image
          alt="HR Expert"
          className="w-64 h-64 object-cover rounded-2xl"
        />

        {/* Text Content */}
        <div className=" flex-1 relative">
          <h4 className="text-2xl text-gray-400 mb-1">Aman asthana</h4>
          <h3 className="text-sm font-bold mb-4">Full stack developer</h3>
          <p className="  mb-8 text-gray-300 text-sm leading-relaxed">
            Aman Asthana is a passionate full-stack developer and product
            builder, currently a third-year student with a strong focus on
            modern web technologies. He’s the creator of Genify — an AI-powered
            platform that transforms prompts into personalized websites and
            more. Aman blends design thinking with technical skills, building
            tools that are both visually compelling and highly functional. He
            thrives at the intersection of innovation and user experience,
            aiming to help users showcase their skills with impact.
          </p>

          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/amanasthanacse" // replace with real profile
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-0 right-0 p-2 text-white bg-[#0b1431] rounded-lg hover:bg-[#253256] transition"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/amanasthana1111" // Replace with your GitHub profile
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-12 right-0 p-2 text-white bg-[#0b1431] rounded-lg hover:bg-[#253256] transition"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://x.com/dev_aman12" // Replace with your X/Twitter profile
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-24 right-0 p-2 text-white bg-[#0b1431] rounded-lg hover:bg-[#253256] transition"
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
