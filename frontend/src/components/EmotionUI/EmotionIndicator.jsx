import { useContext } from 'react';
import EmotionContext from '../../context/EmotionContext';
import { Smile, Frown, Meh, Loader } from 'lucide-react'; // Using Lucide icons as approximations if needed
// Actually, let's use standard emojis as requested in prompt, wrapped in lucide for styling or just text.
// Prompt asked for icons: 😄 😐 😟 😴
// I will use Lucide icons for a more 'premium' look that matches the app, mapped to those states.

const EmotionIndicator = () => {
    const { emotion, isDetectionOn } = useContext(EmotionContext);

    const getEmotionConfig = (state) => {
        switch (state) {
            case 'happy': return { icon: '😄', label: 'You look focused!', color: 'text-green-600', bg: 'bg-green-100' };
            case 'confused': return { icon: '😟', label: 'You seem confused', color: 'text-orange-600', bg: 'bg-orange-100' };
            case 'bored': return { icon: '😴', label: 'You seem bored', color: 'text-gray-600', bg: 'bg-gray-100' };
            default: return { icon: '😐', label: 'You look neutral', color: 'text-blue-600', bg: 'bg-blue-100' }; // neutral
        }
    };

    const config = getEmotionConfig(emotion);

    return (
        <div className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-500 ${config.bg} ${config.color} border-current/20`}>
            <span className="text-2xl animate-bounce-slow" role="img" aria-label={emotion}>
                {config.icon}
            </span>
            <div className="flex flex-col">
                <span className="text-xs font-bold opacity-70 uppercase tracking-wider">
                    {isDetectionOn ? 'AI Detecting...' : 'Manual Mode'}
                </span>
                <span className="font-bold text-sm whitespace-nowrap">
                    {config.label}
                </span>
            </div>
        </div>
    );
};

export default EmotionIndicator;
