import axios from "axios";

const moment = require('moment');

export const useSignUp = () => {
  
  const userList = async (state) => {
    const peticion = await axios("users/list", {
      method: "get",
      responseType: "json",
      headers: {
        "Content-Type": "application/x-www-formpurlencoded",
      },
    });
    state(peticion.request);
  };

  const searchUser = async () => {
    
    const peticion = await axios("users/user/213", {
      method: "get",
      responseType: "json",
      headers: {
        "Content-Type": "application/x-www-formpurlencoded",
      },
    });
    console.log(peticion.request);
  };

  const createUser = async (name, email,password) => {
    axios({
      method: "post",
      url: "users/new-user/",
      data: {
        "userid": 145,
        "email": email,
        "name": name,
        "lastname": "Mezjgfa Castillo",
        "password": password,
        "createdat": moment().format(),
        "actived": 1
    },
    });
  };

  return {
    userList,
    searchUser,
    createUser,
  };
};
