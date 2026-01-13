import { useState } from 'react';
import { gigApi } from "../api/gigApi";
import { useNavigate } from 'react-router-dom';
import { Briefcase, IndianRupee, FileText, AlertCircle } from 'lucide-react';

const PostGig = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        budget: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Basic validation
        if (!formData.title || !formData.description || !formData.budget) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const payload = {
                ...formData,
                budget: formData.budget.replace(/,/g, "")
            };
            await gigApi.createGig(payload);
            navigate('/gigs'); // Redirect to gigs list after success
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatIndianNumber = (value) => {
        if (!value) return "";

        const number = value.replace(/,/g, "");
        return Number(number).toLocaleString("en-IN");
    };

    const handleBudgetChange = (e) => {
        const rawValue = e.target.value.replace(/,/g, "");
        if (isNaN(rawValue)) return;

        setFormData({
            ...formData,
            budget: formatIndianNumber(rawValue),
        });
    };


    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-primary-600 py-6 px-8">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Briefcase className="h-6 w-6" />
                            Post a New Job
                        </h2>
                        <p className="mt-2 text-primary-100">
                            Describe your project and find the perfect freelancer.
                        </p>
                    </div>

                    <div className="p-8">
                        {error && (
                            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. React Developer needed for E-commerce site"
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4 border"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 pointer-events-none">
                                        <FileText className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows={6}
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Detailed description of the task, requirements, and deliverables..."
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm pl-10 py-3 pr-4 border"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                                    Budget
                                </label>

                                <div className="relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <IndianRupee className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>

                                    <input
                                        type="text"
                                        name="budget"
                                        id="budget"
                                        value={formData.budget}
                                        onChange={handleBudgetChange}
                                        placeholder="0"
                                        className="block w-full rounded-lg border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 px-4 border"
                                    />
                                </div>
                            </div>


                            <div className="pt-4 flex items-center justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`px-8 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Posting...' : 'Post Job'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostGig;
