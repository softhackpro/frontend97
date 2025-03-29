import React from 'react';
import { useNavigate } from 'react-router';

const GameUnavailable = () => {
    const navigate = useNavigate();

  // Handle back button click
  const handleBack = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center">
        <h1 className="text-3xl font-semibold text-red-600 mb-4">Game Unavailable</h1>
        <p className="text-lg text-gray-700 mb-6">
          Sorry, the game is currently unavailable. Please check back later.
        </p>
        <div className="text-gray-500">Thank you for your patience.</div>
        <button 
          onClick={handleBack}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
      
    </div>
  );
};

export default GameUnavailable;
