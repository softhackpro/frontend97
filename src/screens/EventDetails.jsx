import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router";
import { CasinoContext } from "../services/casino/casino.context";
import LiveStreaming from "../components/LiveStreaming";
import Cards from "../components/Cards";
import TeenPaatiScreen from "./TeenPaatiScreen";

export const EventDetails = () => {
  const { id: gmid } = useParams();
  const { getCasinoDetails } = useContext(CasinoContext);
  // Use ref to maintain stable reference to the context function
  const getCasinoDetailsRef = useRef(getCasinoDetails);

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update ref when context function changes
  useEffect(() => {
    getCasinoDetailsRef.current = getCasinoDetails;
  }, [getCasinoDetails]);

  // Fetch game details on component mount - always fetch from API
  useEffect(() => {
    const fetchGameDetails = async () => {
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

    const intervalId = setInterval(fetchGameDetails, 3000);

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
    </div>
  );
};
