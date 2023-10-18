import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";

//esta constate se utiliza para tomar una instancia de axios que ya cuente con el endpoint principal y
  //pase por el header el token guardado hacia el backend, para realizar validaciones
export const axiosAuth = () => {
    if(sessionStorage.getItem("jwt") !== null){
//   const user = useSelector((state) => state.user)
// if(user.jwt !== null){
        return axios.create({
        baseURL: "http://localhost:8000/",
        headers: {Authorization: sessionStorage.getItem("jwt")}
        // headers: {Authorization: user.jwt}
        });
    }else{
        console.error('axiosAuth equals null: verify you are login')
        return null;
    }
}

export const axiosWithoutAuth = () => {
    return axios.create({
    baseURL: "http://localhost:8000/"
    });
}