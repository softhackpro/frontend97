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

export const EventDetails = () => {
  const { id: gmid } = useParams();
  const { getCasinoDetails } = useContext(CasinoContext);
  const validGameIds = [
    "teen", "lucky15", "ballbyball", "ab4", "aaa", "kbc", "baccarat", "dt202", "dt20", "teen33", "teen42", "teen41", "teen32", "teen20", "teen3"
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
      if(loading){
        //("return ");
        
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

    fetchGameDetails();

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
    <div className="flex flex-col w-full  bg-grey text-white  pb-[100px] mb-[60px]">
      {game?.gtype?.includes("teen") && (
        <TeenPaatiScreen game={game} gmid={gmid} />
      )}
      {
        gmid === "lucky15" || gmid === "ballbyball" ? <TestUi /> : null
      }
      {
        gmid === "ab4" ? <AndarBahar game={game} gmid={gmid}/> : null
      }
      {
        gmid === "aaa" ? <AmarAkbarAnthony game={game} gmid={gmid}/> : null
      }
      {
        gmid === "kbc" ? <Kbc game={game} gmid={gmid}/> : null
      }
      {
        gmid === "baccarat" ? <Baccarat game={game} gmid={gmid}/> : null
      }
      {
        gmid == "dt202" ? <DragonTiger20 game={game} gmid={gmid}/> : null
      }
      {
        gmid == "dt20" ? <Dtla game={game} gmid={gmid}/> : null
      }
    </div>
  );
};
