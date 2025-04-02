import React, { useContext, useEffect, useState } from "react";
import { CasinoContext } from "../../../services/casino/casino.context";
import { transformDataTeenPatti } from "../../../services/transformers/subtypeTeenPatiCategory";
import { splitTeenCards } from "../../../services/transformers/splitCard";
import PlayerCards from "../../PlayerCards";
import LiveStreaming from "../../LiveStreaming";
// import { CasinoContext } from "../services/casino/casino.context";
const LiveCsno = ({ game, gmid }) => {
  const [winner, setWinner] = useState(null);

  const { loading, fetchCasinoResult } = useContext(CasinoContext);
  if (!game) {
    return <div>Loading...</div>;
  }

  let cardsArray = game.card.split(",");
  const gameDetails = transformDataTeenPatti(game.sub);

  const matchCard = splitTeenCards(cardsArray);
  setTimeout(async () => {
    const result = await fetchCasinoResult(gmid, game.mid);
    // //(result);

    if (result) {
      setWinner(result.winnat);
    }
  }, 1000);

  return (
    <div className="relative w-full h-[200px] bg-black ">
      <LiveStreaming url={`https://titan97.live/get-video/${gmid}`} />

      {/* Overlay */}
      <div className="absolute inset-0 flex p-2 text-white z-30 bg-transparent">
        {/* Players' Cards (Left) */}
        <div className="flex flex-col gap-2 p-2 rounded-md">
          <PlayerCards cardsDetail={matchCard} />
        </div>
        {/* Winner (Bottom Left) */}
        {winner && (
          <div className="absolute bottom-2 left-2 flex flex-col gap-2 items-start">
            <div className="text-xs bg-black px-2 py-1 rounded-md">WINNER</div>
            <div className="text-white text-2xl font-bold px-4 py-2 rounded-md">
              {winner || "Waiting for Winner"}
            </div>
          </div>
        )}

        {/* Game ID & Timer (Top Right) */}
        <div className="absolute top-2 right-2 flex flex-col items-end gap-2">
          <div className="text-xs bg-black px-2 py-1 rounded-md">
            RID: {game.mid}
          </div>
          <div className="bg-black text-white text-2xl font-bold px-4 py-2 rounded-md">
            {game.lt}
          </div>
        </div>
      </div>
      {/* <div className="mt-4 p-0 pb-[150px]">
        {gameDetails &&
          gameDetails.length > 0 &&
          gameDetails.map((detail, index) => (
            <TeenPatiRecord
              key={index}
              detail={detail}
              gmid={gmid}
              mid={game.mid}
            />
          ))}
      </div> */}
    </div>
  );
};

export default LiveCsno;
