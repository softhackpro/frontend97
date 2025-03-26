import React from 'react';

const PairDubbleDisplay = ({
  title = "PAIR ( DUBBLE ) 1:4",
  minMax = "Min/Max: 100 - 100000",
  playerA = { name: "PLAYER A ( PAIR )", value: "4", amount: "500000" },
  playerB = { name: "PLAYER B ( PAIR )", value: "4", amount: "489900" },
  status = "SUSPENDED",
  className = ""
}) => {
  return (
    <div className={`w-full max-w-2xl border border-gray-400 rounded overflow-hidden shadow-md ${className}`}>
      {/* Header */}
      <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <div className="font-bold">{title}</div>
        <div className="text-yellow-300 text-sm">{minMax}</div>
      </div>
      
      {/* Content */}
      <div className="bg-blue-50 relative">
        {/* Player Information */}
        <div className="flex justify-between px-4 py-6">
          {/* Player A */}
          <div className="text-center w-1/3">
            <div className="text-gray-500 mb-2">{playerA.name}</div>
            <div className="text-2xl font-bold">{playerA.value}</div>
            <div className="text-gray-700">{playerA.amount}</div>
          </div>
          
          {/* Center - intentionally empty */}
          <div className="w-1/3"></div>
          
          {/* Player B */}
          <div className="text-center w-1/3">
            <div className="text-gray-500 mb-2">{playerB.name}</div>
            <div className="text-2xl font-bold">{playerB.value}</div>
            <div className="text-gray-700">{playerB.amount}</div>
          </div>
        </div>
        
        {/* Suspended Status */}
        {status && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-bold text-3xl text-red-500">{status}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Example usage
const PairDubbleExample = () => {
  return (
    <PairDubbleDisplay />
  );
};

export default PairDubbleDisplay;