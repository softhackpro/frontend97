import React, { useState, useRef, useEffect } from "react";
import BettingPage from "./Popup/BettingPage";
import RecentResult from "../DownSlider/RecentResult";

const Dtla = ({ game, gmid }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dragon");
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef(null);
  const [dragonData, setDragonData] = useState([]);
  const [tigerData, setTigerData] = useState([]);
  const [lionData, setLionData] = useState([]);
  const [betRate, setBetRate] = useState();

  
  const handleBetClick = (event, rate) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();

    
    // Position modal directly below the button
    const position = {
      top: buttonRect.bottom + window.scrollY,
      left: buttonRect.left + window.scrollX
    };

    setModalPosition(position);
    setModalOpen(true);
    setBetRate(rate);
  };

  // Handle click outside to close modal
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target) &&
        !event.target.classList.contains("betting-button")) {
        setModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  useEffect(() => {
    const extractAnimalsData = () => {
      const result = {
        dragon: [],
        tiger: [],
        lion: [],
      };

      game?.sub?.forEach(item => {
        const { nat } = item;

        if (nat.startsWith("Dragon") || nat.startsWith("Tiger") || nat.startsWith("Lion")) {
          return; // skip
        }

        if (nat.includes(" D")) {
          result.dragon.push(item);
        } else if (nat.includes(" T")) {
          result.tiger.push(item);
        } else if (nat.includes(" L")) {
          result.lion.push(item);
        }
      });

      setDragonData(result.dragon);
      setTigerData(result.tiger);
      setLionData(result.lion);
    };

    extractAnimalsData(); // ← Don't forget this!
  }, [game]); // Also, add `game` as a dependency if it comes from props or state


  console.log(game);
  


  const renderTabContent = () => {
    switch (activeTab) {
      case "Dragon":
        return (
          <>
            <div className="mt-4 space-y-2">
              {
                dragonData && dragonData.length && dragonData.map((item, index) => (
                  <div className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
                    <span>{item?.nat?.slice(0, -1)}</span>
                    {
                      item?.gstatus === "SUSPENDED" ? (
                        <button className="bg-gray-500 px-4 py-1 rounded-md opacity-50 cursor-not-allowed">
                          🔒
                        </button>
                      ) : (
                        <button
                          className="betting-button bg-blue-500 px-4 py-1 rounded-md"
                          onClick={ (e) =>  handleBetClick(e, item.b )}
                        >
                          {item?.b}
                        </button>
                      )
                    }
                     {/* <button
                          className="betting-button bg-blue-500 px-4 py-1 rounded-md"
                          onClick={ (e) =>  handleBetClick(e, item.b, item?.nat )}
                        >
                          {item?.b}
                        </button> */}

                  </div>
                ))
              }
            </div>
          </>

        );
      case "Tiger":
        return (
          <>
            <div className="mt-4 space-y-2">
              {
                tigerData && tigerData.length && tigerData.map((item, index) => (
                  <div className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
                    <span>{item?.nat?.slice(0, -1)}</span>
                    {
                      item?.gstatus === "SUSPENDED" ? (
                        <button className="bg-gray-500 px-4 py-1 rounded-md opacity-50 cursor-not-allowed">
                          🔒
                        </button>
                      ) : (
                        <button
                          className="betting-button bg-blue-500 px-4 py-1 rounded-md"
                          onClick={ (e) =>  handleBetClick(e, item.b )}
                        >
                          {item?.b}
                        </button>
                      )
                    }

                  </div>
                ))
              }
            </div>
          </>
        );
      case "Lion":
        return (
          <>
            <div className="mt-4 space-y-2">
              {
                lionData && lionData.length && lionData.map((item, index) => (
                  <div className="flex justify-between items-center bg-gray-700 p-2 rounded-md">
                    <span>{item?.nat?.slice(0, -1)}</span>
                    {
                      item?.gstatus === "SUSPENDED" ? (
                        <button className="bg-gray-500 px-4 py-1 rounded-md opacity-50 cursor-not-allowed">
                          🔒
                        </button>
                      ) : (
                        <button
                          className="betting-button bg-blue-500 px-4 py-1 rounded-md"
                          onClick={ (e) =>  handleBetClick(e, item.b)}
                        >
                          {item?.b}
                        </button>
                      )
                    }

                  </div>
                ))
              }
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-gray-800">
      <div className="  mb-0 h-full min-h-screen  p-4 rounded-md w-full text-white">
        <iframe src={`https://titan97.live/get-video/${gmid}`} frameBorder="0"></iframe>
        {/* Tabs */}
        <div className="flex border-b border-gray-600">
          <button
            className={`flex-1 text-center py-2 ${activeTab === "Dragon" ? "border-b-2 border-yellow-400" : ""}`}
            onClick={() => setActiveTab("Dragon")}
          >
            Dragon
          </button>
          <button
            className={`flex-1 text-center py-2 ${activeTab === "Tiger" ? "border-b-2 border-yellow-400" : ""}`}
            onClick={() => setActiveTab("Tiger")}
          >
            Tiger
          </button>
          <button
            className={`flex-1 text-center py-2 ${activeTab === "Lion" ? "border-b-2 border-yellow-400" : ""}`}
            onClick={() => setActiveTab("Lion")}
          >
            Lion
          </button>
        </div>

        {/* Tab Content */}
        {renderTabContent()}

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

        {/* Recent details */}
        {/* <div className="mt-4 bg-black p-2 rounded-md flex items-center">
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
        </div> */}
        <div className=" h-10 "></div>
              <RecentResult result={gmid}/>

      </div>

      {/* Positioned betting modal */}
      {modalOpen && (
        <div
          ref={modalRef}
          className="fixed z-50"
          style={{
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <BettingPage setisModalopen={setModalOpen} betRate={betRate} Player={game?.gtype} game={game} />
        </div>
      )}
    </div>
  );
};

export default Dtla;