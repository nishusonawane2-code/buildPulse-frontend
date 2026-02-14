import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { useAuth } from '../../context/AuthContext';

const Projects = () => {
    const { token } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'RESIDENTIAL',
        imageUrl: '',
        city: '',
        completedAt: ''
    });

    const categories = ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'RENOVATION'];

    useEffect(() => {
        fetchProjects();
    }, [token]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/projects');
            setProjects(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
        try {
            await axiosClient.delete(`/projects/${id}`);
            fetchProjects();
        } catch (err) {
            console.error("Error deleting project:", err);
            alert("Failed to delete project");
        }
    };

    const handleEdit = (project) => {
        setCurrentProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            category: project.category,
            imageUrl: project.imageUrl,
            city: project.city,
            completedAt: project.completedAt || ''
        });
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setCurrentProject(null);
        setFormData({
            title: '',
            description: '',
            category: 'RESIDENTIAL',
            imageUrl: '',
            city: '',
            completedAt: ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProject) {
                await axiosClient.put(`/projects/${currentProject.id}`, formData);
            } else {
                await axiosClient.post('/projects', formData);
            }
            setIsModalOpen(false);
            fetchProjects();
        } catch (err) {
            console.error("Error saving project:", err);
            alert("Failed to save project");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (loading) return <div className="text-amber-500 text-center mt-10">Loading projects...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Projects Management</h2>
                <button
                    onClick={handleAdd}
                    className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded transition-colors"
                >
                    + Add New Project
                </button>
            </div>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-neutral-800 rounded-xl overflow-hidden shadow-lg border border-neutral-700 flex flex-col">
                        <div className="h-48 bg-neutral-700 relative">
                            {project.imageUrl ? (
                                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-500">No Image</div>
                            )}
                            <div className="absolute top-2 right-2 bg-black/70 text-amber-500 text-xs px-2 py-1 rounded">
                                {project.category}
                            </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-neutral-400 text-sm mb-4 line-clamp-3 flex-1">{project.description}</p>
                            <div className="flex justify-between items-center text-xs text-neutral-500 mb-4">
                                <span>{project.city}</span>
                                <span>{project.completedAt}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white py-2 rounded transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="flex-1 bg-red-500/20 hover:bg-red-500/40 text-red-500 py-2 rounded transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-800 p-8 rounded-2xl w-full max-w-2xl border border-neutral-700 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold text-white mb-6">
                            {currentProject ? 'Edit Project' : 'Add New Project'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-neutral-400 text-sm mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white focus:border-amber-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-neutral-400 text-sm mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white focus:border-amber-500 outline-none"
                                >
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-neutral-400 text-sm mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white focus:border-amber-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-neutral-400 text-sm mb-1">Completion Date</label>
                                <input
                                    type="date"
                                    name="completedAt"
                                    value={formData.completedAt}
                                    onChange={handleChange}
                                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white focus:border-amber-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-neutral-400 text-sm mb-1">Image URL</label>
                                <input
                                    type="text"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white focus:border-amber-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-neutral-400 text-sm mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-3 text-white focus:border-amber-500 outline-none"
                                ></textarea>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white py-3 rounded-lg font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black py-3 rounded-lg font-bold"
                                >
                                    Save Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
