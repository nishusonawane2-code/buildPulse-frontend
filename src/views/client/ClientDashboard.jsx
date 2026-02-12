import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import projectService from '../../api/projectService';
import { toast } from 'sonner';

const ClientDashboard = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectService.getMyProjects();
                // Ensure unique projects by ID to prevent double visibility from backend dual-mapping
                const uniqueData = Array.from(new Map(data.map(item => [item.id, item])).values());
                setProjects(uniqueData);
            } catch (error) {
                console.error("Error fetching projects:", error);
                toast.error("Signal Lost: Failed to fetch project data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'PLANNING': return 'bg-blue-50 text-blue-500 border-blue-100';
            case 'IN_PROGRESS': return 'bg-orange-50 text-orange-500 border-orange-100';
            case 'COMPLETED': return 'bg-emerald-50 text-emerald-500 border-emerald-100';
            default: return 'bg-slate-50 text-slate-400 border-slate-100';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-slate-100 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    const primaryProject = projects[0];

    return (
        <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-orange-100 pb-20">
            <Navbar />

            {/* Optimized Header: Merged Project & Global Context */}
            <div className="pt-32 pb-16 relative overflow-hidden bg-white border-b border-slate-50">
                <div className="absolute top-0 right-0 w-[40%] h-full bg-orange-500/5 blur-[120px] rounded-full -mr-20 -mt-20"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <div className="inline-flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-2xl shadow-xl shadow-slate-900/10">
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Live Pulse Active</span>
                            </div>
                            {primaryProject && (
                                <span className={`px-4 py-2 rounded-2xl border text-[10px] font-black uppercase tracking-widest ${getStatusColor(primaryProject.status)}`}>
                                    {primaryProject.status.replace('_', ' ')}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-none mb-6">
                            {primaryProject ? (
                                <>
                                    Active Deployment: <br />
                                    <span className="text-orange-500 underline decoration-slate-100 underline-offset-8">
                                        {primaryProject.title}
                                    </span>
                                </>
                            ) : (
                                <>
                                    Welcome back, <br />
                                    <span className="text-orange-500 underline decoration-slate-100 underline-offset-8">
                                        {user?.name || 'Architect.'}
                                    </span>
                                </>
                            )}
                        </h1>

                        {primaryProject && (
                            <div className="flex flex-wrap items-center gap-8 mt-10">
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Architecture Scale</p>
                                    <p className="text-sm font-black text-slate-900">{primaryProject.scale || "Pending Sync"}</p>
                                </div>
                                <div className="w-px h-8 bg-slate-100 hidden md:block"></div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Deployment Location</p>
                                    <p className="text-sm font-black text-slate-900">{primaryProject.city}</p>
                                </div>
                                <div className="w-px h-8 bg-slate-100 hidden md:block"></div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Client Protocol</p>
                                    <p className="text-sm font-black text-slate-900">{user?.name || primaryProject.clientName}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                {projects.length > 0 ? (
                    <div className="space-y-32">
                        {projects.map((project, idx) => (
                            <div key={project.id} className="space-y-20 animate-in fade-in slide-in-from-bottom-5 duration-1000">

                                {/* If multiple projects, show a separator/sub-header for non-primary */}
                                {idx > 0 && (
                                    <div className="pt-20 border-t border-slate-100">
                                        <h3 className="text-2xl font-extrabold text-slate-900 mb-8 uppercase tracking-tight">Secondary Deployment: {project.title}</h3>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                                    {/* Column 1: Live Pulse Progress */}
                                    <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-orange-600 mb-12">Real-Time Progression</h3>

                                        <div className="relative h-48 w-48 mx-auto flex items-center justify-center">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle
                                                    cx="96" cy="96" r="80"
                                                    stroke="currentColor" strokeWidth="12" fill="transparent"
                                                    className="text-slate-200"
                                                />
                                                <circle
                                                    cx="96" cy="96" r="80"
                                                    stroke="currentColor" strokeWidth="12" fill="transparent"
                                                    strokeDasharray={502.4}
                                                    strokeDashoffset={502.4 - (502.4 * (project.progressPercentage || 0)) / 100}
                                                    className="text-orange-500 transition-all duration-1000 ease-out"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
                                                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{project.progressPercentage || 0}%</span>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Complete</span>
                                            </div>
                                        </div>

                                        <p className="mt-12 text-sm text-slate-500 font-medium leading-relaxed text-center">
                                            {project.progressPercentage > 50
                                                ? "Project is currently in final structural integration phases."
                                                : "Early stage subterranean architectural works are active."}
                                        </p>
                                    </div>

                                    {/* Column 2: Milestones & Feed */}
                                    <div className="lg:col-span-2 space-y-8">
                                        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-100/50">
                                            <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mb-8 uppercase">
                                                Technical <span className="text-orange-500">Milestones.</span>
                                            </h3>

                                            <div className="space-y-6">
                                                {(project.milestones || "Structural Survey;Foundation Shell Deployment;MEP Infrastructure Integration;Architectural Finishes")
                                                    .split(';')
                                                    .map((milestone, idx) => (
                                                        <div key={idx} className="flex items-center gap-6 group">
                                                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                                                {idx + 1}
                                                            </div>
                                                            <p className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                                                                {milestone.trim()}
                                                            </p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        {/* Site Gallery Snapshot */}
                                        <div className="bg-slate-900 rounded-[2.5rem] p-10 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
                                            <div className="relative z-10">
                                                <div className="flex items-center justify-between mb-8">
                                                    <h3 className="text-xl font-extrabold text-white tracking-tight uppercase">Site Snapshots.</h3>
                                                    <button className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:text-white transition-colors">Full Archive →</button>
                                                </div>

                                                <div className="grid grid-cols-3 gap-4">
                                                    {(project.siteGallery || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5,https://images.unsplash.com/photo-1503387762-592deb58ef4e,https://images.unsplash.com/photo-1590381105924-c72589b9ef3f")
                                                        .split(',')
                                                        .slice(0, 3)
                                                        .map((url, idx) => (
                                                            <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-white/5 relative group/img">
                                                                <img src={url.trim()} alt="Site progress" className="w-full h-full object-cover opacity-60 group-hover/img:scale-110 group-hover/img:opacity-100 transition-all duration-700" />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto py-32 text-center space-y-6">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                            <span className="text-4xl">🛰️</span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-4">No Active Signals Located.</h3>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                            Once your architectural project is initialized by the BuiltPulse command center, its live telemetry will manifest on this ledger.
                        </p>
                        <button
                            onClick={() => window.location.href = '/contactus'}
                            className="inline-flex items-center gap-3 px-10 py-5 bg-orange-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all active:scale-95 shadow-2xl shadow-orange-500/30 mt-8"
                        >
                            Initiate Connection →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientDashboard;
