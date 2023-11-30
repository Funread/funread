import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {login} from "../api"

export const useLogin = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
 
  //esta constante se utiliza para hacer el inicio de session, guardando el token obtenido
  const logIn = (email, password) => {

    return login(email, password).then((res) => {
          sessionStorage.setItem("jwt",res.data.jwt)
          //si se cambia la forma de alamacenar el token se debera cambiar esto
          dispatch(addUser(res.data))

          if(!res.data.roles[0]){
            return "noRoles"
          }
          return res.data.roles
      }).catch(error => {
        return error.response.data.detail
      });
  };

  return {logIn};
};
