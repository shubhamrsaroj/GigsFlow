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
            const token = sessionStorage.getItem('token');
            if (token) {
                try {
                    const response = await authApi.getCurrentUser();
                    setCurrentUser({ token, ...response.data });
                } catch (error) {
                    sessionStorage.removeItem('token');
                    setCurrentUser(null);
                }
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);



    const login = async (email, password) => {
        const response = await authApi.login({ email, password });
        const { token, user } = response.data;
        sessionStorage.setItem('token', token);
        setCurrentUser({ token, ...user });
        console.log(currentUser);
        return response;
    };

    const register = async (name, email, password) => {
        const response = await authApi.register({ name, email, password });
        const { token, user } = response.data;
        sessionStorage.setItem('token', token);
        setCurrentUser({ token, ...user });
        return response;
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setCurrentUser(null);
        window.location.href = '/login';
    };

    console.log(currentUser);

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
