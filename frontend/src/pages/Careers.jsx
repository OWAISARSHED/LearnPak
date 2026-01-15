import { Briefcase, ArrowRight } from 'lucide-react';
import ModernLayout from '../components/ModernLayout';
import { motion } from 'framer-motion';

const positions = [
    { title: "Senior React Developer", location: "Remote (Pakistan)", type: "Full-time" },
    { title: "AI Research Engineer", location: "Islamabad", type: "Full-time" },
    { title: "Curriculum Designer", location: "Lahore", type: "Contract" },
    { title: "Student Success Manager", location: "Karachi", type: "Full-time" }
];

const Careers = () => {
    return (
        <ModernLayout>
            <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/20 rotate-12"
                    >
                        <Briefcase className="text-white w-8 h-8" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-white mb-6"
                    >
                        Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Mission</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Help us shape the future of education in Pakistan. We are always looking for passionate individuals to join our growing team.
                    </motion.p>
                </div>

                <div className="grid gap-6 max-w-4xl mx-auto">
                    {positions.map((job, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center justify-between p-6 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-white/5 hover:border-blue-500/50 hover:bg-white/5 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors border border-white/5">
                                    <Briefcase size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors mb-1">{job.title}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        {job.location} · {job.type}
                                    </p>
                                </div>
                            </div>
                            <button className="hidden sm:flex items-center gap-2 px-6 py-2 border border-white/10 rounded-full text-sm font-medium hover:bg-blue-600 hover:border-transparent text-gray-300 hover:text-white transition-all">
                                Apply Now <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 text-center bg-gradient-to-br from-blue-900/20 to-cyan-900/20 p-10 rounded-3xl border border-blue-500/20"
                >
                    <h3 className="font-bold text-2xl text-white mb-3">Don't see a fit?</h3>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">We are always open to meeting talented people. Send your CV to us and we'll keep you on file for future openings.</p>
                    <a href="mailto:careers@learnpak.com" className="inline-block px-8 py-3 bg-white text-gray-900 rounded-full font-bold hover:scale-105 transition-transform">
                        Email Your Resume
                    </a>
                </motion.div>
            </div>
        </ModernLayout>
    );
};

export default Careers;
