import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Briefcase, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { notificationApi } from "../../api/notificationApi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const { currentUser, logout } = useAuth();
    const { socket } = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            fetchNotifications();
        }
    }, [currentUser]);

    useEffect(() => {
        if (socket) {
            socket.on('hire_notification', (data) => {
                // Add new notification to list
                setNotifications(prev => [{
                    _id: Date.now(), // Temp ID until refresh
                    message: data.message,
                    createdAt: new Date(),
                    isRead: false
                }, ...prev]);
            });
        }
    }, [socket]);

    const fetchNotifications = async () => {
        try {
            const res = await notificationApi.getNotifications();
            setNotifications(res.data);
        } catch (err) {
            console.error("Failed to fetch notifications", err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
                                <Briefcase className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                                GigFlow
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                            Find Work
                        </Link>
                        <Link to="/gigs" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                            Browse Gigs
                        </Link>
                        <Link to="/post-job" className="text-gray-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                            Post a Job
                        </Link>

                        <div className="ml-4 flex items-center space-x-4">
                            {currentUser ? (
                                <>
                                    {/* Notification Bell */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowNotifications(!showNotifications)}
                                            className="p-2 text-gray-400 hover:text-primary-600 transition-colors relative"
                                        >
                                            <Bell className="h-6 w-6" />
                                            {unreadCount > 0 && (
                                                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white">
                                                    {unreadCount}
                                                </span>
                                            )}
                                        </button>

                                        {/* Notification Dropdown */}
                                        {showNotifications && (
                                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-2">
                                                <div className="px-4 py-2 border-b border-gray-100">
                                                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                                                </div>
                                                <div className="max-h-96 overflow-y-auto">
                                                    {notifications.length > 0 ? (
                                                        notifications.map((notif, index) => (
                                                            <div key={index} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors">
                                                                <p className="text-sm text-gray-800">{notif.message}</p>
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    {new Date(notif.createdAt).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="px-4 py-8 text-center text-gray-500 text-sm">
                                                            No notifications yet.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <span className="text-gray-900 font-medium text-sm flex items-center gap-2">
                                        <User className="h-5 w-5 text-gray-400" />
                                        Hi, {currentUser.name || 'User'}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-white text-gray-500 hover:text-red-600 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-gray-200 hover:border-red-200 flex items-center gap-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium text-sm">Login</Link>
                                    <Link to="/register" className="bg-primary-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="sm:hidden bg-white border-b border-gray-100">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-700">
                            Find Work
                        </Link>
                        <Link to="/gigs" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-700">
                            Browse Gigs
                        </Link>
                        <Link to="/post-job" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-700">
                            Post a Job
                        </Link>
                    </div>
                    <div className="pt-4 pb-4 border-t border-gray-200">
                        <div className="space-y-1">
                            {currentUser ? (
                                <>
                                    <div className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700">
                                        Hi, {currentUser.name || 'User'}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-600 hover:bg-red-50 hover:border-red-500"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-primary-500 hover:text-gray-700">
                                        Log in
                                    </Link>
                                    <Link to="/register" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-primary-600 hover:bg-gray-50 hover:border-primary-500">
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
