import React, { useEffect, useState } from 'react';
import leadService from '../../api/leadService';
import projectService from '../../api/projectService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const STATUS_OPTIONS = ['NEW', 'CONTACTED', 'QUALIFIED', 'LOST'];

const Leads = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const data = await leadService.getAllLeads();
                setLeads(data);
            } catch (err) {
                console.error("Error fetching leads:", err);
                setError("Failed to fetch leads");
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, [token]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await leadService.updateStatus(id, newStatus);
            // Optimistic update
            setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status");
        }
    };

    const handleConvert = async (lead) => {
        if (!window.confirm(`Are you sure you want to convert ${lead.name} into a Project?`)) return;

        try {
            await projectService.convertLeadToProject(lead.id);
            alert("Project created successfully!");
            // Refresh leads to show updated status
            const data = await leadService.getAllLeads();
            setLeads(data);
            navigate('/admin/projects');
        } catch (error) {
            console.error("Failed to convert lead", error);
            alert("Failed to convert lead to project");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this lead? This action cannot be undone.")) return;

        try {
            await leadService.deleteLead(id);
            setLeads(leads.filter(lead => lead.id !== id));
        } catch (error) {
            console.error("Failed to delete lead", error);
            alert("Failed to delete lead. You might not have permission.");
        }
    };

    if (loading) return <div className="text-amber-500 text-center mt-10">Loading leads...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Leads Ledger.</h2>
                    <p className="text-slate-400 font-medium text-sm mt-1">Management of potential partnership identities.</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Database Entry</span>
                    <div className="w-px h-4 bg-slate-100"></div>
                    <span className="text-xs font-black text-orange-500">{leads.length} Records</span>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identify / Contact</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Regional Zone</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Origin Stream</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {leads.length > 0 ? (
                                leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-orange-50/30 transition-all duration-300 group">
                                        <td className="px-8 py-6">
                                            <p className="text-slate-900 font-bold group-hover:text-orange-600 transition-colors">{lead.name}</p>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{lead.email}</p>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{lead.phone}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{lead.city || 'GLOBAL'}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${lead.source === 'ESTIMATOR' ? 'bg-blue-100 text-blue-600' :
                                                lead.source === 'WEBSITE' ? 'bg-emerald-100 text-emerald-600' :
                                                    'bg-slate-100 text-slate-500'
                                                }`}>
                                                {lead.source}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <select
                                                value={lead.status || 'NEW'}
                                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                                className="bg-slate-50 text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl px-4 py-2 border border-slate-100 focus:border-orange-500/30 outline-none transition-all appearance-none cursor-pointer hover:bg-white"
                                            >
                                                {STATUS_OPTIONS.map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-8 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'ARCHIVE'}
                                        </td>
                                        <td className="px-8 py-6 text-right space-x-3">
                                            <button
                                                onClick={() => handleConvert(lead)}
                                                className="text-[9px] font-black uppercase tracking-widest bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                                            >
                                                Convert
                                            </button>
                                            {user?.role === 'ADMIN' && (
                                                <button
                                                    onClick={() => handleDelete(lead.id)}
                                                    className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white border border-red-100 px-4 py-2 rounded-xl transition-all active:scale-95"
                                                >
                                                    Purge
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-8 py-16 text-center">
                                        <p className="text-slate-300 font-black text-xs uppercase tracking-[0.3em]">No valid streams found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leads;
