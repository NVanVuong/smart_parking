import axiosClient from './apiClient';
import qs from 'qs';

const userApi = {
    searchParkingSite: (keyword) => {
        const params = qs.stringify({ keyword });
        return axiosClient.get(`parkingsites?${params}`);
    },
    getParkingNearBy: (lat, lng, distance = 4) => {
        const params = qs.stringify({ lat, lng, distance });
        return axiosClient.get(`/parkingsites/nearby?${params}`);
    },
    getMyReservation: () => {
        return axiosClient.get(`/reservation/myreserve`);
    },
    bookReservation: (params = {}) => {
        return axiosClient.post('/reservation', { ...params });
    },
};

export default userApi;
