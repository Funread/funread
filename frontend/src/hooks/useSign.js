import axios from "axios";

const moment = require("moment");


export const useSign = () => {
 
  const signUp = async(name, email, password) => {

    try {
      
    const data = await axios({
      method: "post",
      url: "http://localhost:8000/users/new-user/",
      data: {
        email: email,
        name: name,
        lastname: "Falta propiedad en frontend (Formulario)",
        password: password,
        createdat: moment().format(),
        actived: 1,
      },
    });
    if (data.status === 200 ){
      if (data.data.email === email) {
        return 'success';
      }else{
        return 'El email ya existe, debe ingresar otro';
      }
    }
  } catch (error) {
      return error;
      //console.log('Es posible que  ya exista el correo, debe ingresar otro');
  }
  };

  return {
    signUp,
  };
};
