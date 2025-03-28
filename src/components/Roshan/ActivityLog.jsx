import React from "react";

const ActivityLog = () => {
  const data = [
    { date: "28-03-2025 17:45:59", status: "Login Successful", ip: "49.37.25.15", isp: "ISP Provider 1", city: "New Delhi" },
    { date: "27-03-2025 20:00:47", status: "Login Successful", ip: "152.58.191.1", isp: "ISP Provider 2", city: "Mumbai" },
    { date: "27-03-2025 19:08:22", status: "Login Successful", ip: "152.56.135.8", isp: "ISP Provider 3", city: "Bangalore" },
    { date: "27-03-2025 13:49:07", status: "Login Successful", ip: "152.58.158.2", isp: "ISP Provider 4", city: "Hyderabad" },
    { date: "27-03-2025 13:47:46", status: "Login Successful", ip: "152.58.191.4", isp: "ISP Provider 5", city: "Chennai" },
    { date: "27-03-2025 13:44:02", status: "Login Failed", ip: "152.58.158.6", isp: "ISP Provider 6", city: "Kolkata" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2 text-lg font-semibold">
          Activity Log
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Login Date & Time</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Login Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">IP Address</th>
                <th className="border border-gray-300 px-4 py-2 text-left">ISP</th>
                <th className="border border-gray-300 px-4 py-2 text-left">City</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                  <td className={`border border-gray-300 px-4 py-2 font-semibold ${item.status === "Login Failed" ? "text-red-500" : "text-green-600"}`}>
                    {item.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{item.ip}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.isp}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.city}</td>
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

export default ActivityLog;
