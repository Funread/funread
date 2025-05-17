import { axiosAuth } from "./axiosInstances";
import { store } from "../redux/store"; // Importar el store de Redux

export const getUserPoints = async (userId) => {
  try {
    const response = await axiosAuth().get(
      `UserPoints/api/user-points/user/${userId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user points:", error);
    throw error;
  }
};

export const addPointsToUser = async (userId, points) => {
  try {
    const response = await axiosAuth().post(
      `UserPoints/api/user-points/addPoints/${userId}/`,
      { points }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding points to user:", error);
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await axiosAuth().get(
      `UserPoints/api/user-points/leaderboard/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching top ten:", error);
    throw error;
  }
}

export const getCurrentRank = async (userId) => {
  try {
    const response = await axiosAuth().get(
      `UserPoints/api/user-points/rank/${userId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current rank:", error);
    throw error;
  }
};
