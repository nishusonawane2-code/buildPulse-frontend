import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Activity, User, Clock, Tag } from 'lucide-react';

const ActivityLog = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axiosClient.get('/activities');
                setActivities(response.data);
            } catch (error) {
                console.error("Failed to fetch activities", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
        // Refresh every 30 seconds
        const interval = setInterval(fetchActivities, 30000);
        return () => clearInterval(interval);
    }, []);

    const getActionColor = (action) => {
        if (action.includes('CREATE')) return 'text-emerald-400';
        if (action.includes('DELETE')) return 'text-rose-400';
        if (action.includes('UPDATE')) return 'text-amber-400';
        return 'text-blue-400';
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">System Pulse.</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Real-time activity audit</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monitoring</span>
                </div>
            </div>

            <div className="space-y-8 relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-50"></div>

                {loading ? (
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="animate-pulse flex items-start space-x-6">
                                <div className="rounded-xl bg-slate-100 h-12 w-12 z-10"></div>
                                <div className="flex-1 space-y-3 py-1">
                                    <div className="h-3 bg-slate-50 rounded w-3/4"></div>
                                    <div className="h-2 bg-slate-50 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : activities.length > 0 ? (
                    activities.map((log) => (
                        <div key={log.id} className="group relative flex items-start space-x-6 z-10">
                            <div className={`flex-shrink-0 w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center group-hover:border-orange-200 transition-colors ${getActionColor(log.action)}`}>
                                <Tag className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0 pt-1">
                                <p className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-relaxed">
                                    {log.details}
                                </p>
                                <div className="mt-2 flex items-center space-x-4">
                                    <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <User className="w-3 h-3 mr-2" />
                                        {log.userEmail.split('@')[0]}
                                    </span>
                                    <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                    <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <Clock className="w-3 h-3 mr-2" />
                                        {formatTime(log.timestamp)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 opacity-30">
                        <Activity className="w-12 h-12 text-slate-300 mb-4" />
                        <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">Silence in the stream.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityLog;
