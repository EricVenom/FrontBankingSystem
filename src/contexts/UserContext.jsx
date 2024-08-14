import { createContext, useState, useEffect } from 'react';

export const loggedUserContext = createContext({});

export const LoggedUserContextProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [loggedBankAccounts, setLoggedBankAccounts] = useState(null);
    const [loggedPixKeys, setLoggedPixKeys] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('loggedUser');
        if (storedUser) {
            setLoggedUser(JSON.parse(storedUser));
        }

        // const storedBankAccountIds = localStorage.getItem('bankAccountIds');
        // if (storedBankAccountIds) {
        //     const bankAccountIds = JSON.parse(storedBankAccountIds);
        //     setLoggedBankAccounts(bankAccountIds);
        // }
    }, []);

    return (
        <loggedUserContext.Provider value={{ loggedUser, setLoggedUser, loggedBankAccounts, setLoggedBankAccounts, loggedPixKeys, setLoggedPixKeys }}>
            {children}
        </loggedUserContext.Provider>
    )
}