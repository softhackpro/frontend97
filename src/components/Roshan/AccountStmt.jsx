import React, { useContext, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AuthContext } from "../../services/auth/auth.context";
const AccountStmt = () => {
  const { user } = useContext(AuthContext);
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const today = moment().format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(yesterday);
  const [endDate, setEndDate] = useState(today);
  const [value, setValue] = useState();
  console.log(value, "value");
  
  const handleGetStatement = async () => {
    const requestData = {
      userId: user?.user_id,
      fromdate: startDate,
      todate: endDate,
    };

    try {
      const response = await axios.post(
        "https://admin.titan97.live/Apicall/accounts",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setValue(response.data.wallet_records, "response")
      // You can update state here to show the result in UI
    } catch (error) {
      console.error("API Error:", error);
    }
  };  


  const data = [
    { sport: "Cricket", profitLoss: -39, commission: 0, profit: 50, loss: 89, money: 100 },
  ];

  return (
    <div className="flex flex-col justify-center bg-gray-100 p-4 mb-5">
      {/* Filter Section */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4 mb-6">
        <select className="w-full border border-gray-300 p-2 rounded mb-3">
          <option>Data Source</option>
          <option>LIVE DATA</option>
          <option>BACKUP DATA</option>
          <option>OLD DATA</option>
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
        <button onClick={handleGetStatement} className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
          Get Statement
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
                <th className="border border-gray-300 px-4 py-2 text-left">Date/Time</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Deposit</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Withdrawl</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Balance</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Remarks</th>
                <th className="border border-gray-300 px-4 py-2 text-left">From/To</th>
              </tr>
            </thead>
            <tbody>
              {value?.map((item, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 cursor-pointer">
                    {item.transaction_datetime}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-semibold ${
                      item.profitLoss < 0 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {item.closing_balance < 0 ? Math.abs(item.closing_balance) : 0 }
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-red-500">{item.closing_balance > 0 ? Math.abs(item.closing_balance) : 0 }</td>
                  <td className="border border-gray-300 px-4 py-2">{item.transaction_amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.done_by > 0 ? Math.abs(item.closing_balance) : 0 }</td>
                  <td className="border border-gray-300 px-4 py-2">{item.transaction_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-sm text-gray-600 mt-2 text-center">
            {/* Showing 1 to {value.length} of {value.length} entries */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStmt; 