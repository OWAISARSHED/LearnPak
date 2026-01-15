import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Users, Award, Play, CheckCircle,
    Star, ArrowRight, Globe, Shield, Briefcase, X
} from 'lucide-react';


const ModernLandingPage = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/10 rounded-full blur-[120px] mix-blend-screen" />
            </div>



            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 mb-8 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            AI-Powered Learning Platform
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                            Master Skills with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                                Intelligent AI
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
                            LearnPak adapts to your emotions and pace. Get certified, find mentors, and launch your freelance career.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <Link to="/register" className="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-2">
                                Start Learning Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button
                                onClick={() => setIsVideoOpen(true)}
                                className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-colors font-semibold flex items-center gap-2 backdrop-blur-sm"
                            >
                                <Play className="w-5 h-5 fill-current" />
                                Watch Demo
                            </button>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-900 bg-gray-800 flex items-center justify-center overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <p>Joined by <span className="text-white font-bold">10,000+</span> students</p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                        <div className="relative bg-gray-900/50 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
                            {/* Glass Card UI Mockup */}
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <div className="text-xs font-mono text-gray-500">dashboard.tsx</div>
                            </div>

                            <div className="grid gap-6">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="h-2 w-24 bg-gray-700 rounded mb-2"></div>
                                        <div className="h-2 w-32 bg-gray-700 rounded opacity-50"></div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5">
                                        <div className="text-2xl font-bold mb-1">85%</div>
                                        <div className="text-xs text-gray-400">Course Progress</div>
                                    </div>
                                    <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="text-2xl font-bold mb-1">4.9</div>
                                        <div className="text-xs text-gray-400">Average Rating</div>
                                    </div>
                                </div>

                                <div className="h-32 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                </div>
                            </div>

                            {/* Floating Element */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -right-8 -bottom-8 bg-gray-800 p-4 rounded-2xl border border-white/10 shadow-xl flex items-center gap-3"
                            >
                                <div className="bg-green-500/20 p-2 rounded-full text-green-400">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Proposal Generated</div>
                                    <div className="text-xs text-gray-400">Just now</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Unleash Your Potential</h2>
                        <p className="text-gray-400 text-lg">We combine cutting-edge AI with pedagogical expertise to deliver a learning experience that truly works for you.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Zap,
                                title: "AI Proposal Generator",
                                desc: "Stop struggling with proposals. Our AI analyzes jobs and tailored pitches in seconds.",
                                color: "from-purple-500 to-indigo-500"
                            },
                            {
                                icon: Users,
                                title: "Emotion-Aware Learning",
                                desc: "Platform detects frustration or boredom and adapts curriculum to keep you engaged.",
                                color: "from-pink-500 to-rose-500"
                            },
                            {
                                icon: Award,
                                title: "Industry Certificates",
                                desc: "Earn recognized certificates to showcase on LinkedIn and your resume.",
                                color: "from-blue-500 to-cyan-500"
                            },
                            {
                                icon: Globe,
                                title: "Global Mentorship",
                                desc: "Connect with experts from around the world for 1-on-1 guidance.",
                                color: "from-emerald-500 to-teal-500"
                            },
                            {
                                icon: Briefcase,
                                title: "Career Launchpad",
                                desc: "Integrated tools to help you land your first freelance gig faster.",
                                color: "from-orange-500 to-amber-500"
                            },
                            {
                                icon: Shield,
                                title: "Secure & Verified",
                                desc: "All courses and certifications are verified and secure on the blockchain.",
                                color: "from-red-500 to-pink-500"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="group relative p-8 rounded-3xl bg-gray-800/30 border border-white/5 hover:bg-gray-800/50 transition-all overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition-opacity`} />

                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-gray-900/50 border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Loved by Students</h2>
                            <p className="text-gray-400 text-lg mb-8">
                                "The AI proposal generator is a game changer. I landed my first contract on Upwork within 3 days!"
                            </p>
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="w-16 h-16 rounded-full border-2 border-purple-500"
                                    alt="Student"
                                />
                                <div>
                                    <div className="font-bold text-lg">Owais Khan</div>
                                    <div className="text-purple-400">Web Developer</div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 translate-y-8">
                                <div className="p-6 rounded-2xl bg-gray-800 border border-white/5">
                                    <div className="flex gap-1 text-yellow-500 mb-2">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <p className="text-gray-300 text-sm">"Incredible platform."</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-gray-800 border border-white/5">
                                    <div className="flex gap-1 text-yellow-500 mb-2">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <p className="text-gray-300 text-sm">"Best learning experience."</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-6 rounded-2xl bg-gray-800 border border-white/5">
                                    <div className="flex gap-1 text-yellow-500 mb-2">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <p className="text-gray-300 text-sm">"The mentors are top notch."</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-gray-800 border border-white/5">
                                    <div className="flex gap-1 text-yellow-500 mb-2">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <p className="text-gray-300 text-sm">"Emotion AI is spooky good."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full blur-[100px] -z-10" />

                    <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                        Ready to start your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">journey?</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Join thousands of students and mentors on the most advanced AI-powered learning platform.
                    </p>
                    <Link to="/register" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:scale-105 transition-transform shadow-lg shadow-purple-600/25">
                        Get Started Now
                        <ArrowRight className="ml-2" />
                    </Link>
                </div>
            </section>



            {/* Video Modal */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsVideoOpen(false)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <video
                                src="/demo-video.mp4"
                                className="w-full h-full object-cover"
                                controls
                                autoPlay
                            >
                                Your browser does not support the video tag.
                            </video>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};



export default ModernLandingPage;
