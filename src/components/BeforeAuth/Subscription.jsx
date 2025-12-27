import { useNavigate } from "react-router-dom";
export default function Subscription() {
    const navigate = useNavigate();

  const handleSubscribe = (plan,price) => {
    navigate("/payment", { state: { plan: plan , price: price } });

  };

  return (
    <div className="min-h-screen bg-[#FAF4F3] py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Choose Your Plan
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get ATS resume analysis, AI portfolio website, and interview
            preparation — all in one platform.
          </p>
        </div>

        {/* PRICING */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* STARTER */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Starter
            </h2>
            <p className="text-gray-600 mb-4">
              For quick resume insights
            </p>

            <p className="text-4xl font-bold text-gray-900 mb-6">
              $10
            </p>

            <ul className="space-y-3 mb-6 text-gray-700">
              <li>✔ ATS Resume Scanner (1 time)</li>
              <li>✔ AI Portfolio Website</li>
              <li>✔ AI Interview (1 session)</li>
            </ul>

            <button
              onClick={() => handleSubscribe("starter" , 10)}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-medium transition"
            >
              Get Started
            </button>
          </div>

          {/* PRO */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-red-500 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
              Most Popular
            </span>

            <h2 className="text-xl font-bold text-gray-900 mb-1 mt-4">
              Pro
            </h2>
            <p className="text-gray-600 mb-4">
              Best for active job seekers
            </p>

            <p className="text-4xl font-bold text-gray-900 mb-6">
              $20
            </p>

            <ul className="space-y-3 mb-6 text-gray-700">
              <li>✔ ATS Resume Scanner (2 times)</li>
              <li>✔ AI Portfolio Website</li>
              <li>✔ AI Interview (2 sessions)</li>
            </ul>

            <button
              onClick={() => handleSubscribe("pro" ,20)}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-medium transition"
            >
              Upgrade to Pro
            </button>
          </div>

          {/* PREMIUM */}
          <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Premium
            </h2>
            <p className="text-gray-600 mb-4">
              Maximum interview success
            </p>

            <p className="text-4xl font-bold text-gray-900 mb-6">
              $30
            </p>

            <ul className="space-y-3 mb-6 text-gray-700">
              <li>✔ ATS Resume Scanner (3 times)</li>
              <li>✔ AI Portfolio Website</li>
              <li>✔ AI Interview (3 sessions)</li>
            </ul>

            <button
              onClick={() => handleSubscribe("premium",30)}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-medium transition"
            >
              Go Premium
            </button>
          </div>

        </div>

        {/* FOOTER */}
        <p className="text-center text-gray-500 text-sm mt-12">
          Secure payments • Instant access • Cancel anytime
        </p>

      </div>
    </div>
  );
}
