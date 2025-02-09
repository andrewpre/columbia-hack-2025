import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`rounded-lg p-4 flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
