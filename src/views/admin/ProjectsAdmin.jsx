import React, { useEffect, useState } from 'react';
import projectService from '../../api/projectService';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const STATUS_COLORS = {
    PLANNING: 'text-blue-400 bg-blue-500/20',
    IN_PROGRESS: 'text-amber-400 bg-amber-500/20',
    COMPLETED: 'text-green-400 bg-green-500/20',
    ON_HOLD: 'text-red-400 bg-red-500/20'
};

const ProjectsAdmin = () => {
    const { token, user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'RESIDENTIAL',
        status: 'PLANNING',
        budget: 0,
        city: '',
        scale: '',
        durationMonths: 0,
        materials: '',
        progressPercentage: 0,
        milestones: '',
        siteGallery: ''
    });

    useEffect(() => {
        fetchProjects();
    }, [token]);

    const fetchProjects = async () => {
        try {
            const data = await projectService.getAllProjects();
            setProjects(data);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (project) => {
        setCurrentProject(project);
        setFormData({
            title: project.title || '',
            description: project.description || '',
            category: project.category || 'RESIDENTIAL',
            status: project.status || 'PLANNING',
            budget: project.budget || 0,
            city: project.city || '',
            scale: project.scale || '',
            durationMonths: project.durationMonths || 0,
            materials: project.materials || '',
            progressPercentage: project.progressPercentage || 0,
            milestones: project.milestones || '',
            siteGallery: project.siteGallery || ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await projectService.updateProject(currentProject.id, formData);
            toast.success("Project telemetry updated successfully.");
            setIsModalOpen(false);
            fetchProjects();
        } catch (err) {
            console.error("Update failed:", err);
            toast.error("Failed to sync project updates.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        try {
            await projectService.deleteProject(id);
            setProjects(projects.filter(p => p.id !== id));
            toast.success("Project purged from manifest.");
        } catch (error) {
            console.error("Failed to delete project", error);
            toast.error("Purge operation failed.");
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center p-20">
            <div className="w-8 h-8 border-2 border-slate-100 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Project Matrix.</h2>
                    <p className="text-slate-400 font-medium text-sm mt-1">Operational view of active construction deployments.</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pulse Signals</span>
                    <div className="w-px h-4 bg-slate-100"></div>
                    <span className="text-xs font-black text-orange-500">{projects.length} Active</span>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Project / Registry</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Path</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-orange-50/30 transition-all duration-300 group">
                                    <td className="px-8 py-6">
                                        <p className="text-slate-900 font-bold group-hover:text-orange-600 transition-colors uppercase tracking-tight">{project.title}</p>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{project.city} • {project.category}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-slate-900 font-bold text-xs">{project.clientName || 'GUEST'}</p>
                                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{project.clientPhone}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1">
                                            <div className="bg-orange-500 h-full transition-all" style={{ width: `${project.progressPercentage}%` }}></div>
                                        </div>
                                        <p className="text-[10px] font-black text-slate-600">{project.progressPercentage}% SYNC</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${project.status === 'IN_PROGRESS' ? 'bg-orange-100 text-orange-600' :
                                            project.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-600' :
                                                project.status === 'PLANNING' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-slate-100 text-slate-400'
                                            }`}>
                                            {project.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(project)}
                                                className="text-[9px] font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-100 px-4 py-2 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                                            >
                                                Telemetry
                                            </button>
                                            {user?.role === 'ADMIN' && (
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white border border-red-50 px-4 py-2 rounded-xl transition-all"
                                                >
                                                    Purge
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Admin Telemetry Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-12 shadow-2xl shadow-slate-900/20 border border-slate-100">
                        <header className="mb-10 flex justify-between items-start">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Update Pulse Telemetry.</h3>
                                <p className="text-slate-400 font-medium text-sm mt-1">Modifying live build data for client portal visibility.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">✕</button>
                        </header>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Construction Progress (%)</label>
                                    <input
                                        type="range" min="0" max="100"
                                        className="w-full accent-orange-500"
                                        value={formData.progressPercentage}
                                        onChange={(e) => setFormData({ ...formData, progressPercentage: parseInt(e.target.value) })}
                                    />
                                    <div className="text-right font-black text-orange-500 text-sm mt-1">{formData.progressPercentage}%</div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Project Status</label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3 outline-none focus:border-orange-500/20 transition-all font-bold text-slate-900"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="PLANNING">PLANNING</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="COMPLETED">COMPLETED</option>
                                        <option value="ON_HOLD">ON HOLD</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Upcoming Milestones (Semicolon separated)</label>
                                    <textarea
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3 outline-none focus:border-orange-500/20 transition-all font-medium text-slate-600 min-h-[120px]"
                                        placeholder="Foundation Layer;Internal Electrical;Painting starts Monday"
                                        value={formData.milestones}
                                        onChange={(e) => setFormData({ ...formData, milestones: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Site Gallery URLs (Comma separated)</label>
                                    <textarea
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3 outline-none focus:border-orange-500/20 transition-all font-medium text-slate-600 min-h-[120px]"
                                        placeholder="https://img1.jpg, https://img2.jpg"
                                        value={formData.siteGallery}
                                        onChange={(e) => setFormData({ ...formData, siteGallery: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Scale (sq.ft)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3 outline-none focus:border-orange-500/20 transition-all font-bold text-slate-900"
                                            value={formData.scale}
                                            onChange={(e) => setFormData({ ...formData, scale: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Months Plan</label>
                                        <input
                                            type="number"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-3 outline-none focus:border-orange-500/20 transition-all font-bold text-slate-900"
                                            value={formData.durationMonths}
                                            onChange={(e) => setFormData({ ...formData, durationMonths: parseInt(e.target.value) })}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-5 bg-orange-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-600 shadow-2xl shadow-orange-500/20 transition-all active:scale-95"
                                >
                                    Broadcast Telemetry →
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsAdmin;
