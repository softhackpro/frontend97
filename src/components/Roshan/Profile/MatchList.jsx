import React from "react";

const matches = [
  { title: "Ball By Ball", status: "In-Play", date: "", icons: ["S"], statusColor: "text-red-600" },
  { title: "Women's Premier League", date: "14-02-2025 19:30", icons: [], statusColor: "text-green-600" },
  { title: "Namibia v Netherlands", date: "13-03-2025 13:00", icons: ["BM", "F", "S"] },
  { title: "India Masters v Australia Masters", date: "13-03-2025 19:30", icons: ["BM", "F", "S"] },
  { title: "Mumbai Indians W v Gujarat Giants W", date: "13-03-2025 19:30", icons: ["BM", "F", "S"] }
];

const MatchList = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
      {matches.map((match, index) => (
        <div key={index} className="border-b last:border-0 py-3 flex items-center justify-between">
          <div>
            <h3 className="text-blue-600 font-semibold flex items-center space-x-2">
              <span>{match.title}</span>
              {match.status && <span className={`text-sm font-bold ${match.statusColor}`}>{match.status}</span>}
            </h3>
            {match.date && <p className="text-gray-500 text-sm">{match.date}</p>}
          </div>
          <div className="flex space-x-2">
            {match.icons.map((icon, i) => (
              <span key={i} className="bg-blue-500 text-white text-sm px-2 py-1 rounded font-bold">{icon}</span>
            ))}
            <button className="text-gray-400 text-xl">📌</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchList;
