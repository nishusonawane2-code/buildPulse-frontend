import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useAuth();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        const role = queryParams.get('role');

        if (token && role) {
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            setUser({ role });

            if (role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } else {
            console.error('OAuth2 login fail: token or role missing');
            navigate('/login');
        }
    }, [location, navigate, setUser]);

    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
            <div className="text-amber-500 text-xl font-bold animate-pulse">
                Authenticating...
            </div>
        </div>
    );
};

export default OAuth2RedirectHandler;
