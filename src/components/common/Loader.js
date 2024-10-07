// Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 rounded-full animate-spin border-4 border-t-4 border-t-transparent border-white"></div>
        <span className="text-white font-semibold text-lg">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
