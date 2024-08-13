import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { loggedUserContext } from '../contexts/UserContext';
import { getCookie } from '../utils/storage';
import api from '../services/api';

const PrivateRoute = ({ children }) => {
    const { loggedUser } = useContext(loggedUserContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = getCookie("auth");
                const { status } = await api.post(`/auth/isValidToken?token=${token}`);
                status === 200 && setIsAuthenticated(true);
            } catch (error) {
                console.log("Erro na verificação do token:", error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        }

        verifyToken();
    }, [])

    if (loading) {
        return <div>Redirecionando...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
