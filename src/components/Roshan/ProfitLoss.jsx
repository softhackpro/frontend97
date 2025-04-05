import React, { useContext, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../../services/auth/auth.context";
import { Link } from "react-router";
const ProfitLoss = () => {
    const { user } = useContext(AuthContext);
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const today = moment().format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(yesterday);
  const [endDate, setEndDate] = useState(today);
  const [value, setValue] = useState();
  
  const handleGetpnl = async () => {
    const requestData = {
      userId: user?.user_id,
      fromdate: startDate,
      todate: endDate,
    };

    try {
      const response = await axios.post(
        "https://admin.titan97.live/Apicall/profitlossgtype",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      setValue(response.data.profit_loss)
      // You can update state here to show the result in UI
    } catch (error) {
      console.error("API Error:", error);
    }
  };
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
        <button onClick={handleGetpnl} className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
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
              {value?.map((item, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-blue-600 underline cursor-pointer">
                  <Link to={`/ProfitLossEvent/${item.gtype_category}`}>  {item.gtype_category} </Link>
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-semibold ${
                      item.net_profit_loss < 0 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {item.profit_loss ? profit_loss : item.net_profit_loss}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{item.commission ? item.commission : 0}</td>
                  <td className="border border-gray-300 px-4 py-2 text-green-600">{item.net_profit_loss}</td>
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