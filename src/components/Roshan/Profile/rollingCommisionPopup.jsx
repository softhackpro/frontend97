import React from "react";
import { AiOutlineClose } from "react-icons/ai"

const RollingCommisionPopup =({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const commissionItems = [
      { name: "Fancy", value: 0 },
      { name: "Matka", value: "" },
      { name: "Lottery", value: "" },
      { name: "Casino", value: 0 },
      { name: "Binary", value: "" },
      { name: "Virtual", value: "" },
      { name: "Sportbook", value: 0 },
      { name: "Bookmaker", value: 0 },
    ];
  
    return (
      <div className="fixed inset-0 bg-[#00000028] bg-opacity-50 flex items-start justify-center">
        <div className="bg-white w-96 rounded-lg shadow-lg">
          <div className="bg-gray-800 text-white flex justify-between items-center p-3 rounded-t-lg">
            <span className="font-semibold">Rolling Commission</span>
            <button onClick={onClose} className="text-white">
              <AiOutlineClose size={20} />
            </button>
          </div>
          <div className="p-4 space-y-2">
            {commissionItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between border p-2 rounded text-gray-700"
              >
                <span>{item.name}</span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default RollingCommisionPopup;