import axios from "axios";

export const getAllCasinoGame = async () => {
  try {
    const response = await axios.get("https://titan97.live/get-casinotable");
    // //(response, "from casino service");
    const validGameIds = [
      "teen", "lucky15", "ballbyball", "ab4", "aaa", "kbc", "baccarat", 
      "dtl20", "dt20", "teen33", "teen42", "teen41", "teen32", "teen20", "teen3"
    ];
    const games = response.data?.data?.t1 || []
    // //(games, " ye games hai");
    
    // Filter out games whose gtype is in validGameIds
    const filteredGames = games.filter(game => validGameIds.includes(game.gmid));
    

    return filteredGames;
  } catch (error) {
    console.error("Failed to fetch casino games:", error);
    return error.response?.data || error.message;
  }
};

export const getCasinoGameDetailsById = async (id) => {
  try {
    const response = await axios.get(
      `https://titan97.live/get-allcasino/${id}`
    ); 
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch casino game by ID:",
      error.response?.data || error.message
    );
    return error.response?.data || error.message;
  }
};

export const getCasinoResult = async (type, mid) => {
  try {
    const response = await axios.post("https://titan97.live/get-casinoresult", {
      type: type,
      mid: mid,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch casino result:",
      error.response?.data || error.message
    );
    return error.response?.data || error.message;
  }
};
