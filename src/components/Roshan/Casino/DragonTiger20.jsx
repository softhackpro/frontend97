import React, { useState } from "react";
import RecentResult from "../DownSlider/RecentResult";
import BettingPage from "./Popup/BettingPage";

const DragonTiger20 = ({game, gmid}) => {
   const [ModalOpen, setModalOpen] = useState(false)
  return (
    <>
    <iframe src={`https://titan97.live/get-video/${gmid}`} frameborder="0"></iframe>
    <div className="bg-gray-200 rounded-md w-96 mx-auto text-black">
      {/* Winner Section */}
      <div className="bg-blue-200 p-4 rounded-md shadow-md text-center">
        <h2 className="font-bold text-lg uppercase">Winner</h2>
        <div className="flex justify-around mt-4">
          <div className="text-center">
            <h3 className="font-bold">DRAGON</h3>
            <div onClick={()=>setModalOpen(true)} style={{minWidth: "120px"}} className="bg-[#86b0ed] p-2 rounded-md shadow-md">
              <p className="text-lg font-bold">2</p>
              <p className="text-sm">500000</p>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-bold">TIGER</h3>
            <div onClick={()=>setModalOpen(true)} style={{minWidth: "120px"}} className="bg-[#86b0ed] p-2 rounded-md shadow-md">
              <p className="text-lg font-bold">2</p>
              <p className="text-sm">500000</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <h3  className="font-bold">TIE</h3>
          <div onClick={()=>setModalOpen(true)} style={{minWidth: "120px"}} className="bg-[#86b0ed] p-2 rounded-md shadow-md inline-block">
            <p className="text-lg font-bold">11</p>
            <p className="text-sm">500000</p>
          </div>
        </div>
      </div>

      {/* Recent Results */}
      {/* <div className="mt-4 bg-black p-2 rounded-md flex items-center">
        <span className="text-white font-bold mr-2">Recent Result</span>
        <div className="flex gap-1">
          {["T", "T", "D", "T", "T", "D"].map((result, index) => (
            <div
              key={index}
              className={`w-6 h-6 flex items-center justify-center rounded-full text-black font-bold ${
                result === "T" ? "bg-pink-400" : result === "D" ? "bg-blue-400" : "bg-yellow-400"
              }`}
            >
              {result}
            </div>
          ))}
        </div>
      </div> */}
      <br />
      <RecentResult />
    </div>
    {
    ModalOpen ? (<BettingPage setisModalopen={setModalOpen}/>) : null
  }
    </>
    
  );
};

export default DragonTiger20;
