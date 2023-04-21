import axios from 'axios';
import apiConfig from './apiConfig';

const getToken = () => {
    const cookies = document.cookie.split(';');
    let jwt = '';
    cookies.forEach((cookie) => {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'jwt') {
            jwt = value;
        }
    });
    return jwt;
};

const axiosClient = axios.create({
    baseURL: apiConfig.baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const jwt = getToken();
        if (jwt) {
            config.headers['authorization'] = `Bearer ${jwt}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

export default axiosClient;
