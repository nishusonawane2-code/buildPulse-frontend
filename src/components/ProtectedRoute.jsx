import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-amber-500">Loading...</div>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // Redirect based on their actual role prevents infinite loops
        // or just send them to home/dashboard
        return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
