import { Smile, Frown, Meh, AlertCircle, Coffee } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const EmotionWidget = ({ courseId, lessonId, onEmotionLogged }) => {
    const [selected, setSelected] = useState(null);

    const emotions = [
        { id: 'happy', icon: <Smile className="w-8 h-8" />, label: 'Got it!', color: 'text-green-500 hover:text-green-600' },
        { id: 'neutral', icon: <Meh className="w-8 h-8" />, label: 'Okay', color: 'text-blue-500 hover:text-blue-600' },
        { id: 'confused', icon: <AlertCircle className="w-8 h-8" />, label: 'Confused', color: 'text-orange-500 hover:text-orange-600' },
        { id: 'bored', icon: <Frown className="w-8 h-8" />, label: 'Bored', color: 'text-gray-500 hover:text-gray-600' },
        { id: 'sleepy', icon: <Coffee className="w-8 h-8" />, label: 'Sleepy', color: 'text-purple-500 hover:text-purple-600' },
    ];

    const handleEmotion = async (emotionId) => {
        setSelected(emotionId);
        try {
            await axios.post('http://localhost:5000/api/enrollments/emotion', {
                courseId,
                lessonId,
                emotion: emotionId
            });
            if (onEmotionLogged) onEmotionLogged(emotionId);
        } catch (error) {
            console.error('Failed to log emotion', error);
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">How are you feeling?</h3>
            <div className="flex justify-between max-w-md">
                {emotions.map(e => (
                    <button
                        key={e.id}
                        onClick={() => handleEmotion(e.id)}
                        className={`flex flex-col items-center gap-1 transition ${e.color} ${selected === e.id ? 'scale-110 ring-2 ring-offset-2 ring-gray-200 rounded-lg p-1' : 'opacity-70 hover:opacity-100'}`}
                    >
                        {e.icon}
                        <span className="text-xs font-medium">{e.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EmotionWidget;
