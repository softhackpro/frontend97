import React, { useState } from "react";
import BettingPage from "./Popup/BettingPage";

const Dtla = ({game, gmid}) => {

  console.log(game);

  const [ModalOpen, setModalOpen] = useState(false)
  return (<>
    <div className="mb-16 bg-gray-800 p-4 rounded-md w-full text-white">
        <iframe src={`https://titan97.live/get-video/${gmid}`} frameborder="0"></iframe>
      {/* Tabs */}
      <div className="flex border-b border-gray-600">
        <button className="flex-1 text-center py-2 border-b-2 border-yellow-400">Dragon</button>
        <button className="flex-1 text-center py-2">Tiger</button>
        <button className="flex-1 text-center py-2">Lion</button>
      </div>

      {/* Betting Options */}
      <div className="mt-4 space-y-2">
        <div onClick={()=>setModalOpen(true)} className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
          <span>Winner</span>
          <button className="bg-blue-500 px-4 py-1 rounded-md">2.94</button>
        </div>
        
        <div className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
          <span>❤️♦</span>
          <button className="bg-gray-500 px-4 py-1 rounded-md opacity-50 cursor-not-allowed">
            🔒
          </button>
        </div>

        <div className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
          <span>♠♣</span>
          <button className="bg-gray-500 px-4 py-1 rounded-md opacity-50 cursor-not-allowed">
            🔒
          </button>
        </div>

        <div onClick={()=>setModalOpen(true)} className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
          <span>Odd</span>
          <button className="bg-blue-500 px-4 py-1 rounded-md">1.83</button>
        </div>

        <div onClick={()=>setModalOpen(true)} className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
          <span>Even</span>
          <button className="bg-blue-500 px-4 py-1 rounded-md">2.12</button>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-4 flex justify-center flex-wrap gap-1">
        {["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"].map((card, index) => (
          <div
            key={index}
            className="bg-white text-black px-3 py-1 rounded-md border border-yellow-400 text-center"
          >
            {card}
          </div>
        ))}
      </div>
   {/* recent details  */}
      <div className="mt-4 bg-black p-2 rounded-md flex items-center">
        <span className="text-white font-bold mr-2">Recent Result</span>
        <div className="flex gap-1">
          {["L", "T", "T", "T", "L", "T"].map((result, index) => (
            <div
              key={index}
              className={`w-6 h-6 flex items-center justify-center rounded-full text-black font-bold ${result === "L" ? "bg-yellow-400" : "bg-red-500"}`}
            >
              {result}
            </div>
          ))}
        </div>
      </div>
    </div>
    {
      ModalOpen ? (<BettingPage setisModalopen={setModalOpen}/>) : null
    }
    </>
  );
};

export default Dtla;
