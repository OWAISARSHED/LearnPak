import { motion } from 'framer-motion';
import { Star, Linkedin, Globe, Award } from 'lucide-react';
import ModernLayout from '../components/ModernLayout';

const mentors = [
    {
        id: 1,
        name: "M. Owais Khan",
        role: "Senior Full Stack Dev",
        company: "TechFlow",
        students: "2,500+",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
        bio: "Specializing in MERN stack and Scalable Architecture. 5 years of industry experience."
    },
    {
        id: 2,
        name: "Sarah Ahmed",
        role: "UX Researcher",
        company: "DesignStudio",
        students: "1,200+",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
        bio: "Passionate about user-centered design and accessibility. Helping students build portfolios that hire."
    },
    {
        id: 3,
        name: "Bilal Siddiqui",
        role: "Data Scientist",
        company: "DataCorp",
        students: "3,000+",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
        bio: "Ex-Google Data Scientist. Teaching Python, ML, and AI concepts in simple Urdu/English."
    },
    {
        id: 4,
        name: "Ayesha Malik",
        role: "Digital Marketer",
        company: "GrowthHackers",
        students: "1,800+",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
        bio: "Expert in SEO, SEM, and Social Media Marketing. Helping 100+ businesses grow online."
    }
];

const Mentors = () => {
    return (
        <ModernLayout>
            <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl rotate-3 hover:rotate-6 transition-transform"
                    >
                        <Award className="text-white w-10 h-10" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-white mb-6"
                    >
                        Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Expert Mentors</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Learn directly from industry professionals who have been there and done that.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {mentors.map((mentor, index) => (
                        <motion.div
                            key={mentor.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-lg border border-white/10 p-6 text-center hover:shadow-purple-900/20 hover:border-purple-500/30 transition-all duration-300 group"
                        >
                            <div className="relative w-28 h-28 mx-auto mb-6">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                <img src={mentor.image} alt={mentor.name} className="relative w-full h-full rounded-full object-cover border-4 border-gray-800" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{mentor.name}</h3>
                            <p className="text-purple-400 font-medium text-sm mb-1">{mentor.role}</p>
                            <p className="text-gray-500 text-xs mb-4 uppercase tracking-wider font-bold">{mentor.company}</p>

                            <p className="text-gray-400 text-sm mb-6 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 italic">
                                "{mentor.bio}"
                            </p>

                            <div className="flex justify-center items-center gap-4 text-sm text-gray-400 border-t border-white/10 pt-4">
                                <div className="flex items-center gap-1 font-bold text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" /> {mentor.rating}
                                </div>
                                <div className="text-gray-500">|</div>
                                <div className="text-gray-300 font-medium">{mentor.students} Students</div>
                            </div>

                            <div className="mt-6 flex justify-center gap-3">
                                <button className="p-3 bg-white/5 text-gray-400 hover:text-white hover:bg-blue-600 rounded-full transition-all duration-300 border border-white/10"><Linkedin size={18} /></button>
                                <button className="p-3 bg-white/5 text-gray-400 hover:text-white hover:bg-purple-600 rounded-full transition-all duration-300 border border-white/10"><Globe size={18} /></button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </ModernLayout>
    );
};

export default Mentors;
