import React from 'react';

// Define color mappings for different result types
const resultColors = {
  A: 'bg-blue-300', // Light blue for 'A' results
  B: 'bg-pink-300',  // Pink for 'B' results
  C: 'bg-yellow-300' ,// Yellow for 'C' results
  D: 'bg-green-300' // Green for 'D' results
};

// Single result bubble component
const ResultBubble = ({ result }) => {
  const backgroundColor = resultColors[result] || 'bg-gray-300'; // Default gray if unknown type

  return (
    <div className={`${backgroundColor} w-8 h-8 rounded-full flex items-center justify-center font-bold text-black`}>
      {result}
    </div>
  );
};

// Main component
const RecentResult = ({ title = "Recent Result", results = [], className = "" }) => {
  return (
    <div className={`w-full bg-black p-2 flex items-center ${className}`}>
      {/* Title section */}
      <div className="text-white font-bold mr-4 whitespace-nowrap">
        {title}
      </div>
      
      {/* Results section */}
      <div className="flex space-x-2 overflow-x-auto py-1">
        {results.map((result, index) => (
          <ResultBubble key={index} result={result} />
        ))}
      </div>
    </div>
  );
};

// Example usage
const RecentResultExample = () => {
  // Sample data
  const sampleResults = ['A', 'B', 'C', 'B', 'B', 'C', 'B', 'A', 'B', 'C'];
  
  return <RecentResult results={sampleResults} />;
};

export default RecentResultExample;