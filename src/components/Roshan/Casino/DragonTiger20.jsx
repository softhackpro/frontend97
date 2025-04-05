import React, { useEffect, useState } from "react";
import RecentResult from "../DownSlider/RecentResult";
import BettingPage from "./Popup/BettingPage";

const DragonTiger20 = ({ game, gmid }) => {
  const [ModalOpen, setModalOpen] = useState(false)
  const [myData, setMyData] = useState();
  const [player, setPlayer] = useState();
  const [betRate, setBetRate] = useState();


  useEffect(() => {
    const filterMyData = () => {
      const dragon = game?.sub?.filter((item) => item.nat === 'Dragon');
      const tiger = game?.sub?.filter((item) => item.nat === 'Tiger');
      const tie = game?.sub?.filter((item) => item.nat === 'Tie');
      setMyData({
        dragon: dragon,
        tiger: tiger,
        tie: tie
      })
    }

    if (game) {
      filterMyData()
    }
  }, [game])


  return (
    <>
      <iframe src={`https://titan97.live/get-video/${gmid}`} frameborder="0"></iframe>
      <div className="bg-gray-200 rounded-md w-96 mx-auto text-black">
        {/* Winner Section */}
        <div className={`bg-blue-200 relative p-4 rounded-md shadow-md text-center `}>
          <h2 className="font-bold text-lg uppercase">Winner</h2>
          <div className="flex justify-around mt-4">
            <div className="text-center">
              <h3 className="font-bold">DRAGON</h3>
              <div onClick={() => {
                if( myData?.dragon[0]?.gstatus === "SUSPENDED" ) return;
                setModalOpen(true)
                setPlayer("Dragon")
                setBetRate(myData?.dragon[0]?.b)

              }} style={{ minWidth: "120px" }} className="bg-[#86b0ed] p-2 h-16 flex items-center justify-center rounded-md shadow-md">
                {
                  myData?.dragon[0]?.gstatus === "SUSPENDED" ? (
                    <h2 className="text-xl font-bold text-white">SUSPENDS</h2>
                  ) : (
                    <>
                      <div className=" flex flex-col w-full items-center justify-center">
                        <p className="text-lg font-bold">{myData?.dragon[0]?.b} </p>
                        <p className="text-sm">{myData?.dragon[0]?.bs}</p>
                      </div>
                    </>
                  )
                }
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-bold">TIGER</h3>
              <div onClick={() => {
                if( myData?.dragon[0]?.gstatus === "SUSPENDED" ) return;
                setModalOpen(true)
                setPlayer("Tiger")
                setBetRate(myData?.tiger[0]?.b)

              }} style={{ minWidth: "120px" }} className="bg-[#86b0ed] p-2 h-16 flex items-center justify-center rounded-md shadow-md">

                {
                  myData?.dragon[0]?.gstatus === "SUSPENDED" ? (
                    <h2 className="text-xl font-bold text-white">SUSPENDS</h2>
                  ) : (
                    <>
                      <div className=" flex flex-col w-full items-center justify-center">
                        <p className="text-lg font-bold">{myData?.tiger[0]?.b} </p>
                        <p className="text-sm">{myData?.tiger[0]?.bs}</p>
                      </div>
                    </>
                  )
                }
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <h3 className="font-bold">TIE</h3>
            <div onClick={() => {
                if( myData?.dragon[0]?.gstatus === "SUSPENDED" ) return;
                setModalOpen(true)
                setPlayer("Tie")
                setBetRate(myData?.tie[0]?.b)


              }} style={{ minWidth: "120px" }} className="bg-[#86b0ed] p-2 h-16 flex items-center justify-center rounded-md shadow-md">

              {
                myData?.dragon[0]?.gstatus === "SUSPENDED" ? (
                  <h2 className="text-xl font-bold text-white">SUSPENDS</h2>
                ) : (
                  <>
                    <div className=" flex flex-col w-full items-center justify-center">
                      <p className="text-lg font-bold">{myData?.tie[0]?.b} </p>
                      <p className="text-sm">{myData?.tie[0]?.bs}</p>
                    </div>
                  </>
                )
              }
            </div>
          </div>

          {/* <div className=" absolute top-0 left-0 right-0 h-full w-full bg-red-400 flex items-center justify-center">
          <h2 className="text-3xl font-bold text-white">SUSPENDS</h2>
        </div> */}
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
        ModalOpen ? (<BettingPage setisModalopen={setModalOpen} game={game} Player={player} betRate={betRate} />) : null
      }
    </>

  );
};

export default DragonTiger20;
