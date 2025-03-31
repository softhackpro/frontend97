import React, { useState, useContext } from "react";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../services/auth/auth.context";
import AgeVerificationModal from "../components/modals/AgeVerificationModal";
import LoginModal from "../components/modals/LoginModal";
import toast from "react-hot-toast";

const TeenPatiRecord = ({ detail, gmid, mid }) => {
  const [selectedBet, setSelectedBet] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const betAmounts = [5, 100, 200, 300, 500, 1000, 2000, 5000];
  const [showAgeVerificationModal, setShowAgeVerificationModal] =
    useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // Track which player has an open bet modal
  const [openBetModal, setOpenBetModal] = useState({
    playerIndex: null,
    betType: null,
  });

  const handleBackClick = (playerIndex, player, odds, size) => {
    setSelectedBet({
      team: player.nat,
      odds: odds,
      size: size,
      type: "Back",
    });

    setOpenBetModal({
      playerIndex: playerIndex,
      betType: "Back",
    });
  };

  const handleLayClick = (playerIndex, player, odds, size) => {
    setSelectedBet({
      team: player.nat,
      odds: odds,
      size: size,
      type: "Lay",
    });

    setOpenBetModal({
      playerIndex: playerIndex,
      betType: "Lay",
    });
  };

  const handleBetAmountChange = (amount) => {
    setBetAmount(amount);
  };

  const closeModal = () => {
    setOpenBetModal({
      playerIndex: null,
      betType: null,
    });
    setSelectedBet(null);
    setBetAmount(0);
  };

  const placeBet = async () => {
    if (!user) {
      setShowAgeVerificationModal(true);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://admin.titan97.live/Apicall/bf_placeBet_api",
        {
          selection_id: mid,
          bet_type: selectedBet.type,
          user_id: user?.user_id,
          bet_name: selectedBet.team,
          betvalue: selectedBet.odds,
          match_id: gmid,
          market_type: selectedBet.type,
          win_amount: selectedBet.odds * betAmount,
          loss_amount: betAmount,
          gtype: detail.subtype || detail.mname,
        }
      );
      if (response.data.success) {
        toast.success("bet placed");
      } else {
        toast.error(response.data.error || "something went wronge");
      }

      closeModal();
    } catch (error) {
      // //(error);
    } finally {
      setLoading(false);
    }
  };

  const isModalOpen = (playerIndex, betType) => {
    return (
      openBetModal.playerIndex === playerIndex &&
      openBetModal.betType === betType
    );
  };

  return (
    <div className="w-full max-w-4xl overflow-hidden mb-3 relative">
      {detail.suspendedAll && (
        <div className="absolute w-full h-full border border-red-500 flex items-center justify-center z-10 inset-0 bg-black/50">
          <span className="text-red-500 font-extrabold text-xl">SUSPENDED</span>
        </div>
      )}

      {/* Header with game title and limits */}
      <div className="bg-blue-900 text-white p-2 flex justify-between items-center w-full rounded-md shadow-md">
        <div className="text-sm sm:text-lg font-semibold">
          {detail.subtype.toUpperCase()}
        </div>
        <div className="text-xs sm:text-base">
          Min/Max: {detail.min} - {detail.max}
        </div>
      </div>

      {/* Players Section */}
      <div className="bg-blue-200 flex flex-col p-2 rounded-md shadow-md">
        {detail.playersInfo.map((player, playerIndex) => (
          <React.Fragment key={playerIndex}>
            <div className="flex items-center bg-blue-500 shadow-md py-2 px-2 w-full rounded-md mb-1">
              {/* Player Name */}
              <div className="w-2/5 flex items-center">
                <span className="text-white text-xs sm:text-sm font-semibold px-2 whitespace-normal break-words">
                  {player.nat}
                </span>
              </div>

              {/* Back Price */}
              <div className="w-1/5 bg-pink-500 h-10 rounded-md relative flex flex-col items-center p-2 shadow-md">
                {player.b === 0 && player.bs === 0 ? (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-md">
                    <FaLock className="text-white text-lg" />
                  </div>
                ) : (
                  <button
                    className="w-full h-full flex flex-col items-center"
                    onClick={() =>
                      handleBackClick(playerIndex, player, player.b, player.bs)
                    }
                    disabled={player.b === 0 && player.bs === 0}
                  >
                    <span className="text-white font-bold text-xs sm:text-sm">
                      {player.b}
                    </span>
                    <span className="text-white text-[10px] sm:text-xs">
                      {player.bs}
                    </span>
                  </button>
                )}
              </div>

              {/* Lay Price */}
              <div className="w-1/5 p-2 h-10  bg-blue-600 rounded-md relative flex flex-col items-center  shadow-md">
                {player.l === 0 && player.ls === 0 ? (
                  <div className="absolute h-full inset-0 bg-black/80 flex items-center justify-center rounded-md">
                    <FaLock className="text-white text-lg" />
                  </div>
                ) : (
                  <button
                    className="w-full h-full flex flex-col items-center"
                    onClick={() =>
                      handleLayClick(playerIndex, player, player.l, player.ls)
                    }
                    disabled={player.l === 0 && player.ls === 0}
                  >
                    <span className="text-white font-bold text-xs sm:text-sm">
                      {player.l}
                    </span>
                    <span className="text-white text-[10px] sm:text-xs">
                      {player.ls}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Inline Betting Modal */}
            {isModalOpen(playerIndex, selectedBet?.type) && selectedBet && (
              <div className="w-full text-lg text-black rounded-md shadow-lg border border-[#beddf4] p-1">
                <div className="flex justify-between gap-1 items-center mb-2">
                  <div
                    className="flex w-1/2 border-1 border-[#aaaaaa]  items-center  rounded-md"
                    style={{ backgroundColor: "#fcfcfc" }}
                  >
                    <button
                      // onClick={() =>
                      //   setBetAmount(Math.max(0, betAmount - 0.01))
                      // }
                      className="p-2 text-blue-800"
                    >
                      <span className="text-xl font-bold">−</span>
                    </button>
                    <input
                      type="text"
                      value={selectedBet.odds || "1.98"}
                      className="p-2 text-center w-full border-r border-l border-[#aaaaaa] bg-gray-100"
                      readOnly
                    />
                    <button
                      // onClick={() => setBetAmount(betAmount + 0.01)}
                      className="p-2 text-blue-800"
                    >
                      <span className="text-xl font-bold">+</span>
                    </button>
                  </div>

                  <div
                    className="flex border-1 border-[#aaaaaa]  items-center w-1/2   rounded-md"
                    style={{ backgroundColor: "#fcfcfc" }}
                  >
                    <button
                      onClick={() => setBetAmount(Math.max(0, betAmount - 100))}
                      className="p-2 text-blue-800"
                    >
                      <span className="text-sm font-bold">−</span>
                    </button>
                    <input
                      type="text"
                      value={betAmount || "0"}
                      onChange={(e) => setBetAmount(Number(e.target.value))}
                      className="p-2 text-center border-l border-[#aaaaaa] w-full border-r bg-gray-100"
                    />
                    <button
                      onClick={() => setBetAmount(betAmount + 100)}
                      className="p-2 text-blue-800 rounded-xl"
                    >
                      <span className="text-xl font-bold">+</span>
                    </button>
                  </div>
                </div>
                <div className=" w-full h-[1px] bg-[#7dbbe9] "></div>
                <div className="grid grid-cols-4 mt-2 gap-2 mb-2">
                  {[100, 200, 300, 500, 1000, 2000, 5000, 10000].map(
                    (amount) => (
                      <button
                        key={amount}
                        onClick={() => setBetAmount(amount)}
                        className="bg-white border-1 border-black py-1 text-center rounded hover:bg-gray-100 text-sm"
                      >
                        {amount}
                      </button>
                    )
                  )}
                </div>

                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={closeModal}
                    className="w-1/2 py-2 text-center rounded border border-green-300 text-sm bg-white hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    onClick={placeBet}
                    className="w-1/2 py-2 text-center text-sm text-white rounded font-medium"
                    style={{ backgroundColor: "#4a6da7" }}
                  >
                    {loading ? "Loading..." : "Place Bet"}
                  </button>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Modals */}
      <AgeVerificationModal
        isOpen={showAgeVerificationModal}
        onConfirm={() => {
          setShowLoginModal(true);
          setShowAgeVerificationModal(false);
        }}
        onClose={() => {
          setShowAgeVerificationModal(false);
        }}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default TeenPatiRecord;
