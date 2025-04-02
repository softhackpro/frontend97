import React, { createContext, useEffect, useState } from "react";
import { getAllCasinoGame, getCasinoGameDetailsById, getCasinoResult } from "./casino.service.js";

export const CasinoContext = createContext();

const CasinoProvider = ({ children }) => {
  const [allCasinoGames, setAllCasinoGames] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCasinoGames();
  }, []);

  const fetchCasinoGames = async () => {
    setLoading(true); 
    setError(null);
    try {
      const res = await getAllCasinoGame();
      // //(res, "from casino context");
      
      setAllCasinoGames(res);
    } catch (err) {
      setError(err.message || "Failed to fetch casino games");
    } finally {
      setLoading(false);
    }
  };

  const getCasinoById = (id) => {
    if (loading) return null;
    return allCasinoGames.find((game) => game.gmid === id) || null;
  };

  const getCasinoDetails = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCasinoGameDetailsById(id);
      return res.data;
    } catch (err) {
      setError(err.message || "Failed to fetch casino game details");
    } finally {
      setLoading(false);
    }
  };

  const fetchCasinoResult = async (type, mid) => {
    //("here");
    
    setLoading(true);
    setError(null);
    try {
      const result = await getCasinoResult(type, mid);
     
      return result;
    } catch (err) {
      setError(err.message || "Failed to fetch casino result");
      return null;
    } finally {
      setLoading(false);
      await getCasinoResult(type, mid)
    }
  };

  return (
    <CasinoContext.Provider
      value={{
        allCasinoGames,
    
        loading,
        error,
        getCasinoById,
        getCasinoDetails,
        fetchCasinoResult,
      }}
    >
      {children}
    </CasinoContext.Provider>
  );
};

export default CasinoProvider;
