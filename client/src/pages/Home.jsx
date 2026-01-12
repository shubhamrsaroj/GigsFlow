import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { ArrowRight, CheckCircle2, DollarSign, Globe, Shield, Zap } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white pt-16 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                            <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary-100 bg-primary-50 text-primary-600 text-sm font-medium mb-6">
                                <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2"></span>
                                The #1 Marketplace for Professionals
                            </div>
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                                <span className="block xl:inline">Work flexibly,</span>{' '}
                                <span className="block text-primary-600 xl:inline">hire instantly.</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                GigFlow connects top-tier freelance talent with forward-thinking companies. Post jobs, get bids, and start working in minutes.
                            </p>
                            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        to="/gigs"
                                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        Find Work
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                    <Link
                                        to="/post-job"
                                        className="inline-flex items-center justify-center px-8 py-3 border border-gray-200 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg shadow-sm hover:shadow transition-all duration-200"
                                    >
                                        Post a Job
                                    </Link>
                                </div>
                                <p className="mt-3 text-sm text-gray-400">
                                    No credit card required for sign up.
                                </p>
                            </div>
                        </div>
                        <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                            <div className="relative mx-auto w-full rounded-2xl shadow-2xl lg:max-w-md overflow-hidden transform hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-primary-400 opacity-20 z-0"></div>
                                <img
                                    className="w-full relative z-10"
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    alt="Team collaboration"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-50 opacity-50 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary-50 opacity-50 blur-3xl pointer-events-none"></div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Core Platform Features</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to get work done
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            GigFlow streamlines the entire process from posting a job to final payment.
                        </p>
                    </div>

                    <div className="mt-20">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="relative p-8 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-colors duration-300 border border-gray-100 hover:border-primary-100 group">
                                <div className="absolute -top-6 left-8">
                                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Zap className="h-7 w-7" />
                                    </div>
                                </div>
                                <h3 className="mt-8 text-xl font-bold text-gray-900 group-hover:text-primary-700">Instant Bidding</h3>
                                <p className="mt-4 text-base text-gray-500">
                                    Freelancers can browse active gigs and submit bids instantly. Clients see proposals in real-time.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="relative p-8 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-colors duration-300 border border-gray-100 hover:border-primary-100 group">
                                <div className="absolute -top-6 left-8">
                                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <CheckCircle2 className="h-7 w-7" />
                                    </div>
                                </div>
                                <h3 className="mt-8 text-xl font-bold text-gray-900 group-hover:text-primary-700">Client Approval</h3>
                                <p className="mt-4 text-base text-gray-500">
                                    Clients have full control. Review profiles, compare bids, and hire the perfect match with a single click.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="relative p-8 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-colors duration-300 border border-gray-100 hover:border-primary-100 group">
                                <div className="absolute -top-6 left-8">
                                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-primary-500 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Shield className="h-7 w-7" />
                                    </div>
                                </div>
                                <h3 className="mt-8 text-xl font-bold text-gray-900 group-hover:text-primary-700">Secure Process</h3>
                                <p className="mt-4 text-base text-gray-500">
                                    Our rigorous vetting and clear hiring logic ensure a safe and professional environment for everyone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How it Works / Stats (Simulated) */}
            <div className="bg-primary-900 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="text-center">
                            <div className="text-4xl font-extrabold text-white">500+</div>
                            <div className="mt-2 text-sm font-medium text-primary-200">Active Gigs</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-extrabold text-white">1.2k</div>
                            <div className="mt-2 text-sm font-medium text-primary-200">Freelancers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-extrabold text-white">$50k+</div>
                            <div className="mt-2 text-sm font-medium text-primary-200">Paid out</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-extrabold text-white">98%</div>
                            <div className="mt-2 text-sm font-medium text-primary-200">Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block">Ready to dive in?</span>
                        <span className="block text-primary-600">Start your journey today.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link
                                to="/register"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                            >
                                Get Started
                            </Link>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <Link
                                to="/gigs"
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
                            >
                                Browse Gigs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
