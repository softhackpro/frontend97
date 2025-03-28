import React from "react";

const PasswordChangeHistory = () => {
  const data = [
    { date: "2025-03-22 14:35:46", remark: "Password Changed By Self." },
    { date: "2025-03-13 14:43:54", remark: "User Password Changed By yadav0650." },
    { date: "2025-01-11 18:43:59", remark: "Password Changed By Self." },
    { date: "2025-01-11 18:23:42", remark: "User Password Changed By yadav0650." },
  ];

  return (
    <div className="flex  justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2 text-lg font-semibold">
          Password Change History
        </div>
        <div className="p-4">
          <table className="w-full border border-gray-300 text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Date/Time</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Remark</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.remark}</td>
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

export default PasswordChangeHistory;
