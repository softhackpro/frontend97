import React, { useState } from 'react';
import LiveStreaming from '../../LiveStreaming';
import BettingPage from './Popup/BettingPage';
import RecentResult from '../DownSlider/RecentResult';

const Worli = ({game, gmid}) => {
   //(game, "from worli");
   
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
  const sections = [
    {
      title: 'WINNER',
      subtitle: 'Min/Max 100 - 500000',
      type: 'grid',
      items: game.sub
    },
    // {
    //   title: 'LINE',
    //   subtitle: 'Min/Max 100 - 100000',
    //   type: 'line',
    //   items: [
    //     { label: 'LINE 1', numbers: getSubsBySr([1, 2, 3, 4, 5]) },
    //     { label: 'LINE 2', numbers: getSubsBySr([6, 7, 8, 9, 10]) }
    //   ]
    // },
    // {
    //   title: 'ODD/EVEN',
    //   subtitle: 'Min/Max 100 - 100000',
    //   type: 'oddeven',
    //   items: [
    //     { label: 'ODD', numbers: getSubsBySr([1, 3, 5, 7, 9]) },
    //     { label: 'EVEN', numbers: getSubsBySr([2, 4, 6, 8, 10]) }
    //   ]
    // }
  ];

  return (
    <>
    <LiveStreaming url={"https://titan97.live/get-video/worli"} />
     <div className="w-full max-w-md mx-auto font-sans">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-4">
          {/* Header */}
          <div className="bg-gray-700 text-white font-bold p-2 rounded-t">
            {section.title}
          </div>
          
          {/* Subtitle */}
          <div className="bg-gray-200 p-2 text-right text-gray-700 font-medium">
            {section.subtitle}
          </div>
          
          {/* Content */}
          {section.type === 'grid' ? (
            <div className="grid grid-cols-5 gap-px bg-gray-200">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-blue-300 p-4 flex items-center justify-center">
                  <span onClick={()=>setbet("Back", 0.95,  "worli" )} className="text-2xl font-bold text-gray-700" style={{ textShadow: '0 1px 0 #fff' }}>
                    {item.sr}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-px bg-gray-200">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-blue-300 p-4 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-gray-700" style={{ textShadow: '0 1px 0 #fff' }}>
                    {item.label}
                  </span>
                  <span className="text-sm mt-1 text-gray-600">
                    {item.numbers}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
    <RecentResult result={"worli"} />
    {
      ModalOpen ? (<BettingPage setisModalopen={setModalOpen} betRate={betRate} Player={Player} game={game} Type={Type}/>) : null
    }
    </>
   
  );
};

export default Worli;