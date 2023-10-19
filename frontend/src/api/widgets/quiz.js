import { useEffect } from 'react'
import axios from 'axios'
import { useLogin } from '../../hooks/useLogin'

const baseURL = 'http://localhost:8000/Options'

/* 
Respuesta
Puntos
Respuesta Correcta
Id Widget
CreadoPor
Image
 */
export const CreateQuiz = async (widgetData) => {
  const { axiosAuth } = useLogin()
  console.log('Llegue')

  //   try {
  //     if (axiosAuth() !== null) {
  //       const response = await axiosAuth().post('Options/new_option/', widgetData)
  //       return response.data
  //     }
  //   } catch (error) {
  //     throw error
  //   }
}

// if(axiosAuth() !== null){                            -Primero hacemos un if que confirme que podemos usar axiosAuth
//   axiosAuth().get("users/list/").then((res) => {   - Hacemos nuestra consulta, Nota: no se debe colocar toda la url, el endpoint pincipal ya esta en la instancia de axios (http://localhost:8000/) por lo que colocamos la porcion del endpoint que falta para realizar la consulta, en este caso "users/list/"
//     console.log(res.data)                          - Obtenemos nuestros resultados, podemos usar res.data, res.headers, res.status, entre algunos mas
//   })
// }else{                           -Encaso de no poder usar axiosAuth, podemos hacer diferentes accioes, informar que no se puede usar, movernos a la pagina de login, lo que se necesite en el momento
//   console.log("unAuthenticaded")
// }
