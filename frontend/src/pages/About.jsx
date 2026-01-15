import { motion } from 'framer-motion';
import { Target, Heart, Globe, Award, Sparkles } from 'lucide-react';
import ModernLayout from '../components/ModernLayout';

const About = () => {
    return (
        <ModernLayout>
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block p-3 rounded-2xl bg-white/5 border border-white/10 mb-6"
                    >
                        <Sparkles className="w-8 h-8 text-purple-400" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold text-white mb-8"
                    >
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">LearnPak</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        We are on a mission to democratize education in Pakistan by combining expert mentorship with AI-driven adaptive learning.
                    </motion.p>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="w-2 h-8 bg-purple-500 rounded-full"></div>
                                Our Story
                            </h2>
                            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                                Founded in 2024, LearnPak emerged from a simple observation: <span className="text-white font-bold">Talent is evenly distributed, but opportunity is not.</span> Millions of brilliant students in Pakistan lack access to high-quality, up-to-date technical education.
                            </p>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                We built LearnPak to bridge this gap. By leveraging Generative AI, we create personalized learning paths that adapt
                                to each student's pace, emotions, and goals. Combined with our network of top-tier industry mentors, we ensure
                                every student has the support they need to succeed in the global freelancing market.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl rotate-3 blur opacity-50"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Team working" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay"></div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Target, title: "Our Mission", desc: "To empower 1 million students with freelance-ready skills by 2030." },
                            { icon: Heart, title: "Our Values", desc: "Empathy, Innovation, and Excellence in everything we do." },
                            { icon: Globe, title: "Global Reach", desc: "Connecting local talent with global opportunities." },
                            { icon: Award, title: "Quality First", desc: "Curriculum designed by industry experts, not just academics." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (idx * 0.1) }}
                                whileHover={{ y: -10 }}
                                className="bg-gray-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center hover:bg-white/5 transition-all group"
                            >
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-none border border-white/10 group-hover:border-purple-500/50 group-hover:bg-purple-900/20 transition-colors">
                                    <item.icon size={28} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                                </div>
                                <h3 className="font-bold text-xl text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </ModernLayout>
    );
};

export default About;
