import axios from "axios";

export const useLogin = () => {
 
  //esta constante se utiliza para hacer el inicio de session, guardando el token obtenido
  const logIn = (email, password) => {
    return axios.post("http://localhost:8000/users/login/", {
      email: email, 
      password: password,
    }).then((res) => {
      if (res.status === 200 ) {
        sessionStorage.setItem("jwt",res.data.jwt)
        //si se cambia la forma de alamacenar el token se debera cambiar esto
        return "success"
      }
    }).catch(error => {
      return null
    });
  };

  //esta constate se utiliza para tomar una instancia de axios que ya cuente con el endpoint principal y
  //pase por el header el token guardado hacia el backend, para realizar validaciones
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
