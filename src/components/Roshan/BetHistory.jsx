import moment from "moment";
import React, { useState } from "react";

const BetHistory = () => {
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const today = moment().format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(yesterday);
  const [endDate, setEndDate] = useState(today);

  const data = [
    { sport: "Cricket", profitLoss: -39, commission: 0, profit: 50, loss: 89, money: 100 },
  ];
  
  return (
    <div className="flex flex-col justify-center bg-gray-100 p-4">
      {/* Filter Section */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-6">
      <select
  className="w-full border border-gray-300 p-2 rounded mb-3"
  onChange={(e) => {
    const value = e.target.value;
    if (value === "yesterday") {
      const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
      setStartDate(yesterday);
    } else if (value === "oneMonthAgo") {
      const oneMonthAgo = moment().subtract(1, "months").format("YYYY-MM-DD");
      setStartDate(oneMonthAgo);
    } else if (value === "oneYearAgo") {
      const oneYearAgo = moment().subtract(1, "years").format("YYYY-MM-DD");
      setStartDate(oneYearAgo);
    }
  }}
>
  <option value="">Data Source</option>
  <option value="yesterday">Live Data</option>
  <option value="oneMonthAgo">Backup Data</option>
  <option value="oneYearAgo">Old Data</option>
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
          Get History
        </button>
      </div>
      {/* Table Section */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2 text-lg font-semibold">
         Bet History
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Sport Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Event Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Market Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Selection</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Odds Req.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Stack</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Place time</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Matched time</th>
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

export default BetHistory;