import axios from 'axios';

const getToken = () => {
    const cookies = document.cookie.split(';');
    let jwt2 = null;
    cookies.forEach((cookie) => {
        const [name, value] = cookie.split('=');
        if (name.trim() === 'jwt') {
            jwt2 = value;
        }
    });
    return jwt2;
};

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/',
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${getToken()}`,
    },
});

export default axiosClient;
