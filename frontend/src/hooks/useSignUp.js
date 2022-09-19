import api from "../api/api";
import axios from "axios";

export const useSignUp = () => {
  const userList = async (state) => {
    const peticion = await axios({
      method: "get",
      url: "http://localhost:8000/users/list",
      responseType: "json",
    });

    state(peticion.data);
  };

  return {
    userList,
  };
};
