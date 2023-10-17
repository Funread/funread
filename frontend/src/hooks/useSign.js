import axios from "axios";

const moment = require("moment");


export const useSign = () => {
 
  const signUp = (name, email, password) => {
      return axios({
      method: "post",
      url: "http://localhost:8000/users/new-user/",
      data: {
        email: email,
        name: name,
        lastname: "Falta propiedad en frontend (Formulario)",
        password: password,
        createdat: moment().format(),
        actived: 1,
        username: null
      },
    }).then( (res) => {
      if(res.status === 201){
        return 'success'
      }
    }).catch( (error) => {
      return error.response.data.email[0]
    });
  };

  return {
    signUp
  };
};
