import React, { useEffect, useState } from 'react';
import leadService from '../../api/leadService';
import estimationService from '../../api/estimationService';

import DashboardCharts from '../../components/dashboard/DashboardCharts';
import ActivityLog from '../../components/dashboard/ActivityLog';
import QuickActions from '../../components/dashboard/QuickActions';

const StatCard = ({ title, value, change, isLoading }) => (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-orange-500/30 transition-all duration-500 shadow-xl shadow-slate-200/40 group">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 group-hover:text-orange-500 transition-colors">{title}</h3>
        <div className="flex items-end justify-between">
            {isLoading ? (
                <div className="h-10 w-28 bg-slate-100 animate-pulse rounded-xl"></div>
            ) : (
                <span className="text-4xl font-black text-slate-900 tracking-tighter">{value}</span>
            )}
            <div className="flex flex-col items-end">
                <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">{change}</span>
                <div className="w-8 h-1 bg-slate-100 rounded-full mt-2 group-hover:bg-orange-500/20 transition-colors"></div>
            </div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [leadSummary, setLeadSummary] = useState(null);
    const [estimateSummary, setEstimateSummary] = useState(null);
    const [recentLeads, setRecentLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [lSummary, eSummary, rLeads] = await Promise.all([
                    leadService.getSummary(),
                    estimationService.getSummary(),
                    leadService.getAllLeads()
                ]);

                setLeadSummary(lSummary);
                setEstimateSummary(eSummary);
                // Simple client-side slice for now, ideally backend should support pagination/sorting
                setRecentLeads(rLeads.slice().reverse().slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatCurrency = (amount) => {
        if (!amount) return '₹0';
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    }

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Identity Overview.</h1>
                    <p className="text-slate-400 font-medium text-sm mt-1">Real-time status of your construction ecosystem.</p>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white px-5 py-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    Engine Sync: {new Date().toLocaleTimeString()}
                </div>
            </div>

            <QuickActions />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard
                    title="Total Leads"
                    value={leadSummary?.totalLeads || 0}
                    change={leadSummary?.newLeadsToday ? `+${leadSummary.newLeadsToday} NEW` : 'SYNCED'}
                    isLoading={loading}
                />
                <StatCard
                    title="Action Required"
                    value={leadSummary?.pendingLeads || 0}
                    change="PENDING"
                    isLoading={loading}
                />
                <StatCard
                    title="Pipeline Value"
                    value={formatCurrency(estimateSummary?.totalValue)}
                    change="PROJECTED"
                    isLoading={loading}
                />
            </div>

            <div className="bg-white p-1 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
                <DashboardCharts leadSummary={leadSummary} estimateSummary={estimateSummary} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Recent Activity.</h3>
                        <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Primary Feed</span>
                    </div>
                    <div className="space-y-5">
                        {loading ? (
                            <p className="text-slate-300 font-black text-xs uppercase tracking-widest">Compiling stream...</p>
                        ) : recentLeads.length > 0 ? (
                            recentLeads.map((lead) => (
                                <div key={lead.id} className="group flex items-center justify-between p-5 bg-slate-50 hover:bg-orange-50 rounded-2xl transition-all duration-300 border border-transparent hover:border-orange-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 font-black text-xs group-hover:bg-orange-500 group-hover:text-white transition-all">
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-slate-900 font-bold group-hover:text-orange-600 transition-colors">{lead.name}</p>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{lead.phone} • {lead.email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg ${lead.status === 'NEW' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-200 text-slate-500'}`}>
                                        {lead.status}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-400 font-medium">No active signals found.</p>
                        )}
                    </div>
                </div>

                <div className="bg-white p-1 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                    <ActivityLog />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
