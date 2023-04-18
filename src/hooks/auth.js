import { useState, createContext, useContext } from 'react';
import { verify } from 'jsonwebtoken';
const AuthContext = createContext(null);

const secret = process.env.REACT_APP_JWT_SECRET;

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const login = (token) => {
        setToken(token);
        const user = verify(token, secret);
        console.log(user);
    };

    const logout = () => {
        setToken(null);
    };

    return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
