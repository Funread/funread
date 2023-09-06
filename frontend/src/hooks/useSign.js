import axios from "axios";

const moment = require("moment");


export const useSign = () => {
 
  const signUp = async(name, lastName, email, password) => {

    try {
      

    const data = await axios({
      method: "post",
      url: "users/new-user/",
      data: {
        email: email,
        name: name,
        lastname: lastName,
        password: password,
        createdat: moment().format(),
        actived: 1,
      },
    });

    if (data.data.email === email) {
      console.log('El usuario ha sido creado con exito');
      console.log(data.data.email);
    }else{
      console.log('El email ya existe, debe ingresar otro');
      console.log(data.data.email);
    }

  } catch (error) {
      console.log(error)
      console.log('Es posible que  ya exista el correo, debe ingresar otro');
  }
  };

  return {
    signUp,
  };
};
