import { useState, useEffect } from 'react';
import { gigApi } from "../api/gigApi";
import { Search, MapPin, IndianRupee, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Gigs = () => {
    const [gigs, setGigs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        const fetchGigs = async () => {
            setLoading(true);
            try {
                const response = await gigApi.getAllGigs(debouncedSearchTerm);
                setGigs(response.data);
            } catch (error) {
                console.error("Error fetching gigs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGigs();
    }, [debouncedSearchTerm]);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Find Work</h1>
                        <p className="mt-1 text-gray-500">Browse available gigs and start earning.</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search gigs by title..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition duration-150 ease-in-out shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse border border-gray-100 h-64">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                                <div className="flex justify-between mt-auto title">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : gigs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gigs.map((gig) => (
                            <div key={gig._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col">
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                                            {gig.status || 'Open'}
                                        </div>
                                        <span className="text-gray-400 text-xs">{new Date(gig.timeStamps).toLocaleDateString()}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{gig.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-3">{gig.description}</p>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <IndianRupee className="h-4 w-4 text-green-600" />
                                            <span className="font-semibold text-gray-900">₹{gig.budget}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User className="h-4 w-4" />
                                            <span>{gig.ownerId?.name || 'Unknown'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-xs text-gray-500 font-medium">Fixed Price</span>
                                    <Link
                                        to={`/gigs/${gig._id}`}
                                        className="text-primary-600 hover:text-primary-800 font-medium text-sm transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                            <Search className="h-12 w-12" />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No gigs found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms or check back later.</p>
                        <div className="mt-6">
                            <Link
                                to="/post-job"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Post a Job
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gigs;
