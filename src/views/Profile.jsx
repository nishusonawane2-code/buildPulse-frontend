import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-amber-500 text-xl font-semibold animate-pulse">
                    Loading Profile...
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-gray-800 border-2 border-amber-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
                    <div className="flex items-center space-x-6 mb-8 border-b border-gray-700 pb-6">
                        <div className="h-24 w-24 rounded-full bg-amber-500 flex items-center justify-center text-4xl font-bold text-gray-900 ring-4 ring-amber-500/20">
                            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-white tracking-tight">User Profile</h1>
                            <p className="text-amber-500 font-medium">Manage your account details</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
                            <p className="text-lg text-white font-medium">{user.name || 'Not Provided'}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                            <p className="text-lg text-white font-medium">{user.email}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Account Role</label>
                            <p className="flex items-center">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${user.role === 'ADMIN' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'
                                    }`}>
                                    {user.role}
                                </span>
                            </p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Auth Provider</label>
                            <p className="flex items-center text-white font-medium capitalize">
                                <span className="mr-2">
                                    {user.provider === 'GOOGLE' ? '🌐' : '🔐'}
                                </span>
                                {user.provider.toLowerCase()}
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                        <h3 className="text-amber-500 font-bold mb-2">Account Security</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {user.provider === 'GOOGLE'
                                ? "Your account is managed via Google. Security settings can be updated in your Google Account dashboard."
                                : "Your account uses local authentication. Keep your password secure and update it regularly."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
