import { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        var cookies = document.cookie.split('; ');
        for (var i = 0; i < cookies.length; i++) {
            var parts = cookies[i].split('=');
            var name = parts[0];
            var value = parts[1];
            if (name === 'jwt') {
                console.log(value);
                setToken(value);
                
                break;
            }
        }

    }, []);
    const login = (token, account) => {
        setToken(token);
        setAccount(account);
    };

    const logout = () => {
        setToken(null);
        setAccount(null);
    };

    return <AuthContext.Provider value={{ token, login, logout, account }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
