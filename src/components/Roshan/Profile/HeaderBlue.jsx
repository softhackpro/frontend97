import { FaCog } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { GiSoccerBall } from "react-icons/gi";
import { BsCoin } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../services/auth/auth.context";
import ExposureDetailPopup from "../../ExposerDetails";
import { Link, useNavigate } from "react-router";

const HeaderBlue = () => {
  const { user } = useContext(AuthContext);
  const [balanceData, setBalanceData] = useState("");
  const [exposerPopupOpen, setExposerPopupOpen] = useState(false);
  const navigate = useNavigate();
  const fetchUserBalance = async () => {
    try {
      const response = await axios.post(
        "https://admin.titan97.live/Apicall/getallbal",
        { userId: user?.user_id }
      );
      setBalanceData(response.data.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    fetchUserBalance();
    const interval = setInterval(() => {
      fetchUserBalance();
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-green-900 to-black text-white p-3 flex justify-between items-center shadow-md">
      {/* Left Side - Logo and Title */}
      <div className="flex items-center shadow  bg-gradient-to-b from-green-700 to-black px-2 rounded">
        <div
          onClick={() => navigate("/bets")}
          className=" p-2 rounded"
        >
          <BsCoin className="text-white text-lg" />
        </div>
        <h1 className="text-lg font-bold">Bets</h1>
      </div>

      {/* Middle - PTI and Exposure */}
      <div className="text-sm text-center">
        <p>
          Main PTI{" "}
          <span className="font-bold">
            {(balanceData?.balance - balanceData?.bet_balance)?.toFixed(2)}
          </span>
        </p>
        <p>
          Exposure{" "}
          <span
            onClick={() => setExposerPopupOpen(true)}
            className="text-red-500 cursor-pointer font-bold"
          >
            ({balanceData?.bet_balance})
          </span>
        </p>
      </div>

      {/* Right Side - Refresh and Settings */}
      <div className="flex space-x-2">
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-b from-green-700 to-black p-2 rounded shadow"
        >
          <IoMdRefresh className="text-white text-lg" />
        </button>
      
        <button
          onClick={() => navigate("/settings")}
          className="bg-gradient-to-b from-green-700 to-black p-2 rounded shadow"
        >
          <FaCog className="text-white text-lg" />
        </button>
        
      </div>

      <ExposureDetailPopup
        isOpen={exposerPopupOpen}
        onClose={() => setExposerPopupOpen(false)}
        userId={user?.user_id}
      />
    </div>
  );
};

export default HeaderBlue;
