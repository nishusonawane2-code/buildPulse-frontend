import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import projectService from '../api/projectService';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'RESIDENTIAL', 'COMMERCIAL', 'INTERIOR', 'INDUSTRIAL', 'RENOVATION'];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeCategory === 'ALL') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAllProjects();
      setProjects(data);
      setFilteredProjects(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-100">
      <Navbar />

      {/* Hero Section - Airy & Minimal */}
      <div className="pt-40 pb-20 relative overflow-hidden bg-slate-900 border-b border-slate-800">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2000"
            alt="Construction"
            className="w-full h-full object-cover opacity-20 blur-[8px] scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/40 to-slate-900"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-2xl mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Global Portfolio</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8">
              Built<span className="text-orange-500">Pulse.</span> <br />
              <span className="text-slate-400">Architecture Ledger.</span>
            </h1>
            <p className="text-slate-300 font-medium text-lg leading-relaxed max-w-xl">
              Discover a diverse range of successful deployments, from luxury residential ecosystems to complex industrial infrastructure.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Modern Glass Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-16 bg-white/50 backdrop-blur-md p-2 rounded-[2rem] border border-slate-100 inline-flex shadow-sm">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeCategory === category
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20'
                : 'bg-transparent text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Content State Handling */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-[2.5rem] h-[500px] animate-pulse border border-slate-100"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-8">
              <span className="text-3xl text-red-500">!</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4 uppercase">System Sync Error</h3>
            <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">{error}</p>
            <button
              onClick={fetchProjects}
              className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-slate-900/20"
            >
              Retry Protocol
            </button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-8 text-slate-300 text-3xl">
              ?
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4 uppercase">No Signals Found</h3>
            <p className="text-slate-500 font-medium max-w-sm mx-auto">Try re-calibrating your category filters to find matching streams.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
