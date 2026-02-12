import React, { useEffect, useState } from 'react';
import estimationService from '../../api/estimationService';
import { useAuth } from '../../context/AuthContext';
import EstimateForm from './EstimateForm';

const Estimates = () => {
    const { token, user } = useAuth();
    const [estimates, setEstimates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEstimateId, setCurrentEstimateId] = useState(null);

    useEffect(() => {
        fetchEstimates();
    }, [token]);

    const fetchEstimates = async () => {
        setLoading(true);
        try {
            const data = await estimationService.getAllEstimates();
            setEstimates(data);
            setError(null);
        } catch (err) {
            console.error("Error fetching estimates:", err);
            setError("Failed to fetch estimates");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this estimate?")) return;
        try {
            await estimationService.deleteEstimate(id);
            fetchEstimates();
        } catch (err) {
            console.error("Error deleting estimate:", err);
            alert("Failed to delete estimate");
        }
    };

    const handleEdit = (id) => {
        setCurrentEstimateId(id);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentEstimateId(null);
        setIsEditing(true);
    };

    const handleCloseForm = () => {
        setIsEditing(false);
        setCurrentEstimateId(null);
        fetchEstimates(); // Refresh list after edit
    };

    if (isEditing) {
        return <EstimateForm estimateId={currentEstimateId} onClose={handleCloseForm} />;
    }

    if (loading) return <div className="text-amber-500 text-center mt-10">Loading estimates...</div>;

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Estimates Library.</h2>
                    <p className="text-slate-400 font-medium text-sm mt-1">Financial projections and valuation records.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-2xl transition-all shadow-xl shadow-orange-500/20 active:scale-95 flex items-center gap-3"
                >
                    <span className="text-lg">+</span> Generate Estimate
                </button>
            </div>

            {error && <div className="bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest p-4 rounded-xl border border-red-100 text-center">{error}</div>}

            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Date</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Protocol</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Descriptor</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Valuation</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {estimates.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <p className="text-slate-300 font-black text-xs uppercase tracking-[0.3em]">No active estimates found.</p>
                                    </td>
                                </tr>
                            ) : (
                                estimates.map((estimate) => (
                                    <tr key={estimate.id} className="hover:bg-orange-50/30 transition-all duration-300 group">
                                        <td className="px-8 py-6 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                            {new Date(estimate.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg ${estimate.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' :
                                                estimate.status === 'REJECTED' ? 'bg-red-100 text-red-600' :
                                                    estimate.status === 'SENT' ? 'bg-blue-100 text-blue-600' :
                                                        'bg-slate-100 text-slate-500'
                                                }`}>
                                                {estimate.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-slate-600 text-xs font-bold truncate max-w-xs">{estimate.notes || '—'}</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <span className="text-sm font-black text-slate-900 tracking-tighter">
                                                ₹{estimate.total.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-center space-x-3">
                                            <button
                                                onClick={() => handleEdit(estimate.id)}
                                                className="text-[9px] font-black uppercase tracking-widest bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-600 px-4 py-2 rounded-xl transition-all"
                                            >
                                                Edit
                                            </button>
                                            {user?.role === 'ADMIN' && (
                                                <button
                                                    onClick={() => handleDelete(estimate.id)}
                                                    className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white border border-red-100 px-4 py-2 rounded-xl transition-all active:scale-95"
                                                >
                                                    Purge
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Estimates;
