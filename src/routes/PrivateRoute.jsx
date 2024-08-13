import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { loggedUserContext } from '../contexts/UserContext';
import { getCookie } from '../utils/storage'

const PrivateRoute = ({ children }) => {
    const { loggedUser } = useContext(loggedUserContext);
    const isAuthenticated = getCookie("auth") ? true : false;


    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
