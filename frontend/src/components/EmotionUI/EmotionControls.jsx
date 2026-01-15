import { useContext } from 'react';
import EmotionContext from '../../context/EmotionContext';
import { ToggleLeft, ToggleRight } from 'lucide-react';

const EmotionControls = () => {
    const { emotion, setEmotion, isDetectionOn, toggleDetection } = useContext(EmotionContext);

    const emotions = [
        { id: 'happy', label: '😄' },
        { id: 'neutral', label: '😐' },
        { id: 'confused', label: '😟' },
        { id: 'bored', label: '😴' }, // Changed to sleeping face to match previous
    ];

    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-700">Learner Controls</span>
                <button
                    onClick={toggleDetection}
                    className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isDetectionOn ? 'text-brand-600' : 'text-gray-400'}`}
                >
                    {isDetectionOn ? 'AI Detection ON' : 'AI Detection OFF'}
                    {isDetectionOn ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {emotions.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setEmotion(item.id)}
                        className={`p-2 rounded-xl text-2xl transition-all duration-200 hover:scale-110 ${emotion === item.id
                                ? 'bg-brand-100 ring-2 ring-brand-500 ring-offset-2 scale-110'
                                : 'bg-gray-50 hover:bg-gray-100 grayscale hover:grayscale-0'
                            }`}
                        title={item.id}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EmotionControls;
