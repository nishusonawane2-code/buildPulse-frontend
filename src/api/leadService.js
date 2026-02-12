import axiosClient from './axiosClient';

const leadService = {
    createLead: async (leadData) => {
        // leadData: { name, phone, email, source: 'ESTIMATOR' }
        const response = await axiosClient.post('/leads', leadData);
        return response.data; // returns Lead object with ID
    },

    getAllLeads: async () => {
        const response = await axiosClient.get('/leads');
        return response.data;
    },

    updateStatus: async (id, status) => {
        const response = await axiosClient.put(`/leads/${id}/status?status=${status}`);
        return response.data;
    },

    getSummary: async () => {
        const response = await axiosClient.get('/leads/summary');
        return response.data;
    },

    deleteLead: async (id) => {
        const response = await axiosClient.delete(`/leads/${id}`);
        return response.data;
    }
};

export default leadService;
