import React from "react";
import aviator from "/aviator.png";

const AviatorButton = () => (
  <div className="h-8 min-w-fit whitespace-nowrap rounded-tr-lg rounded-tl-lg ml-2 bg-black p-2 mt-2">
    <div className="flex gap-1 h-full text-base font-bold items-center scale-animation">
      <img src={aviator} className="h-6" alt="Aviator" />
      <p>Vimaan</p>
    </div>
  </div>
);

export default AviatorButton;
