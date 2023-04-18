import axiosClient from './apiClient';

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
        return axiosClient.get(
            `parkingsites?avail[gte]=${availMin}&avail[lte]=${availMax}&price[gte]=${priceMin}&price[lte]=${priceMax}&keyword=${keyword}`,
        );
    },
    searchAccount: (keyword, type) => {
        return axiosClient.get(`accounts?keyword=${keyword}&type=${type}`);
    },
    getMyReservation: () => {
        return axiosClient.get(`/reservation/myreserve`);
    },
    bookReservation: (params = {}) => {
        return axiosClient.post('/reservation', { ...params });
    },
};

export default adminApi;
