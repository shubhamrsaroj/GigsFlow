import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from "../api/authApi";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await authApi.getCurrentUser();
                setCurrentUser(response.data);
            } catch (error) {
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);



    const login = async (email, password) => {
        const response = await authApi.login({ email, password });
        const { user } = response.data;
        setCurrentUser(user);
        return response;
    };

    const register = async (name, email, password) => {
        const response = await authApi.register({ name, email, password });
        const { user } = response.data;
        setCurrentUser(user);
        return response;
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error("Logout failed", error);
        }
        setCurrentUser(null);
        window.location.href = '/login';
    };

    // console.log(currentUser);

    const value = {
        currentUser,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
