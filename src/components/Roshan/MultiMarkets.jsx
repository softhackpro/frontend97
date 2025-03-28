import React from "react";

const MultiMarketsCard = () => {
  return (
    <div className="flex justify-center mt-5">
      <div className="w-80 p-4 bg-white border border-gray-300 rounded-lg shadow-md text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            {/* Placeholder for icon */}
            <span className="text-gray-500">◎</span>
          </div>
        </div>
        <p className="text-gray-700 font-semibold text-lg">
          There are currently no followed multi markets.
        </p>
        <hr className="my-2 border-gray-300" />
        <p className="text-blue-500 text-sm cursor-pointer hover:underline">
          Please add some markets from events.
        </p>
      </div>
    </div>
  );
};

export default MultiMarketsCard;