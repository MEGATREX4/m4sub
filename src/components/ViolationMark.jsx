import React from "react";

export default function ViolationMark({ type, className = '' }) {
  const isMajor = type === "major";
  
  const label = isMajor ? "Тяжке порушення" : "Легке порушення";
      
  return (
    <span
      title={label}
      className={`
        inline-flex items-center justify-center 
        w-4 h-4 mr-1.5 
        border-2
        align-middle
        ${isMajor 
          ? "bg-red-600/20 border-red-500" 
          : "bg-yellow-600/20 border-yellow-500"
        }
        ${className}
      `}
      aria-label={label}
    >
      <span className={`w-1.5 h-1.5 ${isMajor ? "bg-red-500" : "bg-yellow-500"}`}></span>
    </span>
  );
}