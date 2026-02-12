import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const EstimateForm = ({ estimateId, onClose }) => {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [status, setStatus] = useState('DRAFT');
    const [notes, setNotes] = useState('');
    const [items, setItems] = useState([
        { description: '', quantity: 1, unitPrice: 0 }
    ]);
    const [leadId, setLeadId] = useState(''); // Keep simple for now, can be expanded to select from Leads
    const [projectId, setProjectId] = useState(''); // Can be expanded

    // Calculated totals for preview
    const [totals, setTotals] = useState({ subtotal: 0, tax: 0, total: 0 });

    useEffect(() => {
        if (estimateId) {
            fetchEstimate();
        }
    }, [estimateId]);

    useEffect(() => {
        calculateTotals();
    }, [items]);

    const fetchEstimate = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/estimates/${estimateId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = response.data;
            setStatus(data.status);
            setNotes(data.notes || '');
            setItems(data.items.map(i => ({
                description: i.description,
                quantity: i.quantity,
                unitPrice: i.unitPrice
            })));
            setLeadId(data.leadId || '');
            setProjectId(data.projectId || '');
        } catch (err) {
            console.error("Error fetching estimate:", err);
            alert("Failed to load estimate");
        } finally {
            setLoading(false);
        }
    };

    const calculateTotals = () => {
        let sub = 0;
        items.forEach(item => {
            sub += (item.quantity || 0) * (item.unitPrice || 0);
        });
        const tax = sub * 0.10; // 10%
        setTotals({
            subtotal: sub,
            tax: tax,
            total: sub + tax
        });
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
    };

    const removeItem = (index) => {
        if (items.length > 1) {
            const newItems = items.filter((_, i) => i !== index);
            setItems(newItems);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            status,
            notes,
            leadId: leadId || null,
            projectId: projectId || null,
            items: items.map(i => ({
                description: i.description,
                quantity: parseInt(i.quantity),
                unitPrice: parseFloat(i.unitPrice)
            }))
        };

        try {
            if (estimateId) {
                await axios.put(`http://localhost:8080/api/estimates/${estimateId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:8080/api/estimates', payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            onClose();
        } catch (err) {
            console.error("Error saving estimate:", err);
            alert("Failed to save estimate. Ensure all fields are valid.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-slate-400 font-black text-xs uppercase tracking-[0.3em] text-center mt-20">Reconstructing Blueprint...</div>;

    return (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-10 space-y-10">
            <div className="flex justify-between items-center pb-8 border-b border-slate-50">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                        {estimateId ? 'Refining Proposal.' : 'New Projection.'}
                    </h3>
                    <p className="text-slate-400 font-medium text-xs mt-1">Configure financial parameters for this deployment.</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-2 group"
                >
                    <span className="text-xl group-hover:rotate-90 transition-transform duration-300">×</span> Terminate Window
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Meta Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status Protocol</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-black text-[10px] uppercase tracking-widest focus:border-orange-500/30 outline-none transition-all appearance-none cursor-pointer"
                        >
                            <option value="DRAFT">Draft</option>
                            <option value="SENT">Sent</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Descriptor / Identification</label>
                        <input
                            type="text"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Project ref, client name, etc."
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold text-sm focus:border-orange-500/30 outline-none transition-all placeholder:text-slate-300"
                        />
                    </div>
                </div>

                {/* Line Items */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Resource Allocation</h4>
                        <span className="h-px flex-1 mx-6 bg-slate-50"></span>
                    </div>

                    <div className="bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100 overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="pb-4 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Resource / Scope</th>
                                    <th className="pb-4 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400 w-24">Unit</th>
                                    <th className="pb-4 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400 w-32">Valuation</th>
                                    <th className="pb-4 px-4 text-[9px] font-black uppercase tracking-widest text-slate-400 w-32 text-right">Aggregate</th>
                                    <th className="pb-4 w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100/50">
                                {items.map((item, index) => (
                                    <tr key={index} className="group">
                                        <td className="py-5 px-4">
                                            <input
                                                type="text"
                                                value={item.description}
                                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                                required
                                                placeholder="Define item scope..."
                                                className="w-full bg-transparent border-none text-slate-900 font-bold text-sm focus:ring-0 placeholder:text-slate-300"
                                            />
                                        </td>
                                        <td className="py-5 px-4 font-black text-[10px] text-slate-900">
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                                                required
                                                className="w-full bg-transparent border-none focus:ring-0 text-center"
                                            />
                                        </td>
                                        <td className="py-5 px-4 font-black text-[10px] text-slate-900">
                                            <div className="flex items-center gap-1">
                                                <span className="text-slate-400">₹</span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    value={item.unitPrice}
                                                    onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                                                    required
                                                    className="w-full bg-transparent border-none focus:ring-0"
                                                />
                                            </div>
                                        </td>
                                        <td className="py-5 px-4 text-right text-slate-900 font-black text-xs tracking-tighter">
                                            ₹{((item.quantity || 0) * (item.unitPrice || 0)).toLocaleString()}
                                        </td>
                                        <td className="py-5 text-center">
                                            {items.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(index)}
                                                    className="w-6 h-6 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs flex items-center justify-center border border-red-100"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button
                        type="button"
                        onClick={addItem}
                        className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-xl border border-orange-100 transition-all active:scale-95"
                    >
                        + Append Line Item
                    </button>
                </div>

                {/* Totals & Actions */}
                <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-10 pt-10 border-t border-slate-50">
                    <div className="flex items-center gap-10">
                        <div className="text-right">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Sub-Valuation</p>
                            <p className="text-slate-900 font-black text-sm tracking-tighter">₹{totals.subtotal.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Regulatory Tax (10%)</p>
                            <p className="text-slate-900 font-black text-sm tracking-tighter">₹{totals.tax.toLocaleString()}</p>
                        </div>
                        <div className="text-right bg-orange-50 px-8 py-4 rounded-3xl border border-orange-100">
                            <p className="text-[9px] font-black uppercase tracking-widest text-orange-500 mb-1">Total Aggregate</p>
                            <p className="text-slate-900 font-black text-2xl tracking-tighter">₹{totals.total.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-8 py-4 rounded-2xl bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95"
                        >
                            Cancel Session
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-orange-500/20 active:scale-95 disabled:opacity-50"
                        >
                            {saving ? 'Syncing...' : 'Authorize Estimate'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EstimateForm;
