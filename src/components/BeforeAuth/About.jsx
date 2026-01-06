
import video1 from "./assets/video1.mp4"
const About = () => {
  return (
    <section className="bg-[#FAF4F3] py-20 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 tracking-tight">
            About <span className="text-red-500">Folify</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build job-ready portfolios, prepare for interviews, and optimize
            your resume with AI — all in one platform.
          </p>
          <div className="w-24 h-1 bg-red-400 mt-4 mx-auto rounded-full" />
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Side */}
          <div className="lg:w-1/2 text-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h3>
            <p className="mb-4 leading-relaxed">
              At Folify, we believe landing a job should be skill-focused, not
              design-dependent. Our AI platform transforms your resume into a
              professional portfolio, evaluates it with ATS standards, and
              prepares you for real interviews — instantly.
            </p>

            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>AI reads and understands your resume content</li>
              <li>Generates a clean, responsive portfolio website</li>
              <li>ATS resume scanner with improvement suggestions</li>
              <li>Resume-based AI interview question generator</li>
              <li>Mock interview preparation aligned with real job roles</li>
            </ul>
          </div>

          <div className="lg:w-1/2">
            <video
              className="rounded-xl shadow-lg w-full h-auto"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
          <div>
            <h4 className="text-3xl font-bold text-red-500">100+</h4>
            <p className="text-gray-600">Portfolios Generated</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-red-500">1 min</h4>
            <p className="text-gray-600">Avg. Build Time</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-red-500">AI</h4>
            <p className="text-gray-600">Interview Preparation</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-red-500">ATS</h4>
            <p className="text-gray-600">Resume Optimization</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
