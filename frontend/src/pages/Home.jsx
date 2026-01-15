import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Award, Zap, Users, CheckCircle, Play, Star, ChevronRight, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Home = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-white overflow-hidden font-sans text-gray-900">
            {/* Hero Section */}
            <header className="relative bg-brand-50 pt-16 pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                            <motion.div
                                initial="initial"
                                animate="animate"
                                variants={fadeIn}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-brand-100 text-brand-700 text-sm font-semibold tracking-wide uppercase mb-4">
                                    Revolutionizing Education
                                </span>
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                                    <span className="block">Master Skills with</span>
                                    <span className="block text-brand-600">AI-Powered Learning</span>
                                </h1>
                                <p className="mt-3 text-lg text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                    LearnPak adapts to your emotions and learning pace. Get certified, find mentors, and launch your freelance career with our AI proposal generator.
                                </p>
                                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link to="/register" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-brand-600 hover:bg-brand-700 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                                            Get Started Free
                                        </Link>
                                        <Link to="/courses" className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-brand-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-md hover:shadow-lg transition-all">
                                            <Play className="w-5 h-5 mr-2 fill-current" /> Watch Demo
                                        </Link>
                                    </div>
                                    <p className="mt-3 text-sm text-gray-500">
                                        No credit card required · 14-day free trial · Cancel anytime
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                        <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md"
                            >
                                <div className="relative block w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b from-brand-50 to-white/0"></div>
                                    <div className="relative p-8">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                            </div>
                                            <span className="text-xs font-mono text-gray-400">dashboard.jsx</span>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                                            <div className="h-32 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600">
                                                <Zap className="w-12 h-12" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="h-20 bg-gray-50 rounded-lg"></div>
                                                <div className="h-20 bg-gray-50 rounded-lg"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Floating Badges */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                    className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3"
                                >
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Course Completed</p>
                                        <p className="font-bold text-gray-800">Web Development</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 -ml-24 -mt-24 w-96 h-96 rounded-full bg-brand-100 opacity-50 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 -mr-24 -mb-24 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
            </header>

            {/* Stats Section */}
            <div className="bg-brand-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
                        {[
                            { number: '10k+', label: 'Active Students' },
                            { number: '500+', label: 'Expert Mentors' },
                            { number: '1000+', label: 'Courses' },
                            { number: '4.8/5', label: 'Average Rating' },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-4xl font-extrabold">{stat.number}</div>
                                <div className="mt-1 text-brand-100 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-base text-brand-600 font-semibold tracking-wide uppercase">Why Choose LearnPak</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Unlock Your True Potential
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            We combine cutting-edge AI with pedagogical expertise to deliver a learning experience that truly works for you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                title: 'AI Proposal Generator',
                                desc: 'Stop struggling with freight proposals. Our AI analyzes job descriptions and your profile to craft the perfect pitch in seconds.',
                                icon: Zap,
                            },
                            {
                                title: 'Emotion-Aware',
                                desc: 'Our platform detects when you are frustrated or bored and adapts the curriculum to keep you engaged and motivated.',
                                icon: Users,
                            },
                            {
                                title: 'Industry Certificates',
                                desc: 'Earn recognized certificates upon completion that you can showcase on LinkedIn and your resume.',
                                icon: Award,
                            },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="relative p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl transition-all group"
                            >
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                                <div className="w-14 h-14 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                                    <feature.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="py-24 bg-gray-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="mb-12 lg:mb-0">
                            <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
                                Start your journey in 3 simple steps
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { step: 1, title: 'Create Account', desc: 'Sign up in seconds and define your learning goals and interests.' },
                                    { step: 2, title: 'Learn with AI', desc: 'Access course material that adapts to your speed. Use AI tools to clear doubts.' },
                                    { step: 3, title: 'Get Hired', desc: 'Use our freelancer tools to generate proposals and land your first gig.' },
                                ].map((item) => (
                                    <div key={item.step} className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center font-bold text-xl">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                                            <p className="text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-green-400 rounded-2xl transform rotate-3 opacity-20"></div>
                            <div className="relative bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-700">
                                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student" className="w-12 h-12 rounded-full" />
                                    <div>
                                        <div className="font-bold">Owais Khan</div>
                                        <div className="text-sm text-gray-400">Web Development Student</div>
                                    </div>
                                </div>
                                <p className="text-lg text-gray-300 italic">
                                    "LearnPak's AI proposal generator saved me hours of work. I landed my first Upwork client within a week of finishing the React course!"
                                </p>
                                <div className="flex gap-1 mt-4 text-yellow-400">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 text-2xl font-bold text-brand-600 mb-4">
                                <BookOpen className="h-8 w-8" />
                                <span>LearnPak</span>
                            </div>
                            <p className="text-gray-500 text-sm">
                                Empowering the next generation of Pakistani freelancers and developers with AI-driven education.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link to="/courses" className="hover:text-brand-600">Browse Courses</Link></li>
                                <li><Link to="/mentors" className="hover:text-brand-600">Find a Mentor</Link></li>
                                <li><Link to="/pricing" className="hover:text-brand-600">Pricing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link to="/about" className="hover:text-brand-600">About Us</Link></li>
                                <li><Link to="/careers" className="hover:text-brand-600">Careers</Link></li>
                                <li><Link to="/contact" className="hover:text-brand-600">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">Connect</h4>
                            <div className="flex gap-4">
                                <a href="#" className="text-gray-400 hover:text-brand-600"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-brand-600"><Facebook className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-brand-600"><Linkedin className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-brand-600"><Instagram className="w-5 h-5" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} LearnPak. All rights reserved. Made in Pakistan.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
