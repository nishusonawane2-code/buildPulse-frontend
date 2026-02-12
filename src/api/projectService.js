import axiosClient from './axiosClient';

const projectService = {
    getAllProjects: async () => {
        const response = await axiosClient.get('/projects');
        return response.data;
    },

    getProjectsByCategory: async (category) => {
        const response = await axiosClient.get(`/projects/category/${category}`);
        return response.data;
    },

    getProjectById: async (id) => {
        const response = await axiosClient.get(`/projects/${id}`);
        return response.data;
    },

    convertLeadToProject: async (leadId) => {
        const response = await axiosClient.post(`/projects/convert/${leadId}`);
        return response.data;
    },

    deleteProject: async (id) => {
        const response = await axiosClient.delete(`/projects/${id}`);
        return response.data;
    },

    getMyProjects: async () => {
        const response = await axiosClient.get('/projects/my');
        return response.data;
    },

    updateProject: async (id, projectData) => {
        const response = await axiosClient.put(`/projects/${id}`, projectData);
        return response.data;
    }
};

export default projectService;
