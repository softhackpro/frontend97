import { useContext, useEffect, useState } from "react";
import { BsArrow90DegRight, BsCrosshair2 } from "react-icons/bs";
import { AuthContext } from "../services/auth/auth.context";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router";
import { FaChevronRight } from "react-icons/fa6";

const BetDetailsScreen = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState("");
  const [expandedBetId, setExpandedBetId] = useState(null);
  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
      const response = await axios.post(
        "https://admin.titan97.live/Apicall/openBetHistory",
        { user_id: user?.user_id }
      );
      // console.log(response.data);
      setData(response?.data?.data);
      console.log(response?.data?.data, "data is coming");
      
    } catch (error) {
      // console.log(error.message);
    }
  };

  // console.log(user);
  // console.log("sjkdkajsfjabfjk");

  useEffect(() => {
    fetchDetails();
  }, []);

  const toggleBetExpand = (betId) => {
    if (expandedBetId === betId) {
      setExpandedBetId(null); // Close if already open
    } else {
      setExpandedBetId(betId); // Open the clicked bet
    }
  };

  return (
    <div className="w-full h-full container m-auto min-h-screen bg-white flex flex-col gap-1">
      <div className="w-full h-8 flex items-center justify-between p-3 bg-blue-500">
        <p className="text-black text-md font-semibold">Open Bets</p>
        <ImCross onClick={() => navigate(-1)} className="text-sm" />
      </div>

      {expandedBetId === null
        ? // Only render the list when no bet is expanded
          data &&
          data.length > 0 &&
          data.map((d, index) => (
            <div key={d.id || index} className="border-b border-gray-400">
              <div className="w-full text-sm p-2 flex items-center justify-between text-blue-800 font-semibold">
                <p>{d?.market_name}</p>
                <div className="p-1 border border-gray-200">
                  <FaChevronRight
                    onClick={() => toggleBetExpand(d.id || index)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))
        : // Render only the expanded bet details
          (() => {
            const d = data.find(
              (item, index) => (item.id || index) === expandedBetId
            );
            if (!d) return null;

            return (
              <div className="border-b border-gray-400">
                <div className="w-full text-sm p-2 flex items-center justify-between text-blue-800 font-semibold">
                  <p>{d?.match_name}</p>
                  <div className="p-1 border border-gray-200">
                    <FaChevronRight
                      onClick={() => toggleBetExpand(d.id || expandedBetId)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col mb-3">
                  <div className="w-full bg-gray-200">
                    <div className="p-1 text-center w-fit bg-white border-gray-200 border-b text-sm font-bold ">
                      Matched
                    </div>
                  </div>

                  {/* Table headers */}
                  <div className="w-full grid grid-cols-4 text-xs text-gray-600 p-1 bg-gray-100">
                    <div>Back (Bet For)</div>
                    <div className="text-center">Odds</div>
                    <div className="text-center">Stake</div>
                    <div className="text-center">Profit</div>
                  </div>

                  {/* First row data */}
                  {d?.bet_type.toString().toLowerCase() === "back" && (
                    <div className="w-full grid grid-cols-4 text-xs text-black p-1 border-b bg-blue-300">
                      <div className=" font-semibold">{d?.bet_name}</div>
                      <div className="text-center">{d?.bet_rate}</div>
                      <div className="text-center">{d?.loss_amount}</div>
                      <div className="text-center">{d?.win_amount}</div>
                    </div>
                  )}

                  {/* Second row header */}
                  <div className="w-full grid grid-cols-4 text-xs text-gray-600 p-1 bg-gray-100">
                    <div>Lay (Bet Against)</div>
                    <div className="text-center">Odds</div>
                    <div className="text-center">Stake</div>
                    <div className="text-center">Liability</div>
                  </div>

                  {/* Team info row - matching what's in the image */}
                  {d?.bet_type.toString().toLowerCase() === "lay" && (
                    <div className="w-full grid grid-cols-4 text-xs p-1 border-b bg-red-300">
                      <div className=" font-semibold">{d?.bet_name}</div>
                      <div className="text-center">{d?.bet_rate}</div>
                      <div className="text-center">{d?.loss_amount}</div>
                      <div className="text-center">{d?.win_amount}</div>
                    </div>
                  )}

                  {/* Additional info section */}
                  <div className="p-1 text-xs flex items-center">
                    <input type="checkbox" id="moreInfo" className="mr-1" />
                    <label htmlFor="moreInfo">Get Info</label>
                  </div>
                </div>
              </div>
            );
          })()}
    </div>
  );
};

export default BetDetailsScreen;
