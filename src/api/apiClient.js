import axios from 'axios';
import apiConfig from './apiConfig';

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

const axiosClient =
    getToken() !== ''
        ? axios.create({
              baseURL: apiConfig.baseURL,
              headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${getToken()}`,
              },
          })
        : axios.create({
              baseURL: apiConfig.baseURL,
              headers: {
                  'Content-Type': 'application/json',
              },
          });

export default axiosClient;
