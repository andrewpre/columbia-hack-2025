import React from "react";

interface ProgressProps {
  value: number;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, className }) => {
  return (
    <div className={`relative w-full bg-gray-300 rounded-full h-2 ${className}`}>
      <div
        className="bg-red-500 h-2 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default Progress;
