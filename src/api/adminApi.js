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
    create: (cate, data) => {
        return axiosClient.post(category[cate], data);
    },
    update: (cate, id, data) => {
        return axiosClient.put(`${category[cate]}/${id}`, data);
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
};

export default adminApi;
