
import React from "react";
const HorizontalScrollMenuItem = ({ item, isActive, onClick }) => {
    const itemName = item.ename || item.name || "Unknown";
  
    return (
      <div
        onClick={onClick}
        className={`h-6 min-w-fit whitespace-nowrap flex items-center rounded-md px-1.5 py-4 ${
          isActive ? "text-white bg-gradient-to-b from-[#f60105] to-[#9c181a]" : "text-black"
        } font-bold`}
      >
        {item.icon && (
          <img
            className={`h-6 ${isActive ? "" : "invert grayscale"}`}
            src={item.icon}
            alt={itemName}
          />
        )}
        <p>{itemName}</p>
      </div>
    );
  };

  export default HorizontalScrollMenuItem;


