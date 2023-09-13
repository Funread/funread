import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";

const ProtectedRoutes = () => {
    const { axiosAuth } = useLogin();
const [isAuth, setIsAuth] = useState(null); // Inicialmente establecido como null

useEffect(() => {
    const checkAuth = async () => {
        if (axiosAuth) {
            try {
                // Realizar la verificación de autenticación aquí
                const response = await axiosAuth().post("users/tokenVerify/");
                const result = response.data.login;
                setIsAuth(result); // Establecer el valor de isAuth
            } catch (error) {
                console.error("Error verifying token:", error);
                setIsAuth(false); // En caso de error, establecer como falso
            }
        } else {
            setIsAuth(false); // Si axiosAuth no está definido, establecer como falso
        }
    };

    checkAuth(); // Llamar a la función de verificación de autenticación
}, [axiosAuth]);

// Renderizar basado en el valor de isAuth
if (isAuth === null) {
    // Esperando la verificación de autenticación, se puede mostrar un indicador de carga aquí
    return <div>Cargando...</div>;
} else if (isAuth) {
    // Usuario autenticado
    return <Outlet />;
} else {
    // Usuario no autenticado, redirigir
    return <Navigate to="/" />;
}
};

export default ProtectedRoutes