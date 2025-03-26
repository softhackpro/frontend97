import { FaSyncAlt } from "react-icons/fa";

export default function ThemeSelector() {
  const themes = [
    ["#009FE3", "#000000"],
    ["#FDC300", "#008C8C"],
    ["#1D1B21", "#545059"],
    ["#E88F3D", "#11A38C"],
    ["#C2175B", "#000000"],
    ["#725D28", "#0C6455"],
    ["#008C8C", "#E88F3D"],
    ["#0029FF", "#FF0000"],
  ];

  return (
    <div className="w-full mt-1 border rounded-md shadow-md">
      {/* Header */}
      <div className="bg-gray-700 text-white font-bold p-3 flex justify-between items-center">
        <span>Theme</span>
        <button className="flex items-center text-white">
          Default <FaSyncAlt className="ml-2" />
        </button>
      </div>

      {/* Theme Options */}
      <div className="bg-gray-100 p-4 grid grid-cols-4 sm:grid-cols-8 gap-3 justify-center">
        {themes.map((colors, index) => (
          <div
            key={index}
            className="w-12 h-12 rounded-full border-2 border-black flex flex-col overflow-hidden"
          >
            <div className="h-1/2" style={{ backgroundColor: colors[0] }}></div>
            <div className="h-1/2" style={{ backgroundColor: colors[1] }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
