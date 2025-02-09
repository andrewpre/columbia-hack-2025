import React from "react";

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={`text-center ${className}`}>{children}</div>;
};

export default CardContent;
