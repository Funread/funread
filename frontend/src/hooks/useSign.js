import { new_user } from "../api";

const moment = require("moment");


export const useSign = () => {
 
  const signUp = (name, email, password) => {
      return new_user(name,email,password).then( (res) => {
      if(res.status === 201){
        return 'success'
      }
    }).catch( (error) => {
      console.log(error)
      return error.response.data.email[0]
    });
  };

  return {
    signUp
  };
};
