import React, { useState } from "react";
import BettingPage from "./Popup/BettingPage";
import RecentResult from "../DownSlider/RecentResult";
import LiveCsno from "../LiveStreaming/LiveCsno";

const Baccarat = ({game, gmid}) => {
  
   const [ModalOpen, setModalOpen] = useState(false)
   const [betRate, setBetrate] = useState()
   const [Player, setPlayer] = useState()
   const setbet = (a, b, c) =>{
    
    try {
      setBetrate(b)
      setPlayer(c)
      setModalOpen(true)
      
    } catch (error) {
      //("error");
      setModalOpen(false)
    }
   }
  return (
    <>
    <LiveCsno game={game} gmid={gmid}/>
    {/* <iframe src={`https://titan97.live/get-video/${gmid}`} frameborder="0"></iframe> */}
    <div className="bg-gray-100 p-4 rounded-md w-full max-w-md mx-auto text-black">
      {/* Player, Tie, Banker Section */}
      <div className="flex items-center justify-between bg-red-500 text-white p-3 rounded-md shadow-md relative">
        <div className="w-1/3 text-center">
          <p className="font-bold">PLAYER</p>
          {game.sub[0].gstatus === "SUSPENDED" ? (<p className="text-lg">Suspend</p>) : <p onClick={()=>setbet(game, game.sub[0].b, "Player" )} className="text-lg">{game.sub[0].b}</p> }
          
        </div>
        <div className="w-1/3 flex justify-center">
          <div  className="bg-green-500 w-16 h-16 flex items-center justify-center rounded-full text-white font-bold text-lg border-4 border-red-500">
            <p>Tie</p>
            {game.sub[2].gstatus === "SUSPENDED" ? (<p className="text-lg">S..</p>) : <p onClick={()=>setbet(game, game.sub[2].b, "Tie")} className="text-lg">{game.sub[2].b}</p> }
          </div>
        </div>
        <div  className="w-1/3 text-center">
          <p className="font-bold">BANKER</p>
          {game.sub[1].gstatus === "SUSPENDED" ? (<p className="text-lg">Suspend</p>) : <p onClick={()=>setbet(game, game.sub[1].b, "Banker")} className="text-lg">{game.sub[1].b}</p> }
        </div>
      </div>

      {/* Player Pair & Banker Pair Section */}
      <div className="flex justify-between mt-4">
        <div  className="w-1/2 bg-red-500 text-white p-3 text-center rounded-md">
          <p className="font-bold">PLAYER PAIR</p>
          {game.sub[3].gstatus === "SUSPENDED" ? (<p className="text-lg">Suspend</p>) : <p onClick={()=>setbet(game, game.sub[3].b,"PLAYER PAIR" )} className="text-lg">{game.sub[3].b}</p> }
        </div>
        <div  className="w-1/2 bg-blue-500 text-white p-3 text-center rounded-md">
          <p className="font-bold">BANKER PAIR</p>
          {game.sub[4].gstatus === "SUSPENDED" ? (<p className="text-lg">Suspend</p>) : <p onClick={()=>setbet(game, game.sub[4].b, "BANKER PAIR")} className="text-lg">{game.sub[4].b}</p> }
        </div>
      </div>

      {/* Chips Section */}
      {/* <div className="flex justify-center gap-2 mt-4">
        {["1k", "5k", "10k", "25k", "50k", "100k", "200k"].map((chip, index) => (
          <div
            key={index}
            className="w-12 h-12 flex items-center justify-center rounded-full border-4 border-gray-300 bg-white shadow-md text-xs font-bold"
          >
            {chip}
          </div>
        ))}
      </div> */}

      {/* Recent Results Section */}
      {/* <div className="bg-black text-white p-2 mt-4 rounded-md">
        <p className="font-bold">Recent Result</p>
        <div className="flex gap-2 mt-2">
          {["P", "P", "P", "P", "B", "P"].map((result, index) => (
            <div
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                result === "P" ? "bg-blue-500" : "bg-red-500"
              }`}
            >
              {result}
            </div>
          ))}
        </div>
      </div> */}
      <br />
      <RecentResult result={"baccarat"}/>
    </div>
    {
    ModalOpen ? (<BettingPage setisModalopen={setModalOpen} betRate={betRate} Player={Player} game={game}/>) : null
  }
    </>
    
  );
};

export default Baccarat;