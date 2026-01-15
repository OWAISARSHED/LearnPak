import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { BookOpen, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Hide Navbar on dashboard routes
    // ALSO check for course player or other specific routes if needed
    if (
        location.pathname.includes('/student') ||
        location.pathname.includes('/instructor') ||
        location.pathname.includes('/admin') ||
        location.pathname.includes('/course/')
    ) {
        return null;
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200" />
                            <div className="relative bg-gray-900 p-2 rounded-lg border border-white/10">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            LearnPak
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6 text-sm font-medium text-gray-300">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
                            <Link to="/mentors" className="hover:text-white transition-colors">Mentors</Link>
                            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                            <Link to="/about" className="hover:text-white transition-colors">About</Link>
                        </div>

                        <div className="flex items-center gap-4">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <Link to="/profile" className="text-sm font-medium text-white hover:text-purple-400 transition-colors">
                                        Hi, {user.name}
                                    </Link>
                                    <Link
                                        to={user.role === 'admin' ? '/admin' : user.role === 'instructor' ? '/instructor' : '/student'}
                                        className="relative group px-5 py-2 rounded-full overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:opacity-90 transition-opacity" />
                                        <span className="relative text-sm font-bold text-white">Dashboard</span>
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm font-medium text-white hover:text-purple-400 transition-colors">
                                        Log in
                                    </Link>
                                    <Link to="/register" className="relative group px-6 py-2.5 rounded-full overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:opacity-90 transition-opacity" />
                                        <span className="relative text-sm font-bold text-white flex items-center gap-2">
                                            Get Started
                                        </span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-gray-900 pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6 text-lg font-medium">
                            <Link to="/" className="text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                            <Link to="/courses" className="text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Courses</Link>
                            <Link to="/mentors" className="text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Mentors</Link>
                            <Link to="/pricing" className="text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>

                            {user ? (
                                <>
                                    <Link to="/profile" className="text-gray-300 border-t border-white/10 pt-4" onClick={() => setIsMobileMenuOpen(false)}>My Profile</Link>
                                    <Link to={user.role === 'admin' ? '/admin' : user.role === 'instructor' ? '/instructor' : '/student'} className="bg-purple-600 text-white py-3 px-6 rounded-xl text-center" onClick={() => setIsMobileMenuOpen(false)}>
                                        Go to Dashboard
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-gray-300 border-t border-white/10 pt-4" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                                    <Link to="/register" className="bg-purple-600 text-white py-3 px-6 rounded-xl text-center" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
