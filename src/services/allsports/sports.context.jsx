import React, { useState, useEffect, createContext } from "react";
import { getAllSports, getMatchList, getAllMatchList } from "./sports.service";

export const SportsContext = createContext();

const SportsProvider = ({ children }) => {
  const [allSports, setAllSports] = useState([]);
  const [allMatchList, setAllMatchList] = useState([]);
  const [inPlayMatches, setInPlayMatches] = useState([]);
  const [matchList, setMatchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSports = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllSports();
        setAllSports(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchSports();
    getMatchListById(4);
    getAllSportsMatchList();
    getInplayMatches();
  }, []);

  const getMatchListById = async (matchId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMatchList(matchId);
      //(response.data.t1);
      
      setMatchList([...(response.data.t1 || [])]);
      //  setMatchList(response.data);
    } catch (err) {
      setMatchList([]);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getAllSportsMatchList = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllMatchList();
      setAllMatchList([
        ...(response.data.t1 || []),
        ...(response.data.t2 || []),
      ]);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getInplayMatches = async () => {
    let inPlayEtids = [
      { etid: 1, name: "Football" },
      { etid: 15, name: "Basketball" },
      { etid: 2, name: "Tennis" },
      { etid: 4, name: "Cricket" },
      { etid: 10, name: "Horse Racing" },
      { etid: 65, name: "GreyHound Racing" },
      { etid: 68, name: "Esoccor" },
    ];

    setLoading(true);
    setError(null);

    // Get today's and tomorrow's dates in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split("T")[0];

    try {
      // Fetch match data for all in-play event IDs
      const matchData = await Promise.all(
        inPlayEtids.map(async ({ etid, name }) => {
          try {
            const response = await getMatchList(etid);

            // Extract matches
            const allMatches = [
              ...(response.data.t1 || []),
              ...(response.data.t2 || []),
            ];

            // Filtering function for each match
            const categorizedMatches = {
              etid,
              name,
              todayMatches: [],
              tomorrowMatches: [],
              inPlay: [],
            };

            allMatches.forEach((match) => {
              if (!match?.stime) return;

              const matchDate = new Date(match.stime);
              const matchDateStr = matchDate.toISOString().split("T")[0];

              if (match.iplay) {
                categorizedMatches.inPlay.push(match);
              } else if (matchDateStr === today) {
                categorizedMatches.todayMatches.push(match);
              } else if (matchDateStr === tomorrowDate) {
                categorizedMatches.tomorrowMatches.push(match);
              }
            });

            return categorizedMatches;
          } catch (err) {
            //(err);

            return {
              etid,
              name,
              todayMatches: [],
              tomorrowMatches: [],
              inPlay: [],
            };
          }
        })
      );

      // Store filtered matches in state
      setInPlayMatches(matchData);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SportsContext.Provider
      value={{
        allSports,
        loading,
        error,
        getMatchListById,
        matchList,
        allMatchList,
        inPlayMatches,
        getInplayMatches,
      }}
    >
      {children}
    </SportsContext.Provider>
  );
};

export default SportsProvider;
