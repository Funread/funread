import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    //devolver true o false dependiendo si el usuario esta logeado o no.
    //deberia agregarse un endpoint en el backend para confirmar la autenticidad del token
    //si la forma de guardar el token cambia unicamente abra de modificar esta seccion
    if(sessionStorage.getItem("jwt") !== null){
        return true;
    }else{
        return false;
    }

}

//revisamos si obtuvimos true o false de la autenticacion, si es true cargamos el elemento al que se queria ir "Outlet"
//si es false nos devolvemos a la landing page, si la ruta de la landing page cambia se cambia en el "Navigate"
const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoutes