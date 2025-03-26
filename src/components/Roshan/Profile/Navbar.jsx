import { FaHome, FaStopwatch, FaTrophy, FaUser } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-b from-gray-900 to-gray-700 flex justify-between items-center px-6 py-3 shadow-lg">
      <NavItem icon={<FaHome size={24} />} label="Home" />
      <NavItem icon={<FaStopwatch size={24} />} label="In-Play" />
      <div className="relative flex flex-col items-center">
        <div className="absolute -top-6 w-16 h-12 bg-gray-800 rounded-t-2xl flex justify-center items-center border-b-4 border-gray-600">
          <FaTrophy size={24} className="text-white" />
        </div>
        <NavItem icon={null} label="Sports" active />
      </div>
      <NavItem icon={<BsCoin size={24} />} label="Casino" />
      <NavItem icon={<FaUser size={24} />} label="Account" />
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div className={`flex flex-col items-center text-white ${active ? "mt-6 font-semibold" : ""}`}>
      {icon && <div className="mb-1">{icon}</div>}
      <span className="text-sm">{label}</span>
    </div>
  );
}
