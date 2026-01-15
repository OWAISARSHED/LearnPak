import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import ModernLayout from '../components/ModernLayout';
import { motion } from 'framer-motion';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Mock submission
    };

    return (
        <ModernLayout>
            <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-white mb-6"
                    >
                        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Have questions? We'd love to hear from you.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                        <p className="text-purple-200 mb-8 leading-relaxed">Fill up the form and our Team will get back to you within 24 hours.</p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="p-3 bg-white/10 rounded-lg text-purple-400"><Phone size={20} /></div>
                                <span>+92 300 1234567</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="p-3 bg-white/10 rounded-lg text-purple-400"><Mail size={20} /></div>
                                <span>support@learnpak.com</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="p-3 bg-white/10 rounded-lg text-purple-400"><MapPin size={20} /></div>
                                <span>Technology Park, Islamabad, Pakistan</span>
                            </div>
                        </div>

                        {/* Decorative Circles */}
                        <div className="mt-12 flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10"></div>
                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10"></div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 bg-gray-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-lg"
                    >
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-6 border border-green-500/30"
                                >
                                    <Send size={32} />
                                </motion.div>
                                <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                                <p className="text-gray-400 mb-8">Thank you for contacting us. We will get back to you shortly.</p>
                                <button onClick={() => setSubmitted(false)} className="text-purple-400 font-bold hover:text-purple-300 hover:underline transition-colors">Send another message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all" placeholder="John" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                                        <input type="text" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all" placeholder="Doe" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                    <input type="email" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                    <textarea rows="4" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none" placeholder="How can we help you?" required></textarea>
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] transition-all transform active:scale-95">
                                    Send Message
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </ModernLayout>
    );
};

export default Contact;
