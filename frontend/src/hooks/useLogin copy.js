import axios from "axios";

const moment = require("moment");


export const useLogin = () => {
 
  const loginIn = async(email, password) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "users/login/",
      data: {
        email: email, 
        password: password,
      },
    });

    console.log(data.data)
    if (data.status === 200 ) {
      console.log('Usuario autenticado');
      console.log(data.data.email);
      console.log(data.data.password);
    }

  } catch (error) {
      console.log(error)
      console.log('El usuario o la contrasena no coinciden');
  }
  };

  return {
    loginIn,
  };
};
