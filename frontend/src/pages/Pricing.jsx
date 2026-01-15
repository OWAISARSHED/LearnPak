import { Check, Star } from 'lucide-react';
import ModernLayout from '../components/ModernLayout';
import { motion } from 'framer-motion';

const plans = [
    {
        name: "Basic",
        price: "Free",
        desc: "For hobbyists and curious learners.",
        features: ["Access to 3 free courses", "Community Support", "Basic Emotion Tracking"],
        cta: "Start Free",
        popular: false
    },
    {
        name: "Pro",
        price: "Rs. 2,500",
        period: "/month",
        desc: "For serious students wanting to upskill fast.",
        features: ["Unlimited Course Access", "AI Proposal Generator", "Priority Mentor Support", "Certificate of Completion", "Advanced Analytics"],
        cta: "Get Pro",
        popular: true
    },
    {
        name: "Team",
        price: "Custom",
        desc: "For organizations and university batches.",
        features: ["Everything in Pro", "Dedicated Account Manager", "Custom Learning Paths", "Bulk Enrollment Discounts"],
        cta: "Contact Sales",
        popular: false
    }
];

const Pricing = () => {
    return (
        <ModernLayout>
            <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-white mb-6"
                    >
                        Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Pricing</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Choose the plan that best fits your learning goals. No hidden fees.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            whileHover={{ y: -10 }}
                            className={`relative bg-gray-900/50 backdrop-blur-md rounded-3xl border p-8 flex flex-col ${plan.popular ? 'border-purple-500 shadow-2xl shadow-purple-900/20 ring-1 ring-purple-500/50 scale-105 z-10' : 'border-white/10 shadow-lg'}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg border border-white/20 uppercase tracking-widest flex items-center gap-1">
                                    <Star size={12} fill="currentColor" /> Most Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                            <p className="text-gray-400 text-sm mb-6 min-h-[40px]">{plan.desc}</p>

                            <div className="mb-8 p-4 bg-white/5 rounded-2xl text-center border border-white/5">
                                <span className={`text-4xl font-extrabold ${plan.popular ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'text-white'}`}>{plan.price}</span>
                                {plan.period && <span className="text-gray-500 font-medium">{plan.period}</span>}
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <div className={`p-1 rounded-full flex-shrink-0 ${plan.popular ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-700 text-gray-400'}`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-xl font-bold transition-all transform active:scale-95 ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </ModernLayout>
    );
};

export default Pricing;
