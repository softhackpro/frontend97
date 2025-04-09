import React, { useState } from "react";
import BettingPage from "./Popup/BettingPage";

const Dtla = ({game, gmid}) => {
  //(game, "from dtla");
  const [Dtlgame, setDtlGame] = useState("Dragon")
  const [ModalOpen, setModalOpen] = useState(false)
     const [betRate, setBetrate] = useState()
     const [Player, setPlayer] = useState()
     const setbet = (a, b, c) =>{
    // //(a, b, c, "coming");
    
      try {
        setBetrate(b)
        setPlayer(c)
        setModalOpen(true)
        
      } catch (error) {
        //("error");
        setModalOpen(false)
      }
     }
  return (<>
    <div className=" bg-gray-800 p-4 rounded-md w-full text-white">
        <iframe src={`https://titan97.live/get-video/${gmid}`} frameborder="0"></iframe>
      {/* Tabs */}
      <div className="flex border-b border-gray-600">
        <button onClick={()=>setDtlGame("Dragon")} className={`flex-1 text-center py-2 ${Dtlgame === "Dragon" ? "border-b-2 border-yellow-400" : ""} `}>Dragon</button>
        <button onClick={()=>setDtlGame("Tiger")} className={`flex-1 text-center py-2 ${Dtlgame === "Tiger" ? "border-b-2 border-yellow-400" : ""} `}>Tiger</button>
        <button onClick={()=>setDtlGame("Lion")} className={`flex-1 text-center py-2 ${Dtlgame === "Lion" ? "border-b-2 border-yellow-400" : ""} `}>Lion</button>
      </div>

      {/* Betting Options */}
      <div className="mt-4 space-y-2">
        <div onClick={()=>setModalOpen(true)} className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
          <span>Winner</span>
          {
           game?.sub[0]?.gstatus === "SUSPENDED" ? <button className="bg-gray-500 px-4 py-1 rounded-md opacity-50 cursor-not-allowed">
           🔒
         </button> : <button onClick={()=>setbet(game, game.sub[0].b,  game.sub[0].nat  )} className="bg-blue-500 px-4 py-1 rounded-md">{game?.sub[0]?.b}</button>
          }
          
        </div>
        
        <div className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
          <span>Black</span>
          {
           game?.sub[1]?.gstatus === "SUSPENDED" ? <button className="bg-gray-500 px-4 py-1 rounded-md opacity-50 cursor-not-allowed">
           🔒
         </button> : <button className="bg-blue-500 px-4 py-1 rounded-md">{game?.sub[1]?.b}</button>
          }
        </div>

        <div className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
          <span>Red</span>
          {
           game?.sub[2]?.gstatus === "SUSPENDED" ? <button className="bg-gray-500 px-4 py-1 rounded-md opacity-50 cursor-not-allowed">
           🔒
         </button> : <button className="bg-blue-500 px-4 py-1 rounded-md">{game?.sub[2]?.b}</button>
          }
        </div>

        <div onClick={()=>setModalOpen(true)} className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
          <span>Odd</span>
          {
           game?.sub[3]?.gstatus === "SUSPENDED" ? <button className="bg-gray-500 px-4 py-1 rounded-md opacity-50 cursor-not-allowed">
           🔒
         </button> : <button className="bg-blue-500 px-4 py-1 rounded-md">{game?.sub[3]?.b}</button>
          }
        </div>

        <div onClick={()=>setModalOpen(true)} className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
          <span>Even</span>
          {
           game?.sub[4]?.gstatus === "SUSPENDED" ? <button className="bg-gray-500 px-4 py-1 rounded-md opacity-50 cursor-not-allowed">
           🔒
         </button> : <button className="bg-blue-500 px-4 py-1 rounded-md">{game?.sub[4]?.b}</button>
          }
        </div>
      </div>

      {/* Cards */}
      {/* <div className="mt-4 flex justify-center flex-wrap gap-1">
        {["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"].map((card, index) => (
          <div
            key={index}
            className="bg-white text-black px-3 py-1 rounded-md border border-yellow-400 text-center"
          >
            {card}
          </div>
        ))}
      </div> */}
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
      ModalOpen ? (<BettingPage setisModalopen={setModalOpen} betRate={betRate} Player={Player} game={game}/>) : null
    }
    </>
  );
};

export default Dtla;
