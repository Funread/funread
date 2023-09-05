import axios from "axios";

export const useLogin = () => {
 
  const loginIn = async(email, password) => {
    try {
      const data = await axios({
        method: "post",
        url: "http://localhost:8000/users/login/",
        data: {
          email: email, 
          password: password,
        },
      });
      if (data.status === 200 ) {
        //esperando a que se termine la story FB2023-2, remplazar el segundo string por el jwt en cuanto se pueda
        sessionStorage.setItem("JWT","PRUEBA, aun no se resive el jwt")
        //return "success"
      }
    } catch (error) {
        //return error
    }
  };

  const axiosAuth = () => {
    if(sessionStorage.getItem("JWT") !== null){
      const client = axios.create({
        baseURL: "http://localhost:8000/",
        headers: {Authorization: sessionStorage.getItem("JWT")}
      });
      return client
    }else{
      return 0
    }
  }

  return loginIn;
};
