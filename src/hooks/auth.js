import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosClient from '~/api/apiClient';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        var cookies = document.cookie.split('; ');
        for (var i = 0; i < cookies.length; i++) {
            var parts = cookies[i].split('=');
            var name = parts[0];
            var value = parts[1];
            if (name === 'jwt') {
                console.log(value);
                setToken(value);

                axios
                    .post('https://pbl5-parking-api.onrender.com/decode', { token: value })
                    .then((response) => {
                        console.log(response?.data?.data?.account);
                        setAccount(response?.data?.data?.account);
                    })
                    .catch((error) => {
                        const cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                        document.cookie = cookie;
                        setAccount(null);
                        setToken(null);
                        navigate('/', { replace: true });
                    });
                break;
            }
        }
        // eslint-disable-next-line
    }, []);
    const login = (token, account) => {
        setToken(token);
        setAccount(account);
    };

    const logout = () => {
        setToken(null);
        setAccount(null);
        const cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = cookie;
        axiosClient.defaults.headers.common['authorization'] = '';
    };

    return <AuthContext.Provider value={{ token, login, logout, account }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
