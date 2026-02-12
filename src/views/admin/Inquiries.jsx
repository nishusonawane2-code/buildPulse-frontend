import React, { useEffect, useState } from 'react';
import inquiryService from '../../api/inquiryService';
import { toast } from 'sonner';

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedInquiry, setSelectedInquiry] = useState(null);

    const fetchInquiries = async (currentPage) => {
        setLoading(true);
        try {
            const data = await inquiryService.getAllInquiries(currentPage, 10);
            setInquiries(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Failed to fetch inquiries", error);
            toast.error("Failed to load inquiries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries(page);
    }, [page]);

    const handleViewDetails = async (id) => {
        try {
            const details = await inquiryService.getInquiryById(id);
            setSelectedInquiry(details);
        } catch (error) {
            toast.error("Failed to load inquiry details");
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Inquiry Stream.</h1>
                    <p className="text-slate-400 font-medium text-sm mt-1">Real-time incoming communication signals.</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Signal Count</span>
                    <div className="w-px h-4 bg-slate-100"></div>
                    <span className="text-xs font-black text-orange-500">{totalPages * 10}+</span>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Identify / Subject</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Point</th>
                                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center text-slate-300 font-black text-xs uppercase tracking-[0.3em] animate-pulse">Scanning Stream...</td>
                                </tr>
                            ) : inquiries.length > 0 ? (
                                inquiries.map((inquiry) => (
                                    <tr key={inquiry.id} className="hover:bg-orange-50/30 transition-all duration-300 group">
                                        <td className="p-8 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                            {new Date(inquiry.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-8">
                                            <p className="text-slate-900 font-bold group-hover:text-orange-600 transition-colors">{inquiry.name}</p>
                                            <p className="text-[10px] text-orange-500 font-black uppercase tracking-widest mt-1">{inquiry.subject}</p>
                                        </td>
                                        <td className="p-8 text-slate-400 text-[10px] font-black uppercase tracking-widest">{inquiry.email}</td>
                                        <td className="p-8 text-right">
                                            <button
                                                onClick={() => handleViewDetails(inquiry.id)}
                                                className="text-[9px] font-black uppercase tracking-widest bg-slate-900 hover:bg-orange-500 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-95"
                                            >
                                                Inspect
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center text-slate-300 font-black text-xs uppercase tracking-widest">No active communications found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-8 flex justify-between items-center bg-slate-50/50 border-t border-slate-100">
                    <button
                        disabled={page === 0 || loading}
                        onClick={() => setPage(prev => prev - 1)}
                        className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-xl disabled:opacity-30 hover:bg-slate-50 transition-all active:scale-95"
                    >
                        Previous Phase
                    </button>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Section {page + 1} of {totalPages}</span>
                    <button
                        disabled={page >= totalPages - 1 || loading}
                        onClick={() => setPage(prev => prev + 1)}
                        className="px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-xl disabled:opacity-30 hover:bg-slate-50 transition-all active:scale-95"
                    >
                        Next Phase
                    </button>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedInquiry && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-xl p-4 transition-all duration-500">
                    <div className="bg-white w-full max-w-2xl rounded-[2.5rem] border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                            <div>
                                <h1 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-2">Subject Identity</h1>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Signal Analysis.</h2>
                            </div>
                            <button onClick={() => setSelectedInquiry(null)} className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center font-bold">✕</button>
                        </div>
                        <div className="p-10 space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Origin</p>
                                    <p className="text-slate-900 font-bold">{selectedInquiry.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Endpoint</p>
                                    <p className="text-slate-900 font-bold">{selectedInquiry.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Callsign</p>
                                    <p className="text-slate-900 font-bold">{selectedInquiry.phone || 'N/A'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Signal Date</p>
                                    <p className="text-slate-900 font-bold">{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Topic Signature</p>
                                <p className="text-lg font-black text-orange-500 tracking-tight italic">{selectedInquiry.subject}</p>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Payload Content</p>
                                <p className="text-slate-600 font-medium leading-relaxed">{selectedInquiry.message}</p>
                            </div>
                        </div>
                        <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex justify-end">
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-orange-500 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-slate-900/10"
                            >
                                Terminate Inspection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inquiries;
