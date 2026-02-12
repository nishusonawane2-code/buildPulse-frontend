import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            getProfile();
        } else {
            setLoading(false);
        }
    }, [token]);

    const getProfile = async () => {
        try {
            const response = await axiosClient.get("/profile");
            setUser(response.data);
            localStorage.setItem("role", response.data.role);
        } catch (error) {
            console.error("Failed to fetch profile", error);
            logout(); // If profile fetch fails, token might be invalid
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await axiosClient.post("/auth/login", { username, password });
            const { token } = response.data;
            setToken(token);
            localStorage.setItem("token", token);
            // Profile will be fetched by the useEffect hook since token changed
            return true;
        } catch (error) {
            console.error("Login failed", error);
            return false;
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await axiosClient.post("/auth/register", { username, email, password });
            const { token } = response.data;
            setToken(token);
            localStorage.setItem("token", token);
            return true;
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
