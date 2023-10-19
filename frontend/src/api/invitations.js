import { axiosWithoutAuth, axiosAuth } from "./axiosInstances";
//agregar una funcion por cada endpoint necesario, asegurarse de usar el async-await, ya que son peticiones a la api

export async function checkJoin(code, password) {
    return axiosWithoutAuth().post("join/checkJoin/",{
        code:code,
        password:password
    })
}

export async function searchCode(code){
   return axiosWithoutAuth().get("join/search/"+code,)
}

export async function new_join (bookid,classesid) {
    return axiosAuth().post("join/new-join/",{
        bookid:String(bookid),
        classesid:String(classesid)
    })
}