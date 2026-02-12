import axiosClient from './axiosClient';

const estimationService = {
    createEstimate: async (estimtationData) => {
        // estimationData: { leadId, builtUpArea, floors, quality, city... }
        const response = await axiosClient.post('/estimates/calculate', estimtationData);
        return response.data;
    },

    getSummary: async () => {
        const response = await axiosClient.get('/estimates/summary');
        return response.data;
    },

    getAllEstimates: async () => {
        const response = await axiosClient.get('/estimates');
        return response.data;
    },

    deleteEstimate: async (id) => {
        const response = await axiosClient.delete(`/estimates/${id}`);
        return response.data;
    }
};

export default estimationService;
