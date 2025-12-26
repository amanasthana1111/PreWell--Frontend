import React from "react";

const Loading = () => {
  return (
    <div
      role="status"
      className="flex items-center justify-center"
    >
      <svg
        aria-hidden="true"
        className="w-10 h-10 animate-spin text-red-200 fill-red-500"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348"
          fill="currentFill"
        />
      </svg>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
