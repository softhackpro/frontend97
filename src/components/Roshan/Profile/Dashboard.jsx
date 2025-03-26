import { FaUser, FaHome, FaFootballBall, FaDice, FaCog } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { IoMdRefresh } from 'react-icons/io';

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col relative">
      {/* Header */}
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-gray-800 p-2 rounded-full">⚙️</div>
          <h1 className="text-lg font-bold">Bets</h1>
        </div>
        <div className="text-sm text-right">
          <p>Main PTI <span className="font-bold">0.74</span></p>
          <p>Exposure <span className="text-red-500">(0.00)</span></p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-white text-blue-900 p-2 rounded-full"><IoMdRefresh /></button>
          <button className="bg-white text-blue-900 p-2 rounded-full"><FaCog /></button>
        </div>
      </div>
      
      {/* Menu */}
      <div className="bg-white shadow-md rounded-md m-4">
        <h2 className="p-4 text-gray-700 font-bold border-b">Exchange</h2>
        <ul>
          {[
            "My Profile", "Multi Markets", "Rolling Commission", "Account Statement",
            "Bets History", "Profit & Loss", "Password History", "Activity Log"
          ].map((item, index) => (
            <li key={index} className="p-4 border-b flex justify-between items-center hover:bg-gray-200 cursor-pointer">
              {item}
              <span>▶️</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Logout Button */}
      <button className="bg-red-600 text-white font-bold py-3 mx-4 rounded flex justify-center items-center text-lg">
        LOGOUT <IoLogOut className="ml-2" />
      </button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 w-full bg-white shadow-md flex justify-around p-2 border-t">
        {[{icon: FaHome, label: "Home"}, {icon: FaFootballBall, label: "In-Play"}, {icon: FaFootballBall, label: "Sports"}, {icon: FaDice, label: "Casino"}, {icon: FaUser, label: "Account"}].map((item, index) => (
          <button key={index} className="flex flex-col items-center text-gray-700 hover:text-blue-500">
            <item.icon className="text-2xl" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
