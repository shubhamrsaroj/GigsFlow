import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import io from "socket.io-client";
import toast from 'react-hot-toast';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            const userId = currentUser.id || currentUser._id;
            // Socket connects to the root URL (remove /api/auth if present in env var, or use a separate VITE_SOCKET_URL if preferred)
            // Assuming VITE_API_URL might look like "https://backend.com/api/auth", we might want the root "https://backend.com"
            // Or simple convention: VITE_API_URL is "https://backend.com" and axios appends "/api/auth". 
            // Let's stick to the convention used in api.js: user replaced "http://localhost:5000/api/auth", 
            // so if they set VITE_API_URL to the full auth path, we need to strip it for socket.
            // HOWEVER, safest bet for now is to check if we can just point to the base domain. 
            // Let's assume VITE_API_URL is the base URL for simplicity in this context or use conditional logic.
            // Actually, based on api.js change: baseURL was "http://.../api/auth".
            // So if user sets VITE_API_URL = "https://my-api.render.com/api/auth", then for socket we want "https://my-api.render.com".

            const socketUrl = import.meta.env.VITE_API_URL
                ? import.meta.env.VITE_API_URL.replace('/api/auth', '')
                : "http://localhost:5000";

            const socketInstance = io(socketUrl, {
                query: {
                    userId: userId,
                },
            });

            setSocket(socketInstance);

            socketInstance.on("hire_notification", (data) => {
                toast.success(data.message, {
                    duration: 5000,
                    position: 'top-center',
                    style: {
                        background: '#10B981',
                        color: '#fff',
                        fontWeight: 'bold',
                    },
                });
            });

            return () => socketInstance.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [currentUser]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

