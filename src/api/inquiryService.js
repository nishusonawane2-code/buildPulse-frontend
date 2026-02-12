import axiosClient from './axiosClient';

const inquiryService = {
    getAllInquiries: async (page = 0, size = 10) => {
        const response = await axiosClient.get(`/admin/inquiries?page=${page}&size=${size}`);
        return response.data;
    },

    getInquiryById: async (id) => {
        const response = await axiosClient.get(`/admin/inquiries/${id}`);
        return response.data;
    },

    submitInquiry: async (data) => {
        const response = await axiosClient.post('/inquiries', data);
        return response.data;
    }
};

export default inquiryService;
