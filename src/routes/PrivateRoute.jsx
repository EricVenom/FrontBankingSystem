import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { loggedUserContext } from '../contexts/UserContext';

const PrivateRoute = ({ children }) => {
    const { loggedUser } = useContext(loggedUserContext);

    if (!loggedUser) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
