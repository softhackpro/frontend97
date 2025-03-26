import { useState } from "react";
import { FaSignOutAlt } from 'react-icons/fa';
export default function StakeSelector() {
  const [stakes, setStakes] = useState([100, 200, 300, 500, 1000, 10000, 25000, 50000]);

  const handleInputChange = (index, value) => {
    const updatedStakes = [...stakes];
    updatedStakes[index] = value;
    setStakes(updatedStakes);
  };

  return (
    <>

    <div className="w-full mt-1 border rounded-md shadow-md">
      {/* Header */}
      <div className="bg-gray-700 text-white font-bold p-3">Stake</div>

      {/* Quick Stakes Section */}
      <div className="bg-gray-100 p-4">
        <h3 className="font-semibold text-lg mb-3">Quick Stakes</h3>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-4">
          {stakes.map((amount, index) => (
            <input
              key={index}
              type="number"
              value={amount}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="border border-blue-400 text-black font-bold w-full p-3 rounded-md shadow-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
      </div>
    </div>
    <button className="w-full bg-blue-600 text-white py-2 text-lg font-bold flex items-center justify-center space-x-2 shadow-md hover:bg-blue-700">
          <span>Save</span>
        </button>
    
        </>
  );
}
