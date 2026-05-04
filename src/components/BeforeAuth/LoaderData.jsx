import React, { useState, useEffect } from "react";

const Loader = () => {
  const steps = [
    "Uploading resume to server...",
    "Parsing resume...",
    "Sending resume data to server...",
    "Server received data...",
    "Building beautiful website...",
    "Generating HTML...",
    "Generating CSS...",
    "Generating JavaScript...",
    "Linking all files...",
    "Adding logo and images...",
    "Generating preview option..."
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 14000); 
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF4F3]">
      {/* Loader animation */}
      <div className="w-12 h-12 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>
      
      {/* Loading text */}
      <p className="mt-6 text-lg font-medium text-gray-800">{steps[currentStep]}</p>

      {/* Progress */}
      <p className="mt-2 text-sm text-gray-500">
        Step {currentStep + 1} of {steps.length}
      </p>
    </div>
  );
};

export default Loader;
