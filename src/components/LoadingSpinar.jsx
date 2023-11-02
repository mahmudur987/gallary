import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[300px]">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-16 w-16"></div>
    </div>
  );
};

export default LoadingSpinner;
