import React, { useState } from "react";

const ProfitLoss = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const data = [
    { sport: "Cricket", profitLoss: -39, commission: 0, profit: 50, loss: 89, money: 100 },
  ];

  return (
    <div className="flex flex-col justify-center  bg-gray-100 p-4">
      {/* Filter Section */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-6">
        <select className="w-full border border-gray-300 p-2 rounded mb-3">
          <option>Data Source</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded mb-3"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded mb-3"
        />
        <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
          Get P&L
        </button>
      </div>
      {/* Table Section */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2 text-lg font-semibold">
          Profit/Loss
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Sport Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Profit/Loss</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Commission</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total P & L</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-blue-600 underline cursor-pointer">
                    {item.sport}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-semibold ${
                      item.profitLoss < 0 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {item.profitLoss}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{item.commission}</td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600">{item.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-sm text-gray-600 mt-2 text-center">
            Showing 1 to {data.length} of {data.length} entries
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;