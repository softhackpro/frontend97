import React, { useEffect, useState } from 'react';
import BettingPage from './Popup/BettingPage';
import RecentResult from '../DownSlider/RecentResult';

const AmarAkbarAnthony = ({ game, gmid }) => {
  const [ModalOpen, setModalOpen] = useState(false)
  const [winner, setWinner] = useState([])
  const [oddEvenData, setOddEvenData] = useState([])
  const [colorData, setColorData] = useState([])
  const [overUnderData, setOverUnderData] = useState([])
  const [player, setPlayer] = useState()
  const [betRate, setBetRate] = useState()

  // const [winnerData, setWinnerData] = useState([])
  const cardData = [
    { card: 'A', suits: ['♠', '♥'] },
    { card: '2', suits: ['♠', '♥'] },
    { card: '3', suits: ['♠', '♥'] },
    { card: '4', suits: ['♠', '♥'] },
    { card: '5', suits: ['♠', '♥'] },
    { card: '6', suits: ['♠', '♥'] },
    { card: '7', suits: ['♠', '♥'] }
  ];
  // Data for winner section
  const winnerData = [
    { name: 'AMAR', cards: 'A,2,3,4,5,6', back: '2.12', lay: '2.22', amount: '1000000' },
    { name: 'AKBAR', cards: '7,8,9,10', back: '3.15', lay: '3.35', amount: '1000000' },
    { name: 'ANTHONY', cards: 'J,Q,K', back: '4.15', lay: '4.45', amount: '1000000' }
  ];

  // Data for bottom section
  // const oddEvenData = [
  //   { type: 'ODD', odds: '1.81', color: 'bg-red-700' },
  //   { type: 'EVEN', odds: '2.12', color: 'bg-blue-600' }
  // ];

  // const colorData = [
  //   { type: '+', odds: '1.95', color: 'bg-red-700' },
  //   { type: '-', odds: '1.95', color: 'bg-blue-600' }
  // ];

  // const overUnderData = [
  //   { type: 'UNDER 7', odds: '1.98', color: 'bg-red-700' },
  //   { type: 'OVER 7', odds: '1.98', color: 'bg-blue-600' }
  // ];


  useEffect(() => {
    if (!game) {
      return
    }
    const firstFilter = ["Amar", "Akbar", "Anthony"];
    const secondFilter = ["Odd", "Even", "Red", "Black", "Under 7", "Over 7"];

    const filterData1 = game?.sub?.filter(item => firstFilter.includes(item.nat));
    setWinner(filterData1);
    const fiterData2 = game?.sub?.filter(item => secondFilter.includes(item.nat));
    setOddEvenData(fiterData2.filter(item => item.nat === "Odd" || item.nat === "Even"));
    setColorData(fiterData2.filter(item => item.nat === "Red" || item.nat === "Black"));
    setOverUnderData(fiterData2.filter(item => item.nat === "Under 7" || item.nat === "Over 7"));

  }, [game])


  const handleBet = (player, betRate) => {
    setModalOpen(true)
    setPlayer(player)
    setBetRate(betRate)
  }

  return (
    <>
      <iframe src={`https://titan97.live/get-video/${gmid}`} frameborder="0"></iframe>
      <div className="max-w-2xl mx-auto font-sans">
        {/* Header */}
        <div className="bg-slate-800 text-white p-2 font-bold">
          WINNER
        </div>

        {/* Min/Max Row */}
        <div className="grid grid-cols-3">
          <div className="bg-gray-300 text-black p-2 text-center col-span-2">
            Min/Max 100 - 100000
          </div>
          <div className="grid grid-cols-1">
            <div className="bg-blue-400 w-full p-2 text-center font-bold">Back</div>
          </div>
        </div>

        {/* Winner Rows */}
        {winner.map((item, index) => (
          <div key={index} className="grid text-black grid-cols-3 border-b border-gray-300">
            <div className="bg-white p-2 col-span-2">
              <div className="font-bold">{item.nat} </div>
            </div>
            <div className="grid grid-cols-1">

              {
                item?.gstatus === "SUSPENDED" ? (
                  <div className="bg-blue-400 p-1 text-center">
                    <div className="font-bold text-lg"> SUBSBEND </div>
                  </div>
                ) : (
                  <div onClick={() => handleBet(item?.nat, item?.b)} className="bg-blue-400 p-1 text-center">
                    <div className="font-bold text-lg">{item.b}</div>
                    <div className="text-xs">{item.bs}</div>
                  </div>
                )
              }


            </div>
          </div>
        ))}

        {/* Bottom Sections */}
        <div className="grid grid-cols-3 gap-1 mt-1">
          {/* ODD/EVEN Section */}
          <div className="border border-gray-400">
            <div className="bg-slate-800 text-white p-1 text-center font-bold">
              ODD/EVEN
            </div>
            <div className="bg-gray-300 p-1 text-black text-xs text-center">
              Min/Max100 - 100000
            </div>
            {oddEvenData.map((item, index) => (

              item?.gstatus === "SUSPENDED" ? (
                <div key={index} className={`${index === 0 ? 'bg-red-700' : 'bg-blue-600'} text-white p-2 text-center`}>
                  <div className="font-bold text-lg"> SUSPEND </div>
                </div>
              ) : (
                <div onClick={() => handleBet(item?.nat, item?.b)} key={index} className={`${index === 0 ? 'bg-red-700' : 'bg-blue-600'} text-white p-2 text-center`}>
                  <div className="font-bold">{item.nat}</div>
                  <div className="text-lg font-bold">{item.b}</div>
                  <div className="text-sm">300000</div>
                </div>
              )
            ))}
          </div>

          {/* COLOR Section */}
          <div className="border border-gray-400">
            <div className="bg-slate-800 text-white p-1 text-center font-bold">
              COLOR
            </div>
            <div className="bg-gray-300 p-1 text-black  text-xs text-center">
              Min/Max100 - 100000
            </div>
            {colorData.map((item, index) => (
             item?.gstatus === "SUSPENDED" ? (
              <div key={index} className={`${index === 0 ? 'bg-red-700' : 'bg-blue-600'} text-white p-2 text-center`}>
                <div className="font-bold text-lg"> SUBSBEND </div>
              </div>
            ) : (
              <div onClick={() => handleBet(item?.nat, item?.b)} key={index} className={`${index === 0 ? 'bg-red-700' : 'bg-blue-600'} text-white p-2 text-center`}>
                <div className="font-bold">{item.nat}</div>
                <div className="text-lg font-bold">{item.b}</div>
                <div className="text-sm">300000</div>
              </div>
            )
            ))}
          </div>

          {/* UNDER/OVER Section */}
          <div className="border border-gray-400">
            <div className="bg-slate-800 text-white p-1 text-center font-bold">
              UNDER/OVER
            </div>
            <div className="bg-gray-300 p-1 text-black  text-xs text-center">
              Min/Max100 - 100000
            </div>
            {overUnderData.map((item, index) => (
              item?.gstatus === "SUSPENDED" ? (
                <div key={index} className={`${index === 0 ? 'bg-red-700' : 'bg-blue-600'} text-white p-2 text-center`}>
                  <div className="font-bold text-lg"> SUBSBEND </div>
                </div>
              ) : (
                <div onClick={() => handleBet(item?.nat, item?.b)} key={index} className={`${index === 0 ? 'bg-red-700' : 'bg-blue-600'} text-white p-2 text-center`}>
                  <div className="font-bold">{item.nat}</div>
                  <div className="text-lg font-bold">{item.b}</div>
                  <div className="text-sm">300000</div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
      {/* <div className="max-w-md mx-auto border border-gray-400 rounded overflow-hidden"> */}
      {/* Header */}
      {/* <div className="bg-slate-800 text-white p-2 font-bold">
        CARD
      </div> */}

      {/* Min/Max and Back header row */}
      {/* <div className="grid grid-cols-2">
        <div className="bg-teal-100 p-2 text-center border-b border-gray-300">
          Min/Max 100 - 20000
        </div>
        <div className="bg-blue-400 p-2 text-center font-bold border-b border-gray-300">
          Back
        </div>
      </div> */}

      {/* Card rows */}
      {/* {cardData.map((item, index) => (
        <div key={index} className="grid grid-cols-2 border-b border-gray-300">
          <div className="p-3 flex items-center">
            <div className="font-bold text-xl mr-2">{item.card}</div>
            <div className="flex flex-col">
              <span className="text-black text-xl">{item.suits[0]}</span>
              <span className="text-red-600 text-xl">{item.suits[1]}</span>
            </div>
          </div>
          <div onClick={()=>setModalOpen(true)} className="bg-blue-400 p-2 text-center">
            <div className="font-bold">12.00</div>
            <div className="text-sm">50000</div>
          </div>
        </div>
      ))} */}
      {/* </div> */}
      <br />
      <RecentResult result={gmid} />
        <div className=' h-20'></div>
      
      {
        ModalOpen ? (<BettingPage setisModalopen={setModalOpen} game={game} Player={player} betRate={betRate} />) : null
      }
    </>

  );
};

export default AmarAkbarAnthony;