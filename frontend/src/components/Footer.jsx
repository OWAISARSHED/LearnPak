import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();

    // Hide Footer on dashboard routes and profile
    if (
        location.pathname.includes('/student') ||
        location.pathname.includes('/instructor') ||
        location.pathname.includes('/admin') ||
        location.pathname.includes('/profile') ||
        location.pathname.includes('/course/') // Player often needs full screen
    ) {
        return null;
    }

    return (
        <footer className="border-t border-white/10 bg-gray-900 pt-20 pb-10 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
                            <BookOpen className="h-8 w-8 text-purple-500" />
                            <span>LearnPak</span>
                        </Link>
                        <p className="text-gray-400 max-w-sm">
                            Empowering the next generation of Pakistani freelancers and developers with AI-driven education.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6">Platform</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/courses" className="hover:text-purple-400 transition-colors">Courses</Link></li>
                            <li><Link to="/mentors" className="hover:text-purple-400 transition-colors">Mentors</Link></li>
                            <li><Link to="/pricing" className="hover:text-purple-400 transition-colors">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/about" className="hover:text-purple-400 transition-colors">About</Link></li>
                            <li><Link to="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
                            <li><Link to="/careers" className="hover:text-purple-400 transition-colors">Careers</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} LearnPak. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
