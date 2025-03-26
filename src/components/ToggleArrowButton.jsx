import React from 'react';
import { MdArrowForward, MdArrowDownward } from 'react-icons/md';

const ToggleArrowButton = ({ className, disabled = false , isDown  }) => {
 

  return (
    <button
      
      disabled={disabled}
      className={`
        flex items-center justify-center
        w-8 h-8
        rounded-md
        bg-white
        border border-gray-300
        shadow-sm
        hover:bg-gray-50
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${className}
      `}
      aria-label={isDown ? "Collapse" : "Expand"}
    >
      {isDown ? (
        <MdArrowDownward className="text-gray-600 text-xl" />
      ) : (
        <MdArrowForward className="text-gray-600 text-xl" />
      )}
    </button>
  );
};

export default ToggleArrowButton;