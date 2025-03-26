import React from "react";

const BettingTable = () => {
    return (
      <div className="p-4 border rounded-md bg-white shadow-md">
        <div className="flex justify-between items-center border-b py-2 px-4 bg-[#3B5160] text-white font-bold">
          <span>Winner</span>
          <span>Matched € <strong>10.2K</strong></span>
        </div>
        <table className="w-full text-center text-sm border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-2 py-1 text-left">Team</th>
              <th className="px-2 py-1 bg-blue-200">Back</th>
              <th className="px-2 py-1 bg-blue-300">Back</th>
              <th className="px-2 py-1 bg-blue-400">Back</th>
              <th className="px-2 py-1 bg-red-200">Lay</th>
              <th className="px-2 py-1 bg-red-300">Lay</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Mumbai Indians Women", [2.66, 2.7, 2.72], [4, 124.68]],
              ["Delhi Capitals Women", [1.83, 1.84, 1.85], [2.12, 2.64]],
              ["Gujarat Giants Women", [1.6, 4.6, 4.7], [100, 126.35]],
              ["UP Warriorz Women", [0, 0, 0], [0, 0]],
              ["RC Bengaluru Women", [0, 0, 0], [0, 0]],
            ].map(([team, back, lay], index) => (
              <tr key={index} className="border-b">
                <td className="px-2 py-1 text-left">{team}</td>
                {back.map((odds, i) => (
                  <td key={i} className="px-2 py-1 bg-blue-200">{odds}</td>
                ))}
                {lay.map((odds, i) => (
                  <td key={i} className="px-2 py-1 bg-red-200">{odds}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default BettingTable;
  