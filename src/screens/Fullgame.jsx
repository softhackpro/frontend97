import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  data,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import CircularHorizontalLoader from "../components/loader";
import { AuthContext } from "../services/auth/auth.context";
import AgeVerificationModal from "../components/modals/AgeVerificationModal";
import LoginModal from "../components/modals/LoginModal";
import toast from "react-hot-toast";
import { socket } from "../main";
import { FaTv } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { SportBookComponents } from "../components/fullgameComponents/SportBookComponents";
import { TossSportsConponents } from "../components/fullgameComponents/TossSportsComponents";
const Fullgame = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeSection, setActiveSection] = useState("All");
  const [apiData, setApiData] = useState([]);
  const [loder, setLoader] = useState(false);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const sid = searchParams.get("sid");
  const match_name = searchParams.get("match_name");
  const [updatedBet, setupdatedBet] = useState("");
  const [selectedBet, setSelectedBet] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const betAmounts = [5, 100, 200, 300, 500, 1000, 2000, 5000];
  // Track which row has an open modal
  const [showAgeVerificationModal, setShowAgeVerificationModal] =
    useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Store the current location
  const [betLoading, setBetLoading] = useState(false);
  const [matchdetail, setMatchDetail] = useState();
  const [openTv, setOpenTv] = useState(false);
  const [openScore, setScore] = useState(false);
  const [openModalSection, setOpenModalSection] = useState({
    dataIndex: null,
    sectionIndex: null,
  });
  const [mainApiData, setMainApiData] = useState([]);
  const [tossData, setTossData] = useState([]);
  const { user } = useContext(AuthContext);
  const [betAmountShow, setBetAmountShow] = useState(null);
  const [winAmount, setWinAmount] = useState(0);
  const [lossAmount, setLossAmount] = useState(0);
  const [betOpenType, setBetOpenType] = useState(null);
  const [betOpenTypeName, setBetOpenTypeName] = useState(null);

  const fetchGameDetails = async () => {
    try {
      const response = await axios.post("https://titan97.live/get-bookmaker", {
        gmid: id,
        sid: sid,
      });
      setMainApiData(response.data.data);
      setApiData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  const placeBat = async () => {
    if (!user) {
      setShowAgeVerificationModal(true);
      return;
    }
    try {
      setBetLoading(true);
      let updatedBet = selectedBet?.odds - 1;
      let sendUpdateBet = selectedBet?.odds;

      if (selectedBet?.mname === "Bookmaker") {
        updatedBet = (selectedBet?.odds + 0) / 100;
        sendUpdateBet = (selectedBet?.odds + 100) / 100;
      } else if (selectedBet?.mname === "Normal") {
        sendUpdateBet = (selectedBet?.size + 100) / 100;
        updatedBet = selectedBet?.size / 100;
      }

      let win_a = updatedBet * betAmount;
      let loss_a = betAmount;
      if (betOpenType === 'Lay') {
        win_a = betAmount;
        loss_a = updatedBet * betAmount;
      }
      
      const d = {
        selection_id: selectedBet?.mid,
        bet_type: selectedBet?.type,
        user_id: user?.user_id,
        bet_name: selectedBet?.team,
        betvalue: selectedBet?.odds,
        bet_rate: sendUpdateBet,
        match_id: selectedBet?.gmid,
        market_type: selectedBet?.type,
        win_amount: win_a,
        loss_amount: loss_a,
        gtype: selectedBet?.mname,
        market_name: match_name,
      }

      console.log(d);

      const response = await axios.post(
        "https://admin.titan97.live/Apicall/bf_placeBet_api",
        {
          selection_id: selectedBet?.mid,
          bet_type: selectedBet?.type,
          user_id: user?.user_id,
          bet_name: selectedBet?.team,
          betvalue: selectedBet?.odds,
          bet_rate: sendUpdateBet,
          match_id: selectedBet?.gmid,
          market_type: selectedBet?.type,
          win_amount: win_a,
          loss_amount: loss_a,
          gtype: selectedBet?.mname,
          market_name: match_name,
        }
      );
      if (response.data.success) {
        toast.success("bet placed");
      } else {
        toast.error(response.data.error || "something went wronge");
      }
      closeModal();
    } catch (error) {
      console.log(error);
      
      toast.error("something went wrong");
    } finally {
      setBetLoading(false);
    }
  };

  // useEffect(() => {
  //   let intervalId;

  //   intervalId = setInterval(fetchGameDetails, 1000);
  //   return () => clearInterval(intervalId);
  // }, []);

  const fetchGame = useCallback(async () => {
    try {
      setLoader(true);
      await fetchGameDetails();
      setLoader(false);
    } catch (error) { }
  }, [apiData, loder]);

  useEffect(() => {
    fetchGame();
  }, []);

  useEffect(() => {
    socket.emit("joinRoom", { gmid: id, sid });

    const handleMatchDetails = (data) => {
      setMainApiData(data?.data);
    };

    socket.on("matchDetails", handleMatchDetails);

    return () => {
      socket.off("matchDetails", handleMatchDetails);
      socket.emit("leaveRoom", { gmid: id, sid });
    };
  }, [id, sid]);

  useEffect(() => {
    const filterData = mainApiData.filter((item) => item.gtype === "fancy1");
    setTossData(filterData);
    //(filterData);
  }, [mainApiData]);

  const handleBackClick = (
    dataIndex,
    sectionIndex,
    item,
    odds,
    mname,
    gmid,
    mid,
    size
  ) => {
    setSelectedBet({
      team: item.nat,
      odds: odds,
      type: "Back",
      mname,
      gmid,
      mid,
      size,
    });

    setOpenModalSection({
      dataIndex: dataIndex,
      sectionIndex: sectionIndex,
    });


    setBetAmountShow(mname);
    const win_amount = (betAmount - 1) * odds
    setWinAmount(win_amount);
    setLossAmount(betAmount);
    setBetOpenType("Back")
    setBetOpenTypeName(item.nat)
    //(win_amount, item.odds, betAmount);

  };

  const handleLayClick = (
    dataIndex,
    sectionIndex,
    item,
    odds,
    mname,
    gmid,
    mid,
    size
  ) => {
    setSelectedBet({
      team: item.nat,
      odds: odds,
      type: "Lay",
      mname,
      gmid,
      mid,
      size,
    });
    setOpenModalSection({
      dataIndex: dataIndex,
      sectionIndex: sectionIndex,
    });
    setBetAmountShow(mname);
    const loss_amount = (betAmount - 1) * odds
    setLossAmount(loss_amount)
    setWinAmount(betAmount);
    setBetOpenType("Lay")
    setBetOpenTypeName(item.nat)
    console.log("ddddddddddddddddddddd");

    console.log(loss_amount, odds, betAmount);

  };

  const handleBetAmountChange = (amount) => {
    setBetAmount(amount);
  };

  const closeModal = () => {
    setOpenModalSection({
      dataIndex: null,
      sectionIndex: null,
    });
    setSelectedBet(null);
    setBetAmount(0);
  };

  const isModalOpen = (dataIndex, sectionIndex) => {
    return (
      openModalSection.dataIndex === dataIndex &&
      openModalSection.sectionIndex === sectionIndex
    );
  };

  const handleFilterOptionsClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    //(activeTab);
    //(mainApiData);
    //(apiData);

    if (activeTab === "All") {
      setApiData(mainApiData);
      return;
    }
    const filteredData = mainApiData.filter((item) => item.mname === activeTab);
    setApiData(filteredData);
  }, [mainApiData, activeTab]);

  if (loder) {
    return <CircularHorizontalLoader />;
  }
  const scoreClicked = async () => {
    const res = await axios.get(
      `https://titan97.live/get-matchdetails?gmid=${id}&sid=${sid}`
    );
    setMatchDetail(res.data.data[0]);
    setScore(!openScore);
  };

  //(betAmountShow);

  return (
    <div className="w-full sm:max-w-3xl mx-auto overflow-hidden rounded shadow relative">
      {/* Header */}

      <div className=" from-blue-500 to-green-500 text-lg  p-2  bg-blue-600 items-center flex justify-between w-full h-8 ">
        <p className=" font-bold text-white  ">Cricket</p>
        <div className="flex flex-row">
          <FaTv
            onClick={() => setOpenTv(!openTv)}
            className=" cursor-pointer text-white"
          />{" "}
          &nbsp; &nbsp;
          <IoIosArrowDown
            onClick={scoreClicked}
            className=" cursor-pointer text-white"
          />
        </div>
      </div>

      <div
        className={`transition-[max-height] duration-[1000ms] ease-in-out overflow-hidden ${openTv ? "max-h-[1000px]" : "max-h-0"
          }`}
      >
        <iframe
          src={`https://titan97.live/get-livesports?gmid=${id}&sid=${sid}`}
          className="w-full h-screen"
          allowFullScreen
        />
      </div>

      <div
        className={`transition-[max-height] duration-[1000ms] ease-in-out overflow-hidden ${openScore ? "max-h-[1000px]" : "max-h-0"
          }`}
      >
        <iframe
          src={`https://titan97.live/get-score?gtv=${matchdetail?.gtv}&sid=${sid}`}
          className="w-full h-screen"
          allowFullScreen
        />
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-scroll scroll-smooth w-full gap-1 p-2 text-white bg-gray-200 border-b border-gray-300">
        <button
          className={`p-2 font-bold border-1 text-nowrap border-black rounded-4xl text-sm ${activeTab === "All" ? "bg-[#016630] text-white" : "bg-[#2c485a]"
            }`}
          onClick={() => handleFilterOptionsClick("All")}
        >
          All
        </button>
        {mainApiData?.map((tab) =>
          [
            "meter",
            "oddeven",
            "khado",
            "fancy1",
            "fancy",
            "cricketcasino",
          ].includes(tab.gtype.toString().toLowerCase()) ? null : (
            <button
              key={tab}
              className={`p-2 font-bold border-1 text-nowrap border-black rounded-4xl text-sm ${activeTab === tab?.mname
                ? "bg-[#016630] text-white"
                : "bg-[#2c485a]"
                }`}
              onClick={() => handleFilterOptionsClick(tab?.mname)}
            >
              {tab?.mname}
            </button>
          )
        )}
      </div>
      {apiData && apiData.length
        ? apiData.map((data, dataIndex) => (
          <div key={dataIndex} className="bg-white relative">
            {/* Winner Section */}
            <div>
              {[
                "meter",
                "oddeven",
                "khado",
                "fancy1",
                "fancy",
                "cricketcasino",
              ].includes(data.gtype.toString().toLowerCase()) ? null : (
                <>
                  <div className="flex justify-between items-center bg-white text-white">
                    <div className="flex w-fit items-center p-2 rounded-tr-xl bg-gray-800">
                      <span className="font-bold text-xs">
                        {" "}
                        {[
                          "meter",
                          "oddeven",
                          "khado",
                          "fancy1",
                          "fancy",
                          "cricketcasino",
                        ].some(
                          (type) =>
                            data.gtype.toString().toLowerCase() === type
                        )
                          ? data.mname
                          : data.mname}
                      </span>
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01"
                        />
                      </svg>
                    </div>
                    <div className="text-xs text-black mr-2 font-semibold">
                      Matched € 9.6K
                    </div>
                  </div>
                  <div className="border-b text-[5px] border-gray-300">
                    {dataIndex === 0 && (
                      <div className="flex font-bold text-sm">
                        <div className="w-1/2 p-2"></div>
                        <div className="w-1/4 p-2 text-center bg-[#72bbef] border-l border-gray-300">
                          Back
                        </div>
                        <div className="w-1/4 p-2 text-center bg-[#faa9ba] border-l border-gray-300">
                          Lay
                        </div>
                      </div>
                    )}

                    <div className="relative">
                      {data.section.map((item, sectionIndex) => (
                        <React.Fragment key={item.sid}>
                          <div className="flex border-t border-gray-400 relative text-[12px] text-sm">
                            <div className="w-1/2 p-2 font-bold flex flex-col text-[12px]">
                              <p>{item?.nat}</p>
                              {
                                betAmountShow && betAmount && betAmountShow === data.mname ? (
                                  <div>
                                    {
                                      data.mname === 'MATCH_ODDS' ? (
                                        betOpenType === "Lay" ? (
                                          betOpenTypeName === item.nat ? (
                                            <p className={` text-red-500 `} > ( {(betAmount * (item.odds[item.odds.length / 2]?.odds - 1)).toFixed(2)}  )</p>
                                          ) : <p className={`text-green-500 `} > ( {betAmount.toFixed(2)}  )</p>
                                        ) : betOpenTypeName === item.nat ? (
                                          <p className={`text-green-500 `} > ( {(betAmount * (item.odds[item.odds.length / 2 - 1]?.odds - 1)).toFixed(2)}   )</p>
                                        ) : <p className={` text-red-500 `} > ( {betAmount.toFixed(2)} )</p>
                                      ) : (

                                        //   Bhaiya this is for you yha pe rate point me nahi nai h to isme 1 minus hoga ya nai pata nai aur call kriyega 
                                        betOpenType === "Lay" ? (
                                          betOpenTypeName === item.nat ? (
                                            <p className={` text-red-500 `} > ( {(betAmount * (item.odds[item.odds.length / 2]?.odds / 100)).toFixed(2)}  )</p>
                                          ) : <p className={`text-green-500 `} > ( {betAmount.toFixed(2)}  )</p>
                                        ) : betOpenTypeName === item.nat ? (
                                          <p className={`text-green-500 `} > ( {(betAmount * (item.odds[item.odds.length / 2 - 1]?.odds / 100)).toFixed(2)}   )</p>
                                        ) : <p className={` text-red-500 `} > ( {betAmount.toFixed(2)} )</p>
                                      )
                                    }
                                  </div>
                                ) : null
                              }
                            </div>
                            {item.gstatus !== "" &&
                              item.gstatus !== "ACTIVE" &&
                              item.gstatus !== "OPEN" ? (
                              <div className="text-black font-semibold flex items-center justify-center w-1/2 bg-red-500/30">
                                {item.gstatus}
                              </div>
                            ) : (
                              <div className="w-1/2 flex h-full">
                                <button
                                  onClick={() =>
                                    handleBackClick(
                                      dataIndex,
                                      sectionIndex,
                                      item,
                                      item.odds[item.odds.length / 2 - 1]
                                        ?.odds,
                                      data.mname,
                                      data.gmid,
                                      data.mid,
                                      item.odds[item.odds.length / 2]?.size
                                    )
                                  }
                                  className="w-full bg-[#72bbef] "
                                >
                                  <div className=" bg-[#72bbef] text-center font-bold">
                                    {
                                      item.odds[item.odds.length / 2 - 1]
                                        ?.odds
                                    }
                                  </div>
                                  <div className=" bg-[#72bbef] text-center">
                                    {
                                      item.odds[item.odds.length / 2 - 1]
                                        ?.size
                                    }
                                  </div>
                                </button>
                                <button
                                  onClick={() =>
                                    handleLayClick(
                                      dataIndex,
                                      sectionIndex,
                                      item,
                                      item.odds[item.odds.length / 2]?.odds,
                                      data.mname,
                                      data.gmid,
                                      data.mid,
                                      item.odds[item.odds.length / 2]?.size
                                    )
                                  }
                                  className="w-full bg-[#faa9ba] "
                                >
                                  <div className=" text-center font-bold">
                                    {item.odds[item.odds.length / 2]?.odds}
                                  </div>
                                  <div className=" text-center">
                                    {item.odds[item.odds.length / 2]?.size}
                                  </div>
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Inline Betting Modal */}
                          {isModalOpen(dataIndex, sectionIndex) &&
                            selectedBet && (
                              <div className="w-full bg-[#d3edd0] text-lg text-black rounded-md shadow-lg border border-[#beddf4] p-1">
                                <div className="flex justify-between gap-1 items-center mb-2">
                                  <div
                                    className="flex w-1/2 border-1 border-[#aaaaaa] items-center rounded-md"
                                    style={{ backgroundColor: "#fcfcfc" }}
                                  >
                                    <button className="p-2 text-blue-800">
                                      <span className="text-xl font-bold">
                                        −
                                      </span>
                                    </button>
                                    <input
                                      type="text"
                                      value={selectedBet.odds}
                                      className="p-2 text-center w-full border-r border-l border-[#aaaaaa] bg-gray-100"
                                      readOnly
                                    />
                                    <button className="p-2 text-blue-800">
                                      <span className="text-xl font-bold">
                                        +
                                      </span>
                                    </button>
                                  </div>
                                  <div
                                    className="flex border-1 border-[#aaaaaa] items-center w-1/2 rounded-md"
                                    style={{ backgroundColor: "#fcfcfc" }}
                                  >
                                    <button
                                      onClick={() =>
                                        setBetAmount(
                                          Math.max(0, betAmount - 100)
                                        )
                                      }
                                      className="p-2 text-blue-800"
                                    >
                                      <span className="text-sm font-bold">
                                        −
                                      </span>
                                    </button>
                                    <input
                                      type="text"
                                      value={betAmount}
                                      onChange={(e) =>
                                        setBetAmount(Number(e.target.value))
                                      }
                                      className="p-2 text-center border-l border-[#aaaaaa] w-full border-r bg-gray-100"
                                    />
                                    <button
                                      onClick={() =>
                                        setBetAmount(betAmount + 100)
                                      }
                                      className="p-2 text-blue-800 rounded-xl"
                                    >
                                      <span className="text-xl font-bold">
                                        +
                                      </span>
                                    </button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-4 mt-2 gap-2 mb-2">
                                  {betAmounts.map((amount) => (
                                    <button
                                      key={amount}
                                      onClick={() =>
                                        handleBetAmountChange(amount)
                                      }
                                      className="bg-white border-1 border-black py-1 text-center rounded hover:bg-gray-100 text-sm"
                                    >
                                      {amount}
                                    </button>
                                  ))}
                                </div>

                                <div className="flex space-x-2 mt-4">
                                  <button
                                    onClick={closeModal}
                                    className="w-1/2 py-2 text-center rounded border border-green-300 text-sm bg-white hover:bg-gray-100"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    disabled={betLoading}
                                    onClick={() => placeBat()}
                                    className="w-1/2 py-2 text-center text-sm text-white rounded font-medium"
                                    style={{ backgroundColor: "#4a6da7" }}
                                  >
                                    {betLoading ? "loading" : "Place Bet"}
                                  </button>
                                </div>
                              </div>
                            )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))
        : null}

      <TossSportsConponents
        data={tossData}
        handleBackClick={handleBackClick}
        handleLayClick={handleLayClick}
        isModalOpen={isModalOpen}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        selectedBet={selectedBet}
        betAmounts={betAmounts}
        closeModal={closeModal}
        betLoading={betLoading}
        handleBetAmountChange={handleBetAmountChange}
        placeBat={placeBat}
      />
      {/* SportsBook sections  */}

      <SportBookComponents
        data={mainApiData}
        handleBackClick={handleBackClick}
        handleLayClick={handleLayClick}
        isModalOpen={isModalOpen}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        selectedBet={selectedBet}
        betAmounts={betAmounts}
        closeModal={closeModal}
        betLoading={betLoading}
        handleBetAmountChange={handleBetAmountChange}
        placeBat={placeBat}
      />

      <AgeVerificationModal
        isOpen={showAgeVerificationModal}
        onConfirm={() => {
          setShowLoginModal(true);
          setShowAgeVerificationModal(false);
        }}
        onClose={() => {
          setShowAgeVerificationModal(false);
          setShowLoginModal(false);
          navigate(location.pathname, { replace: true });
        }}
      />
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <div className=" h-24"></div>
    </div>
  );
};

export default Fullgame;
