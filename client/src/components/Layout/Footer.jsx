import React from 'react';
import { Briefcase, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <span className="text-2xl font-bold text-primary-600 tracking-tighter flex items-center gap-2">
                            <Briefcase className="h-6 w-6" />
                            GigFlow
                        </span>
                        <p className="text-gray-500 text-base">
                            Connecting talent with opportunity. The modern way to work and hire.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">GitHub</span>
                                <Github className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Platform</h3>
                                <ul className="mt-4 space-y-4">
                                    <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">How it Works</a></li>
                                    <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Browse Gigs</a></li>
                                    <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Post a Job</a></li>
                                    <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Pricing</a></li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                                <ul className="mt-4 space-y-4">
                                    <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Help Center</a></li>
                                    <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms of Service</a></li>
                                    <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</a></li>
                                    <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-1 md:gap-8">
                            <div className="mt-12 xl:mt-0">
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Subscribe to our newsletter</h3>
                                <p className="mt-4 text-base text-gray-500">
                                    The latest news, articles, and resources, sent to your inbox weekly.
                                </p>
                                <form className="mt-4 sm:flex sm:max-w-md">
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input type="email" name="email-address" id="email-address" autoComplete="email" required className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:placeholder-gray-400" placeholder="Enter your email" />
                                    <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                                        <button type="submit" className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                            Subscribe
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">
                        &copy; 2024 GigFlow. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
