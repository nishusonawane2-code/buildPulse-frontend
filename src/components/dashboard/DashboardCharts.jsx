import React from 'react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const COLORS = ['#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6'];

const DashboardCharts = ({ leadSummary, estimateSummary }) => {
    // Mock data for status distribution if leadSummary is provided
    const statusData = leadSummary ? [
        { name: 'New', value: leadSummary.newLeadsToday || 5 },
        { name: 'Pending', value: leadSummary.pendingLeads || 12 },
        { name: 'Followed-up', value: 8 },
        { name: 'Converted', value: 4 }
    ] : [];

    // Mock data for monthly pipeline if estimateSummary is provided
    const pipelineData = [
        { month: 'Jan', value: 450000 },
        { month: 'Feb', value: 520000 },
        { month: 'Mar', value: 380000 },
        { month: 'Apr', value: 610000 },
        { month: 'May', value: (estimateSummary?.totalValue || 750000) }
    ];

    if (!leadSummary && !estimateSummary) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
            {/* Status Distribution */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Signal Distribution.</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Live Status</span>
                </div>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid #f1f5f9',
                                    borderRadius: '1.5rem',
                                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                                }}
                                itemStyle={{ color: '#0f172a', fontWeight: '900', fontSize: '10px', textTransform: 'uppercase' }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pipeline Value Chart */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Valuation Flux.</h3>
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Monthly Yield</span>
                </div>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <BarChart data={pipelineData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis
                                dataKey="month"
                                stroke="#94a3b8"
                                fontSize={10}
                                fontWeight={900}
                                axisLine={false}
                                tickLine={false}
                                dy={10}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={10}
                                fontWeight={900}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) => `₹${value / 1000}k`}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(249, 115, 22, 0.05)', radius: [10, 10, 0, 0] }}
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid #f1f5f9',
                                    borderRadius: '1.5rem',
                                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                                }}
                                itemStyle={{ color: '#0f172a', fontWeight: '900', fontSize: '10px', textTransform: 'uppercase' }}
                                formatter={(value) => [`₹${value.toLocaleString()}`, 'Valuation']}
                            />
                            <Bar dataKey="value" fill="#f97316" radius={[10, 10, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardCharts;
