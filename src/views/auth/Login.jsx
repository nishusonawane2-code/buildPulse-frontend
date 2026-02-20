import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    const highResImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const success = await login(form.username, form.password);

            if (success) {
                toast.success("Welcome back!");
                const role = localStorage.getItem("role");
                if (role === "ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }
            } else {
                toast.error("Invalid credentials");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-slate-100 flex items-center justify-center p-4 font-sans selection:bg-orange-100 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/4 h-full bg-orange-500/5 -skew-x-12 transform origin-top-right"></div>

            <div className="max-w-5xl w-full h-full max-h-[640px] flex flex-col lg:flex-row rounded-[2rem] overflow-hidden bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] border border-white z-10">

                {/* Left Side: Visual branding (hidden on mobile) */}
                <div className="hidden lg:flex flex-col w-[42%] relative bg-slate-900 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={highResImg}
                            alt="Modern Architecture"
                            className="w-full h-full object-cover opacity-60 scale-100 hover:scale-105 transition-transform duration-[2000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-transparent to-slate-900/90"></div>
                    </div>

                    <div className="relative z-10 p-10 flex flex-col h-full justify-between text-white">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 mb-4 text-[9px] font-black uppercase tracking-widest text-orange-200">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                                <span>Version 2.4</span>
                            </div>
                            <h1 className="text-4xl font-black tracking-tighter leading-none">
                                BUILD<span className="text-orange-500">PULSE</span>
                            </h1>
                        </div>

                        <div className="space-y-6">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden shadow-lg">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 30}`} alt="user" />
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-orange-500 flex items-center justify-center text-[9px] font-bold text-white shadow-lg">
                                    +2k
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 font-medium tracking-tight">Standardizing construction workflows worldwide.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Identity form */}
                <div className="w-full lg:w-[58%] p-6 md:p-10 lg:p-12 flex flex-col justify-center bg-white">
                    <div className="max-w-sm mx-auto w-full">
                        <div className="mb-6 text-center">
                            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                                Portal Entry.
                            </h2>
                            <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest font-bold">Authorized Personnel Only</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Username / ID</label>
                                <input
                                    type="text"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/20 focus:bg-white transition-all placeholder:text-slate-300 text-sm font-medium"
                                    placeholder="your-id"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Access Key</label>
                                </div>
                                <input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-100 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/20 focus:bg-white transition-all placeholder:text-slate-300 text-sm font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20 disabled:opacity-70 mt-2 flex items-center justify-center gap-3 tracking-widest text-[10px]"
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <span>AUTHORIZE ACCESS</span>
                                )}
                            </button>

                            <div className="relative py-4 text-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-100"></div>
                                </div>
                                <span className="relative px-4 bg-white text-[8px] font-black uppercase tracking-[0.4em] text-slate-300">Fast Connect</span>
                            </div>

                            <a
                                href="https://buildpulse-backend-production.up.railway.app/oauth2/authorization/google"
                                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-[10px] uppercase font-black tracking-widest">Sign in with Google</span>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
