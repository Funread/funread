import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

export const useLogin = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
 
  //esta constante se utiliza para hacer el inicio de session, guardando el token obtenido
  const logIn = (email, password) => {
    return axios.post("http://localhost:8000/users/login/", {
      email: email, 
      password: password,
    }).then((res) => {
      if (res.status === 200 ) {
        sessionStorage.setItem("jwt",res.data.jwt)
        //si se cambia la forma de alamacenar el token se debera cambiar esto
        dispatch(addUser(res.data))
        return "success"
      }else if(res.status === 403){
        return "Error de inicio de session"
      }
    }).catch(error => {
      return error.response.data.detail
    });
  };

  //esta constate se utiliza para tomar una instancia de axios que ya cuente con el endpoint principal y
  //pase por el header el token guardado hacia el backend, para realizar validaciones
  const axiosAuth = () => {
    if(sessionStorage.getItem("jwt") !== null){
    //el codigo comentado es para permitir usar el jwt con redux, pero se deja con el sessionStorage para comodidad de momento
    //if(user.jwt !== null){
      return axios.create({
        baseURL: "http://localhost:8000/",
        headers: {Authorization: sessionStorage.getItem("jwt")}
        //headers: {Authorization: user.jwt}
      });
    }else{
      return null;
    }
  }

  const axiosWithoutAuth = () => {
      return axios.create({
        baseURL: "http://localhost:8000/"
      });
  }

  return {logIn,axiosAuth,axiosWithoutAuth};
};
