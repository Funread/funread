import React, { useEffect, useState } from 'react';
import AccessDeniedModal from './Components/ErrorHandler/AccessDeniedModal';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { tokenVerify, axiosAuth } from './api';

const ProtectedRoutes = (props) => {
    const [isAuth, setIsAuth] = useState(null); // null = cargando, true = autorizado, false = denegado
    const [showModal, setShowModal] = useState(false);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // 1. Verificar si hay usuario logueado
                if (!user.email || user.email === "") {
                    console.log("No hay usuario logueado");
                    setIsAuth(false);
                    return;
                }

                // 2. Verificar el token JWT
                const tokenResponse = await tokenVerify();
                if (!tokenResponse.data.login) {
                    console.log("Token inválido");
                    setIsAuth(false);
                    return;
                }

                // 3. Verificar roles si se requieren
                if (props.roles && props.roles.length > 0) {
                    if (!user.roles || user.roles.length === 0) {
                        console.log("Usuario sin roles asignados");
                        setIsAuth(false);
                        return;
                    }

                    // Verificar si el usuario tiene alguno de los roles requeridos
                    const hasRequiredRole = user.roles.some(userRole => 
                        props.roles.includes(userRole.role)
                    );

                    console.log("Roles requeridos:", props.roles);
                    console.log("Roles del usuario:", user.roles.map(r => r.role));
                    console.log("Tiene acceso:", hasRequiredRole);

                    setIsAuth(hasRequiredRole);
                } else {
                    // Si no se requieren roles específicos, solo verificar autenticación
                    setIsAuth(true);
                }
            } catch (error) {
                console.error("Error verificando autenticación:", error);
                setIsAuth(false);
            }
        };

        checkAuth();
    }, [user.email, user.roles, props.roles]); // Dependencias estables

    // Renderizar basado en el valor de isAuth
    if (isAuth === null) {
        // Esperando la verificación de autenticación
        return <div>Cargando...</div>;
    }

    if (isAuth) {
        // Usuario autenticado y autorizado
        return <Outlet />;
    }

    // Usuario no autenticado o no autorizado
    const handleClose = () => {
        setShowModal(false);
        window.location.href = '/';
    };

    if (!showModal) setShowModal(true);
    
    return <AccessDeniedModal show={showModal} onClose={handleClose} />;
};

export default ProtectedRoutes;