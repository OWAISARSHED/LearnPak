import { useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EmotionContext from '../../context/EmotionContext';
import { RefreshCw, BookOpen, Coffee, X } from 'lucide-react';

const AdaptiveFeedback = () => {
    const { emotion, setEmotion } = useContext(EmotionContext);
    const [isVisible, setIsVisible] = useState(false);

    // Show modal when emotion is 'confused' or 'bored'
    useEffect(() => {
        if (emotion === 'confused' || emotion === 'bored') {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [emotion]);

    const handleAction = (action) => {
        console.log(`[AdaptiveLearning] User chose to: ${action}`);
        // Modify lesson state (mock)
        // Reset emotion to neutral or happy after action
        setEmotion('neutral');
        setIsVisible(false);
    };

    const renderContent = () => {
        if (emotion === 'confused') {
            return (
                <>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Need a hand? 🤔</h3>
                    <p className="text-gray-600 mb-6">It looks like you might be finding this part tricky. Would you like to simplify the explanation?</p>
                    <div className="space-y-3">
                        <button
                            onClick={() => handleAction('Review Example')}
                            className="w-full flex items-center justify-center gap-2 bg-brand-600 text-white py-3 rounded-xl font-bold hover:bg-brand-700 transition"
                        >
                            <BookOpen size={20} /> View Simple Example
                        </button>
                        <button
                            onClick={() => handleAction('Retry Lesson')}
                            className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                        >
                            <RefreshCw size={20} /> Restart Section
                        </button>
                    </div>
                </>
            );
        }
        if (emotion === 'bored') {
            return (
                <>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Feeling tired? 😴</h3>
                    <p className="text-gray-600 mb-6">You've been at it for a while. A refreshed mind learns faster!</p>
                    <div className="space-y-3">
                        <button
                            onClick={() => handleAction('Take Break')}
                            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition"
                        >
                            <Coffee size={20} /> Take a 5-min Break
                        </button>
                        <button
                            onClick={() => handleAction('Continue')}
                            className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
                        >
                            I'm okay, continue
                        </button>
                    </div>
                </>
            );
        }
        return null;
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-8 right-8 z-50 max-w-sm w-full"
                >
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                        {/* Header Stripe */}
                        <div className={`h-2 w-full ${emotion === 'confused' ? 'bg-orange-500' : 'bg-green-500'}`} />

                        <div className="p-6 relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsVisible(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                            >
                                <X size={20} />
                            </button>

                            {renderContent()}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AdaptiveFeedback;
