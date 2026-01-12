import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useAuth } from '../context/AuthContext';
import { Briefcase, DollarSign, User, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const GigDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [gig, setGig] = useState(null);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bidMessage, setBidMessage] = useState('');
    const [bidLoading, setBidLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchGigDetails = async () => {
            try {
                const response = await api.get(`/gigs/${id}`);
                setGig(response.data);

                const currentUserId = currentUser?.id || currentUser?._id;

                // If current user is owner, fetch bids
                if (currentUser && response.data.ownerId._id === currentUserId) {
                    const bidsResponse = await api.get(`/bids/${id}`);
                    setBids(bidsResponse.data);
                }
            } catch (err) {
                console.error("Error fetching gig:", err);
                setError("Failed to load gig details.");
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchGigDetails();
        }
    }, [id, currentUser]);

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        setBidLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            await api.post('/bids', {
                gigId: id,
                message: bidMessage
            });
            setSuccessMessage('Bid placed successfully!');
            setBidMessage('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place bid.');
        } finally {
            setBidLoading(false);
        }
    };

    const handleHire = async (bidId) => {
        if (!window.confirm("Are you sure you want to hire this freelancer?")) return;

        try {
            await api.patch(`/bids/${bidId}/hire`);
            setSuccessMessage("Freelancer hired successfully!");
            // Refresh Data
            const gigRes = await api.get(`/gigs/${id}`);
            setGig(gigRes.data);
            const bidsRes = await api.get(`/bids/${id}`);
            setBids(bidsRes.data);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to hire freelancer");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!gig) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500">Gig not found.</div>
            </div>
        );
    }

    const currentUserId = currentUser?.id || currentUser?._id;
    const isOwner = currentUser && gig.ownerId._id === currentUserId;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Gig Details Card */}
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-8">
                    <div className="bg-white p-8 border-b border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{gig.title}</h1>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        {gig.ownerId.name}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        Posted {new Date(gig.timeStamps).toLocaleDateString()}
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${gig.status === 'open' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                                        }`}>
                                        {gig.status}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500 mb-1">Budget</p>
                                <p className="text-2xl font-bold text-green-600 flex items-center justify-end">
                                    <DollarSign className="h-6 w-6" />
                                    {gig.budget}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-gray-400" />
                            Project Description
                        </h3>
                        <div className="prose prose-blue max-w-none text-gray-600">
                            <p className="whitespace-pre-wrap">{gig.description}</p>
                        </div>
                    </div>
                </div>

                {/* Interaction Section */}
                <div className="grid grid-cols-1 gap-8">
                    {isOwner ? (
                        /* Owner View - See Bids */
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                            <div className="bg-gray-50 px-8 py-4 border-b border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-900">Received Bids ({bids.length})</h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {bids.length > 0 ? (
                                    bids.map((bid) => (
                                        <div key={bid._id} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                                        {bid.freelancerId?.name?.charAt(0) || 'U'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{bid.freelancerId?.name || 'Unknown User'}</p>
                                                        <p className="text-xs text-gray-500">{bid.freelancerId?.email}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        bid.status === 'hired' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {bid.status}
                                                    </span>
                                                    {gig.status === 'open' && bid.status === 'pending' && (
                                                        <button
                                                            onClick={() => handleHire(bid._id)}
                                                            className="bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                                                        >
                                                            Hire
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 mt-2 text-sm bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                "{bid.message}"
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        No bids received yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : gig.status !== 'open' ? (
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden p-8 text-center border border-gray-100">
                            <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Briefcase className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Gig Closed</h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                This gig has been assigned to a freelancer and is no longer accepting new bids.
                            </p>
                            <button
                                onClick={() => navigate('/gigs')}
                                className="mt-6 text-primary-600 hover:text-primary-700 font-medium text-sm"
                            >
                                Browse Other Gigs
                            </button>
                        </div>
                    ) : (
                        /* Freelancer View - Place Bid */
                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                            <div className="bg-primary-600 px-8 py-6">
                                <h3 className="text-xl font-bold text-white">Place a Bid</h3>
                                <p className="text-primary-100 text-sm mt-1">Explain why you're the best fit for this gig.</p>
                            </div>
                            <div className="p-8">
                                {successMessage ? (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
                                        <h3 className="text-lg font-medium text-green-800">Bid Placed Successfully!</h3>
                                        <p className="text-green-600 text-sm mt-1">The client will review your proposal shortly.</p>
                                        <button
                                            onClick={() => navigate('/gigs')}
                                            className="mt-4 text-primary-600 hover:text-primary-700 font-medium text-sm"
                                        >
                                            Back to Gigs
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleBidSubmit}>
                                        {error && (
                                            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start gap-3">
                                                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                                                <p className="text-sm text-red-700">{error}</p>
                                            </div>
                                        )}
                                        <div className="mb-6">
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                                Cover Letter / Proposal
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={5}
                                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
                                                placeholder="Describe your relevant experience and how you plan to complete this job..."
                                                value={bidMessage}
                                                onChange={(e) => setBidMessage(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={bidLoading}
                                                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${bidLoading ? 'opacity-70 cursor-not-allowed' : ''
                                                    }`}
                                            >
                                                {bidLoading ? 'Submitting...' : 'Submit Proposal'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GigDetails;
