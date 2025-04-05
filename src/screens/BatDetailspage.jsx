import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/auth/auth.context";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router";
import { FaChevronRight } from "react-icons/fa6";

const BetDetailsScreen = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [expandedMarket, setExpandedMarket] = useState(null);
  const navigate = useNavigate();

  const fetchDetails = async () => {
    if (!user?.user_id) return;

    try {
      const response = await axios.post(
        "https://admin.titan97.live/Apicall/openBetHistory",
        { user_id: user?.user_id }
      );
      const responseData = response?.data?.data || [];
      const marketMap = responseData.reduce((acc, item) => {
        if (item.market_name) {
          acc[item.market_name] = acc[item.market_name] || [];
          acc[item.market_name].push(item);
        }
        return acc;
      }, {});
      setData(marketMap);
      //(response);
    } catch (error) {
      console.error("Error fetching bet details:", error.message);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [user?.user_id]);

  const toggleMarketExpand = (market) => {
    setExpandedMarket((prev) => (prev === market ? null : market));
  };

  console.log(data);
  

  return (
    <div className="w-full h-full container mx-auto min-h-screen bg-white flex flex-col gap-1">
      {/* Header */}
      <div className="w-full h-8 flex items-center justify-between p-3 bg-blue-500">
        <p className="text-white text-md font-semibold">Open Bets</p>
        <ImCross
          onClick={() => navigate(-1)}
          className="text-white text-sm cursor-pointer"
        />
      </div>

      {/* Market List */}
      {Object.entries(data).map(([market, bets]) => (
        <div key={market} className="">
          {!expandedMarket && (
            <div
              className="w-full text-sm p-2 border-b border-gray-400 flex items-center justify-between text-blue-800 font-semibold cursor-pointer hover:bg-blue-100 transition"
              onClick={() => toggleMarketExpand(market)}
            >
              <p
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {market}
              </p>
              <div className="p-1 border border-gray-200">
                <FaChevronRight
                  className={`transition-transform ${
                    expandedMarket === market ? "rotate-90" : ""
                  }`}
                />
              </div>
            </div>
          )}

          {/* Bet Details */}
          {expandedMarket === market && (
            <>
              <div
                className="w-full text-sm p-2 border-b border-gray-400 flex items-center justify-between text-blue-800 font-semibold cursor-pointer hover:bg-blue-100 transition"
                onClick={() => toggleMarketExpand(market)}
              >
                <p>{market}</p>
                <div className="p-1 border border-gray-200">
                  <FaChevronRight
                    className={`transition-transform ${
                      expandedMarket === market ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </div>
              {bets.map((bet, index) => (
                <div key={index} className="border-b border-gray-300 p-2">
                  <p className="text-sm font-semibold">{bet.match_name}</p>

                  <div className="w-full flex justify-between items-center bg-gray-200">
                    <div className="p-1 text-center w-fit bg-white border-gray-200 border-b text-sm font-bold">
                      Matched
                    </div>
                    <div className=" text-sm font-semibold text-center h-full"> { bet.updated_at} </div>
                  </div>

                  {/* Back Bet */}
                  <div className="w-full grid grid-cols-4 text-xs text-gray-600 p-1 bg-gray-100">
                    <div>Back (Bet For)</div>
                    <div className="text-center">Odds</div>
                    <div className="text-center">Stake</div>
                    <div className="text-center">Profit</div>
                  </div>

                  {bet.bet_type.toLowerCase() === "back" && (
                    <div className="w-full grid grid-cols-4 text-xs text-black p-1 border-b bg-blue-300">
                      <div
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        className="font-semibold"
                      >
                        {bet.bet_name}
                      </div>
                      {bet?.gtype === "MATCH_ODDS" ||
                      bet?.gtype === "fancy1" ? (
                        <div className="text-center">{`${bet.bet_rate}`}</div>
                      ) : (
                        <div className="text-center">{`${bet.betvalue}`}</div>
                      )}
                      <div className="text-center">{bet.loss_amount}</div>
                      <div className="text-center">{`${bet.win_amount} (-${bet.loss_amount})`}</div>
                    </div>
                  )}

                  {/* Lay Bet */}
                  <div className="w-full grid grid-cols-4 text-xs text-gray-600 p-1 bg-gray-100">
                    <div>Lay (Bet Against)</div>
                    <div className="text-center">Odds</div>
                    <div className="text-center">Stake</div>
                    <div className="text-center">Liability</div>
                  </div>

                  {bet.bet_type.toLowerCase() === "lay" && (
                    <div className="w-full grid grid-cols-4 text-xs p-1 border-b bg-red-300">
                      <div
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        className="font-semibold"
                      >
                        {bet.bet_name}
                      </div>
                      {bet?.gtype === "Bookmaker" ? (
                        <div className="text-center">{`${bet.betvalue}`} </div>
                      ) : (
                        <div className="text-center">{`${bet.bet_rate} ()`}</div>
                      )}

                      <div className="text-center">{bet.loss_amount}</div>
                      <div className="text-center">{`${bet.win_amount} (-${bet.loss_amount})`}</div>
                    </div>
                  )}

                  

                  {/* Checkbox for Info */}
                  <div className="p-1 text-xs flex items-center">
                    <input
                      type="checkbox"
                      id={`moreInfo-${index}`}
                      className="mr-1"
                    />
                    <label htmlFor={`moreInfo-${index}`}>Get Info</label>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default BetDetailsScreen;
