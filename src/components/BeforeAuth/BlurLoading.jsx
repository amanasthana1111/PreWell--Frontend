export default function BlurComponent() {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-sky-50 overflow-hidden">
      
      {/* Blurred background image */}
      <img
        className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
        src="https://images.unsplash.com/photo-1705909237050-7a7625b47fac"
        alt="Blurred Background"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      {/* Star loading animation */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-6xl text-red-500 animate-float">
          ☆
        </div>

        <p className="mt-4 text-gray-700 font-medium tracking-wide">
          Loading...
        </p>
      </div>

      {/* Custom animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-16px);
              opacity: 1;
            }
          }

          .animate-float {
            animation: float 1.6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
