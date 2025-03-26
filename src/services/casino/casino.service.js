import axios from "axios";

export const getAllCasinoGame = async () => {
  try {
    const response = await axios.get("https://titan97.live/get-casinotable");

    console.log(response);

    return response.data;
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
