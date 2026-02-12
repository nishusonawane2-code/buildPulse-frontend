import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, FileText, Briefcase, Users } from 'lucide-react';

const QuickActions = () => {
    const navigate = useNavigate();

    const actions = [
        { label: 'New Lead', icon: Users, path: '/admin/leads', color: 'bg-amber-500/10 text-amber-500' },
        { label: 'Create Estimate', icon: FileText, path: '/admin/estimates', color: 'bg-emerald-500/10 text-emerald-500' },
        { label: 'Add Project', icon: Briefcase, path: '/admin/projects', color: 'bg-blue-500/10 text-blue-500' },
    ];

    return (
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 mb-10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[100px] -mr-32 -mt-32"></div>

            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center">
                    <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white mr-4 shadow-lg shadow-orange-500/20">
                        <PlusCircle className="w-4 h-4" />
                    </div>
                    Execution Command.
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rapid Deployment</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {actions.map((action) => (
                    <button
                        key={action.label}
                        onClick={() => navigate(action.path)}
                        className="group flex flex-col items-start p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-orange-500/30 hover:bg-white transition-all duration-500 relative overflow-hidden"
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm ${action.color.replace(' text-', ' text-opacity-100 text-').replace('bg-', 'bg-opacity-100 bg-')}`}>
                            <action.icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-orange-500 transition-colors uppercase">Trigger</span>
                        <span className="text-lg font-black text-slate-900 tracking-tight mt-1">{action.label}</span>

                        <div className="absolute bottom-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                            <PlusCircle className="w-6 h-6 text-orange-500/20" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
