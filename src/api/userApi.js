import axiosClient from './apiClient';
import qs from 'qs';

const userApi = {
    getAccount: (id) => {
        return axiosClient.get(`accounts/${id}`);
    },
    changePassword: (id, params) => {
        return axiosClient.patch(`accounts/${id}/change-password`, { ...params });
    },
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
    searchMyReservation: (keyword) => {
        const params = qs.stringify({ keyword });
        return axiosClient.get(`/reservation/myreserve?${params}`);
    },
    bookReservation: (params = {}) => {
        return axiosClient.post('/reservation', { ...params });
    },
};

export default userApi;
