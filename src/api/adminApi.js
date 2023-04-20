import axiosClient from './apiClient';
import qs from 'qs';

export const category = {
    accounts: 'accounts',
    parkingsites: 'parkingsites',
};

const adminApi = {
    getAll: (cate) => {
        return axiosClient.get(category[cate]);
    },
    get: (cate, id) => {
        return axiosClient.get(`${category[cate]}/${id}`);
    },
    create: (cate, params = {}) => {
        return axiosClient.post(category[cate], { ...params });
    },
    update: (cate, id, params) => {
        return axiosClient.patch(`${category[cate]}/${id}`, { ...params });
    },
    delete: (cate, id) => {
        return axiosClient.delete(`${category[cate]}/${id}`);
    },
    searchParkingSite: (availMin, availMax, priceMin, priceMax, keyword) => {
        const params = qs.stringify({
            avail: { gte: availMin, lte: availMax },
            price: { gte: priceMin, lte: priceMax },
            keyword,
        });
        return axiosClient.get(`parkingsites?${params}`);
    },
    searchParkingSiteUser: (keyword) => {
        const params = qs.stringify({ keyword });
        return axiosClient.get(`parkingsites?${params}`);
    },
    searchAccount: (keyword, type) => {
        const params = qs.stringify({ keyword, type });
        return axiosClient.get(`accounts?${params}`);
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

export default adminApi;
