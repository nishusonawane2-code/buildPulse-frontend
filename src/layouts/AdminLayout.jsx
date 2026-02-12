import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/admin" },
        { name: "Leads", path: "/admin/leads" },
        { name: "Inquiries", path: "/admin/inquiries" },
        { name: "Projects", path: "/admin/projects" },
        { name: "Estimates", path: "/admin/estimates" },
    ];

    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-100">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-xl shadow-slate-200/50 z-20">
                <div className="p-8 border-b border-slate-50">
                    <h1 className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
                        BUILD<span className="text-orange-500">PULSE</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Admin Control Center</span>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-1.5">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path !== "/admin" && location.pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center px-5 py-3.5 rounded-xl transition-all duration-300 font-bold text-xs tracking-widest uppercase ${isActive
                                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-slate-50">
                    <button
                        onClick={logout}
                        className="w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-xl transition-all flex items-center gap-3"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                        Terminate Session
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-orange-500/5 -skew-x-12 transform origin-top-right -z-10"></div>

                <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-30 flex items-center justify-between px-10">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                        {navItems.find(i => i.path === location.pathname)?.name || "Identity Overview"}
                    </h2>
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-black text-slate-900">ADMINISTRATOR</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Access Level 05</p>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-xl shadow-slate-900/10">
                            AD
                        </div>
                    </div>
                </header>

                <div className="p-10 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
