import axios from "axios";

export const useLogin = () => {
 
  const logIn = (email, password) => {
    return axios.post("http://localhost:8000/users/login/", {
      email: email, 
      password: password,
    }).then((res) => {
      if (res.status === 200 ) {
        //esperando a que se termine la story FB2023-2, remplazar el segundo string por el jwt en cuanto se pueda
        sessionStorage.setItem("jwt",res.data.jwt)
        return "success"
      }
    }).catch(error => {
      return null
    });
  };

  const axiosAuth = () => {
    if(sessionStorage.getItem("jwt") !== null){
      return axios.create({
        baseURL: "http://localhost:8000/",
        headers: {Authorization: sessionStorage.getItem("jwt")}
      });
    }else{
      return null;
    }
  }

  return {logIn,axiosAuth};
};
