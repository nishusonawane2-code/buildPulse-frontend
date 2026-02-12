import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import projectService from '../api/projectService';
import { toast } from 'sonner';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await projectService.getProjectById(id);
                setProject(data);
            } catch (err) {
                console.error("Failed to fetch project details:", err);
                toast.error("Failed to load project details");
                navigate('/projects');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-slate-100 border-t-orange-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!project) return null;

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-100 pb-20">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[80vh] w-full overflow-hidden bg-slate-900">
                <img
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-10 md:p-20">
                    <div className="container mx-auto">
                        <div className="inline-flex items-center gap-3 bg-orange-500/20 backdrop-blur-md px-4 py-2 rounded-2xl mb-6 border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Advanced Deployment</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none mb-4">
                            {project.title}
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                            {project.category} Implementation • {project.city}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="container mx-auto px-6 -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column: Technical Specs */}
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 h-fit">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 mb-8">Technical Ledger</h3>

                        <div className="space-y-8">
                            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Protocol Status</span>
                                <span className="bg-slate-900 text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">
                                    {project.status}
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Architecture Scale</span>
                                <span className="text-slate-900 text-sm font-black">{project.scale || "Pending Sync"}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Execution window</span>
                                <span className="text-slate-900 text-sm font-black">{project.durationMonths ? `${project.durationMonths} Months` : "Pending Sync"}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Structural Quality</span>
                                <span className="text-slate-900 text-sm font-black">{project.materials || "Standard"}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Deployment City</span>
                                <span className="text-slate-900 text-sm font-black">{project.city}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Completion Date</span>
                                <span className="text-slate-900 text-sm font-black">
                                    {project.completedAt ? new Date(project.completedAt).toLocaleDateString() : 'Active'}
                                </span>
                            </div>
                            {project.budget > 0 && (
                                <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Investment Value</span>
                                    <span className="text-orange-600 text-sm font-black">₹{project.budget.toLocaleString()}</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-12 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Inquiry Hash</p>
                            <p className="text-[10px] font-mono text-slate-300 text-center break-all">{project.id}</p>
                        </div>
                    </div>

                    {/* Right Column: Case Study Story */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Executive Summary */}
                        <div className="bg-white rounded-[2.5rem] p-12 shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 blur-[60px] rounded-full -mr-10 -mt-10"></div>

                            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-8 leading-none">
                                Architecture <span className="text-orange-500">Genesis.</span>
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed font-medium mb-10">
                                {project.description || "Synthesizing architectural vision with industrial precision to deliver a standard-setting deployment. This project represents BuiltPulse's commitment to high-fidelity construction and structural integrity."}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">The Challenge</h4>
                                    <p className="text-sm text-slate-600 font-bold leading-relaxed">
                                        Managing structural constraints while maintaining the aesthetic flow required a unique approach to load-bearing distribution.
                                    </p>
                                </div>
                                <div className="p-8 bg-orange-50 rounded-[2rem] border border-orange-100/50">
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-orange-400 mb-4">The Solution</h4>
                                    <p className="text-sm text-slate-700 font-bold leading-relaxed">
                                        Implemented a hybrid structural spine that allowed for open-plan transparency without compromising seismic resilience.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Timeline */}
                        <div className="bg-white rounded-[2.5rem] p-12 shadow-xl shadow-slate-200/40 border border-slate-100">
                            <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mb-12 uppercase">Project <span className="text-orange-500">Timeline.</span></h3>

                            <div className="space-y-12">
                                {[
                                    { step: "01", label: "Structural Survey", desc: "Initiating deep-core soil testing and site boundary verification." },
                                    { step: "02", label: "Foundation Shell", desc: "Reinforced concrete deployment and subterranean utility routing." },
                                    { step: "03", label: "Aesthetic Integration", desc: "Curating high-end materials and finalizing the structural envelope." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-8 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black group-hover:bg-orange-500 transition-colors duration-500">
                                                {item.step}
                                            </div>
                                            {idx < 2 && <div className="w-px h-full bg-slate-100 mt-2"></div>}
                                        </div>
                                        <div className="pb-8">
                                            <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">{item.label}</h5>
                                            <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA - Lead Capture */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                            <div className="relative z-10 text-center space-y-8">
                                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none overflow-hidden">
                                    Interested in a similar <br />
                                    <span className="text-orange-500 underline decoration-white/20 underline-offset-8">Deployment?</span>
                                </h3>
                                <p className="text-slate-400 font-medium max-w-md mx-auto">
                                    Connect with our technical team to discuss how we can adapt this architectural blueprint for your vision.
                                </p>
                                <button
                                    onClick={() => navigate('/contactus')}
                                    className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-2xl shadow-orange-500/30"
                                >
                                    Initiate Connection →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
