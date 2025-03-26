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

const Fullgame = () => {
  const [activeTab, setActiveTab] = useState("Winner");
  const [activeSection, setActiveSection] = useState("Winner");
  const [apiData, setApiData] = useState([]);
  const tabs = ["All", "Popular", "Winner", "Bookmakers"];
  const [loder, setLoader] = useState(false);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const sid = searchParams.get("sid");
  const match_name = searchParams.get("match_name");

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

  const [openModalSection, setOpenModalSection] = useState({
    dataIndex: null,
    sectionIndex: null,
  });

  const { user } = useContext(AuthContext);

  const fetchGameDetails = async () => {
    try {
      const response = await axios.post("https://titan97.live/get-bookmaker", {
        gmid: id,
        sid: sid,
      });
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
    // const d = {
    //   selection_id: selectedBet?.mid,
    //   bet_type: selectedBet?.type,
    //   user_id: user?.user_id,
    //   bet_name: selectedBet?.team,
    //   betvalue: selectedBet?.odds,
    //   match_id: selectedBet?.gmid,
    //   market_type: selectedBet?.type,
    //   win_amount: selectedBet?.odds * betAmount,
    //   loss_amount: betAmount,
    //   gtype: selectedBet?.mname,
    //   match_name: match_name,
    // };
    // console.log(d);

    try {
      setBetLoading(true);
      const response = await axios.post(
        "https://admin.titan97.live/Apicall/bf_placeBet_api",
        {
          selection_id: selectedBet?.mid,
          bet_type: selectedBet?.type,
          user_id: user?.user_id,
          bet_name: selectedBet?.team,
          betvalue: selectedBet?.odds,
          match_id: selectedBet?.gmid,
          market_type: selectedBet?.type,
          win_amount: selectedBet?.odds * betAmount,
          loss_amount: betAmount,
          gtype: selectedBet?.mname,
          match_name: match_name,
        }
      );
      if (response.data.success) {
        toast.success("bet placed");
      } else {
        toast.error(response.data.error || "something went wronge");
      }
      closeModal();
    } catch (error) {
      // console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  }, [apiData, loder]);

  useEffect(() => {
    fetchGame();
  }, []);

  useEffect(() => {
    socket.emit("joinRoom", { gmid: id, sid });

    const handleMatchDetails = (data) => {
      console.log("📥 Received data:", data);
      setApiData(data?.data);
    };

    socket.on("matchDetails", handleMatchDetails);

    return () => {
      socket.off("matchDetails", handleMatchDetails);
      socket.emit("leaveRoom", { gmid: id, sid });
    };
  }, [id, sid]); // ✅ Keep this dependency array only if `id` and `sid` can change

  const handleBackClick = (
    dataIndex,
    sectionIndex,
    item,
    odds,
    mname,
    gmid,
    mid
  ) => {
    setSelectedBet({
      team: item.nat,
      odds: odds,
      type: "Back",
      mname,
      gmid,
      mid,
    });

    setOpenModalSection({
      dataIndex: dataIndex,
      sectionIndex: sectionIndex,
    });
  };

  const handleLayClick = (
    dataIndex,
    sectionIndex,
    item,
    odds,
    mname,
    gmid,
    mid
  ) => {
    setSelectedBet({
      team: item.nat,
      odds: odds,
      type: "Lay",
      mname,
      gmid,
      mid,
    });
    setOpenModalSection({
      dataIndex: dataIndex,
      sectionIndex: sectionIndex,
    });
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

  // console.log(apiData);

  if (loder) {
    return <CircularHorizontalLoader />;
  }

  return (
    <div className="w-full sm:max-w-3xl mx-auto overflow-hidden rounded shadow relative">
      {/* Header */}
      <div className="relative">
        <iframe
          src={`https://titan97.live/get-livesports?gmid=${id}&sid=${sid}`}
          className="w-full h-screen"
          allowFullScreen="true"
        />
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-scroll scroll-smooth w-full gap-1 p-2 text-white bg-gray-200 border-b border-gray-300">
        {apiData?.map((tab) => (
          <button
            key={tab}
            className={`p-2 font-bold border-1 text-nowrap border-black rounded-4xl text-sm ${
              activeTab === tab?.mname
                ? "bg-[#016630] text-white"
                : "bg-[#2c485a]"
            }`}
            onClick={() => setActiveTab(tab?.mname)}
          >
            {tab?.mname}
          </button>
        ))}
      </div>
      {apiData && apiData.length
        ? apiData.map((data, dataIndex) => (
            <div key={dataIndex} className="bg-white relative">
              {/* Winner Section */}
              <div
                className={`${activeSection === "Winner" ? "block" : "hidden"}`}
              >
                <div className="flex justify-between items-center bg-white text-white">
                  <div className="flex w-fit items-center p-2 rounded-tr-xl bg-gray-800">
                    <span className="font-bold text-xs">{data.mname}</span>
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
                      <React.Fragment key={sectionIndex}>
                        <div className="flex relative text-[15px] text-sm border-t border-gray-200">
                          <div className="w-1/2 p-2 font-medium">
                            {item?.nat}
                          </div>

                          {item.gstatus !== "" &&
                          item.gstatus !== "ACTIVE" &&
                          item.gstatus !== "OPEN" ? (
                            <div className="text-black font-semibold flex items-center justify-center w-1/2  bg-red-500/30">
                              {item.gstatus}
                            </div>
                          ) : (
                            <div className=" w-1/2 flex h-full">
                              <button
                                onClick={() =>
                                  handleBackClick(
                                    dataIndex,
                                    sectionIndex,
                                    item,
                                    item.odds[item.odds.length / 2 - 1]?.odds,
                                    data.mname,
                                    data.gmid,
                                    data.mid
                                  )
                                }
                                className="w-full bg-transparent"
                              >
                                <div className="bg-[#72bbef] text-center font-bold">
                                  {item.odds[item.odds.length / 2 - 1]?.odds}

                                  {/* {item.odds.length / 2} */}
                                </div>
                                <div className="bg-[#72bbef] text-center">
                                  {item.odds[item.odds.length / 2 - 1]?.size}
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
                                    data.mid
                                  )
                                }
                                className="w-full bg-transparent"
                              >
                                <div className="bg-[#faa9ba] text-center font-bold">
                                  {item.odds[item.odds.length / 2]?.odds}
                                </div>
                                <div className="bg-[#faa9ba] text-center">
                                  {item.odds[item.odds.length / 2]?.size}
                                </div>
                              </button>
                            </div>
                          )}
                          {/* <div className="w-1/4 relative border-l border-gray-300"></div>

                          <div className="w-1/4 relative border-l border-gray-300">
                            {item.gstatus !== "" ? (
                              <div className="text-black font-semibold flex items-center justify-center absolute h-full w-full left-0 top-0 bg-yellow-200">
                                {item.gstatus}
                              </div>
                            ) : (
                              <button
                                onClick={() =>
                                  handleLayClick(
                                    dataIndex,
                                    sectionIndex,
                                    item,
                                    item.odds[0]?.odds
                                  )
                                }
                                className="w-full bg-transparent"
                              >
                                <div className="bg-[#faa9ba] text-center font-bold">
                                  {item.odds[0]?.odds}
                                </div>
                                <div className="bg-[#faa9ba] text-center">
                                  {item.odds[0]?.size}
                                </div>
                              </button>
                            )}
                          </div> */}
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
                                  <button
                                    // onClick={() =>
                                    //   setBetAmount(
                                    //     Math.max(0, betAmount - 0.01)
                                    //   )
                                    // }
                                    className="p-2 text-blue-800"
                                  >
                                    <span className="text-xl font-bold">−</span>
                                  </button>
                                  <input
                                    type="text"
                                    value={selectedBet.odds}
                                    className="p-2 text-center w-full border-r border-l border-[#aaaaaa] bg-gray-100"
                                    readOnly
                                  />
                                  <button
                                    // onClick={() =>
                                    //   setBetAmount(betAmount + 0.01)
                                    // }
                                    className="p-2 text-blue-800"
                                  >
                                    <span className="text-xl font-bold">+</span>
                                  </button>
                                </div>
                                <div
                                  className="flex border-1 border-[#aaaaaa] items-center w-1/2 rounded-md"
                                  style={{ backgroundColor: "#fcfcfc" }}
                                >
                                  <button
                                    onClick={() =>
                                      setBetAmount(Math.max(0, betAmount - 100))
                                    }
                                    className="p-2 text-blue-800"
                                  >
                                    <span className="text-sm font-bold">−</span>
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
                                    <span className="text-xl font-bold">+</span>
                                  </button>
                                </div>
                              </div>

                              {/* <div className="w-full h-[2px] bg-[#7dbbe9]"></div> */}

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

                        {data?.status === "SUSPENDED" && (
                          <div className="absolute w-full h-full border border-red-500 flex items-center justify-center z-10 inset-0 bg-black/50">
                            <span className="text-red-500 font-extrabold text-xl">
                              SUSPENDED
                            </span>
                          </div>
                        )}
                      </React.Fragment>
                    ))}

                    {/* {!data?.iplay && (
                      <div className="w-full h-full absolute top-0 left-0 bg-white/50 border-2 border-black flex items-center justify-center font-bold text-lg">
                        <p className="text-black">SUSPENDS</p>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}

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
    </div>
  );
};

export default Fullgame;
