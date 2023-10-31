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
        if (res.status === 200 ) {
          dispatch(addUser(res.data))
          return "success"
        }else if(res.status === 403){
          return "Error de inicio de session"
        }
      }).catch(error => {
        return error.response.data.detail
      });
  };

  return {logIn};
};
