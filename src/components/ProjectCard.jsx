import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    return (
        <div className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden hover:shadow-orange-500/10 hover:-translate-y-3 transition-all duration-700 relative">
            {/* Image Container */}
            <div className="relative h-72 overflow-hidden">
                <img
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1500ms]"
                />

                {/* Glassmorphism Badge */}
                <div className="absolute top-6 left-6 backdrop-blur-md bg-white/20 border border-white/30 px-4 py-2 rounded-2xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white drop-shadow-sm">
                        {project.category}
                    </span>
                </div>

                {/* City Overlay */}
                {project.city && (
                    <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-slate-900/40 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/10">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-white">{project.city}</span>
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-10 relative">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4 group-hover:text-orange-600 transition-colors uppercase leading-none">
                    {project.title}
                </h3>

                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                    {project.description || "Synthesizing architectural vision with industrial precision to deliver a standard-setting deployment."}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Completion Protocol</p>
                        <p className="text-xs font-black text-slate-900 tracking-tight">
                            {new Date(project.completedAt).toLocaleDateString()}
                        </p>
                    </div>

                    <button
                        onClick={() => navigate(`/projects/${project.id}`)}
                        className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-sm"
                    >
                        <span className="text-lg">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
