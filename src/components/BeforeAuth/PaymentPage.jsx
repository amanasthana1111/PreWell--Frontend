import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  useEffect(() => {
  if (!state) {
    setTimeout(() => navigate("/subscription"), 3000);
  }
}, [state]);


  // plan details
  const plan = state?.plan || "starter";
  const price = state?.price || 10;

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    generateNumbers();
  }, []);

  const generateNumbers = () => {
    setNum1(Math.floor(Math.random() * 100) + 1);
    setNum2(Math.floor(Math.random() * 100) + 1);
    setAnswer("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(answer) === num1 + num2) {
      try {
        console.log("Payment verified for plan:", plan);
      const response = await axios.post(
        "https://prewell-backend-2.onrender.com/user/buy",
        {
          firstNo: num1,
          secondNo: num2,
          sum: parseInt(answer),
          planAmount: state?.price?.toString(),
        },
        {
          withCredentials: true,
        }
      );
      navigate("/")
      } catch (error) {
     navigate("/")
      }
    } else {
      setError("Incorrect sum. Please try again.");
      generateNumbers();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF4F3] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Complete Payment
        </h1>
        <p className="text-gray-600 mb-6">
          Verify to activate your{" "}
          <span className="font-semibold capitalize">{plan}</span> plan
        </p>

        {/* PLAN CARD */}
        <div className="bg-[#FAF4F3] rounded-xl p-4 mb-6">
          <p className="text-gray-700">
            Selected Plan:
            <span className="font-semibold ml-1 capitalize">{plan}</span>
          </p>
          <p className="text-gray-700">
            Amount:
            <span className="font-semibold ml-1">${price}</span>
          </p>
        </div>

        {/* CAPTCHA */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Solve to continue
            </label>

            <div className="flex items-center gap-3 mb-3">
              <span className="bg-white border rounded-lg px-4 py-2 text-lg font-semibold">
                {num1}
              </span>
              <span className="text-xl font-bold">+</span>
              <span className="bg-white border rounded-lg px-4 py-2 text-lg font-semibold">
                {num2}
              </span>
              <span className="text-xl font-bold">=</span>
            </div>

            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter sum"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-medium transition"
          >
            Submit & Pay
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Secure payment • Instant access
        </p>
      </div>
    </div>
  );
}
