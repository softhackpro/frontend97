import axios from "axios";

export const getAllSports = async () => {
  try {
    const response = await axios.get("https://titan97.live/get-allsports");
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch sports:",
      error.response?.data || error.message
    );
    return error.response?.data || error.message;
  }
};
export const getMatchList = async (id) => {
  //(id);

  try {
    const response = await axios.get(
      `https://titan97.live/get-matchlist/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch matchlist:",
      error.response?.data || error.message
    );
    return error.response?.data || error.message;
  }
};
export const getAllMatchList = async () => {
  try {
    const response = await axios.get(
      "https://titan97.live/get-allsportsmatchlist"
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch all matchlist:",
      error.response?.data || error.message
    );
    return error.response?.data || error.message;
  }
};
