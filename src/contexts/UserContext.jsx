import { createContext, useState, useEffect } from 'react';

export const loggedUserContext = createContext({
    email: ""
});

export const LoggedUserContextProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedUser');
        if (storedUser) {
            setLoggedUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <loggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
            {children}
        </loggedUserContext.Provider>
    )
}