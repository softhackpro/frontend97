import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { CasinoContext } from "../services/casino/casino.context";
import LiveStreaming from "../components/LiveStreaming";
import Cards from "../components/Cards";
import TeenPaatiScreen from "./TeenPaatiScreen";
import TestUi from "../components/Roshan/TestUi";
import AndarBahar from "../components/Roshan/Casino/AndarBahar";
import AmarAkbarAnthony from "../components/Roshan/Casino/AmarAkbarAnthony";
import Kbc from "../components/Roshan/Casino/Kbc";
import Baccarat from "../components/Roshan/Casino/Baccarat";
import DragonTiger20 from "../components/Roshan/Casino/DragonTiger20";
import Dtla from "../components/Roshan/Casino/Dtla";
import Poker from "../components/Roshan/Casino/Poker";
import Lucky7 from "../components/Roshan/Casino/Lucky7";
import Worli from "../components/Roshan/Casino/Lucky7";
import BettingOddsTable from "../components/aniket/BattingOddTable";
import { Lucky7a } from "./Lucky7a";
import { Lucky7b } from "./Lucky7b";
import { Card32 } from "./Card32";

export const EventDetails = () => {
  const { id: gmid } = useParams();
  const { getCasinoDetails } = useContext(CasinoContext);
  const validGameIds = [
    "teen", "lucky15", "ballbyball", "lucky7", "worli", "poker", "ab4", "aaa", "kbc", "baccarat", "dtl20", "dt20", "teen33", "teen42", "teen41", "teen32", "teen20", "teen3", "lucky7eu", "card32eu"
  ];
  // Use ref to maintain stable reference to the context function
  const getCasinoDetailsRef = useRef(getCasinoDetails);

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update ref when context function changes
  useEffect(() => {
    getCasinoDetailsRef.current = getCasinoDetails;
  }, [getCasinoDetails]);

  // Fetch game details on component mount - always fetch from API
  useEffect(() => {
    if (!validGameIds.includes(gmid)) {
      window.location.href = "/Unavailable"
      return;
    }
    const fetchGameDetails = async () => {
      if (loading) {
        console.log("return ");

        return
      }
      try {
        setLoading(true);

        const fetchedGame = await getCasinoDetailsRef.current(gmid);
        if (fetchedGame) {
          setGame(fetchedGame);
        } else {
          setError("Game not found!");
        }
      } catch (err) {
        console.error("Error fetching game details:", err);
        setError("Failed to load game details");
      } finally {
        setLoading(false);
      }
    };

    // fetchGameDetails();

    const intervalId = setInterval(fetchGameDetails, 1000);

    return () => clearInterval(intervalId);
  }, [gmid]);
  // Only gmid in the dependency array

  // Show error if fetch failed
  if (error) {
    return <div className="text-white bg-red-500 p-4 rounded">{error}</div>;
  }

  // Make sure game data is available
  if (!game) {
    return <div className="text-white">No game data available</div>;
  }

  return (
    <div className="flex flex-col w-full  bg-grey text-white ">
      {game?.gtype?.includes("teen") && (
        <TeenPaatiScreen game={game} gmid={gmid} />
      )}
      {
        gmid === "lucky15" || gmid === "ballbyball" ? <TestUi /> : null
      }
      {
        gmid === "ab4" ? <AndarBahar game={game} gmid={gmid} /> : null
      }
      {
        gmid === "aaa" ? <AmarAkbarAnthony game={game} gmid={gmid} /> : null
      }
      {
        gmid === "kbc" ? <Kbc game={game} gmid={gmid} /> : null
      }
      {
        gmid === "baccarat" ? <Baccarat game={game} gmid={gmid} /> : null
      }
      {
        gmid == "dt20" ? <DragonTiger20 game={game} gmid={gmid} /> : null
      }
      {
        gmid == "dtl20" ? <Dtla game={game} gmid={gmid} /> : null
      }
      {
        gmid == "poker" ? <Poker game={game} gmid={gmid} /> : null
      }
      {
        gmid == "worli" ? <Worli game={game} gmid={gmid} /> : null
      }
      {
        gmid == "lucky7" ? <Lucky7a game={game} gmid={gmid} /> : null
      }
      {
        gmid == "lucky7eu" ? <Lucky7b game={game} gmid={gmid} /> : null
      }
      {
        gmid == "card32eu" ? <Card32 game={game} gmid={gmid} /> : null
      }
    </div>
  );
};
