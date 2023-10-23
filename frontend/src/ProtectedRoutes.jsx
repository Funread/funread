import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { tokenVerify,axiosAuth } from './api';

const ProtectedRoutes = (props) => {
    const [isAuth, setIsAuth] = useState(null); // Inicialmente establecido como null
    const user = useSelector((state) => state.user)

    const rolesCheck = ( () => {
        setIsAuth(false)
        props.roles.forEach(role => {
            user.roles.forEach(userRole => {
                if(userRole.role === role){
                    setIsAuth(true);
                }
            });
        });
    })

    useEffect(() => {
        const checkAuth = async () => {
            if(!props.roles){
                setIsAuth(true)
            }
            if(user.roles){
                await rolesCheck();
            }
            if (isAuth!==false) {
                try {
                    // Realizar la verificación de autenticación aquí
                    tokenVerify().then((res) => {
                        setIsAuth(res.data.login); // Establecer el valor de isAuth
                    })
                } catch (error) {
                    console.error("Error verifying token:", error);
                    setIsAuth(false); // En caso de error, establecer como falso
                }
            } else {
                setIsAuth(false); // Si axiosAuth no está definido, establecer como falso
            }
            
        };

        checkAuth(); // Llamar a la función de verificación de autenticación
    }, [axiosAuth, rolesCheck, isAuth,  props.rol, user.roles]);

        // Renderizar basado en el valor de isAuth
    if (isAuth === null) {
        // Esperando la verificación de autenticación, se puede mostrar un indicador de carga aquí
        return <div>Cargando...</div>;
    } else if (isAuth) {
        // Usuario autenticado
        return <Outlet />;
    } else {
        // Usuario no autenticado, redirigir
        // alert('Access denied, check if you have the permissions to enter in this page or if you are logged in.\n\n\n(las rutas protegidas necesitan de usuarios con roles, el unico rol por el momento es "profesor")\n(cambiar esta alerta a futuro para mostrar los errores de mejor manera, ProtectedRoutes.jsx:59)')
        alert('a')
        //setTimeout(() => { window.location.href = '/';}, 2000);
        return <Navigate to="/" />;
    }
};

export default ProtectedRoutes