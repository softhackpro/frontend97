import React, { useState } from 'react';
import LiveCsno from '../LiveStreaming/LiveCsno';
import LiveStreaming from '../../LiveStreaming';
import BettingPage from './Popup/BettingPage';

const Poker = ({ gmid, game }) => {
   const [ModalOpen, setModalOpen] = useState(false)
   const [betRate, setBetrate] = useState()
   const [Player, setPlayer] = useState()
   const [Type, setType] = useState()
   const setbet = (a, b, c) =>{
    // //(a, b, c, "coming");
    
      try {
        setType(a)
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
      <LiveStreaming url={"https://titan97.live/get-video/poker"} />
      <div className="w-full max-w-md mx-auto font-sans">
        {game.sub.map((item, index) => (
          <div key={index} className="mb-2">
            {/* Category Header */}
            <div className="flex items-center justify-between bg-gray-800 text-white px-2 py-1 rounded-t-md">
              <div className="font-bold">{item.nat}</div>
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-bold text-sm">i</span>
              </div>
            </div>

            {/* Player Row */}
            <div className={`flex items-stretch justify-between border-b ${index === game.sub.length - 1 ? 'rounded-b-md' : ''}`}>
              {/* Left: Player Name */}
              <div className="w-1/2 py-2 px-2 font-bold border-r text-black flex items-center">
                {item.nat}
              </div>

              {/* Right: b/bs and l/ls stacked */}
              <div className="w-1/2 flex flex-col">
                <div onClick={()=>setbet("Back", game.sub[0].b,  game.sub[0].nat )} className={`text-center py-2 ${item.gstatus === 'SUSPENDED' ? 'bg-red-400' : 'bg-blue-400'}`}>
                  <div className="font-bold">{item.b}</div>
                  <div className="text-sm">{item.bs}</div>
                </div>
                <div onClick={()=>setbet("Lay", game.sub[0].b,  game.sub[0].nat)} className={`text-center py-2 ${item.gstatus === 'SUSPENDED' ? 'bg-red-400' : 'bg-blue-400'}`}>
                  <div className="font-bold">{item.l}</div>
                  <div className="text-sm">{item.ls}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {
      ModalOpen ? (<BettingPage setisModalopen={setModalOpen} betRate={betRate} Player={Player} game={game} Type={Type}/>) : null
    }
    </>
  );
};

export default Poker;
