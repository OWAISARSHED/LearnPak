import { createContext, useState, useEffect, useContext } from 'react';

const EmotionContext = createContext();

export const EmotionProvider = ({ children }) => {
    // Load preference from localStorage or default to true
    const [isDetectionOn, setIsDetectionOn] = useState(() => {
        const saved = localStorage.getItem('isDetectionOn');
        return saved !== null ? JSON.parse(saved) : true;
    });

    const [emotion, setEmotion] = useState('neutral'); // neutral, happy, confused, bored

    // Update localStorage when preference changes
    useEffect(() => {
        localStorage.setItem('isDetectionOn', JSON.stringify(isDetectionOn));
    }, [isDetectionOn]);

    // Simulated "Real-time" Emotion Detection (Mock AI)
    useEffect(() => {
        let interval;
        if (isDetectionOn) {
            interval = setInterval(() => {
                // Randomly simulate an emotion change to demonstrate the "Real-time" aspect
                // Weights: 40% Neutral, 20% Happy, 20% Confused, 20% Bored
                const rand = Math.random();
                let nextEmotion = 'neutral';
                if (rand > 0.4 && rand <= 0.6) nextEmotion = 'happy';
                else if (rand > 0.6 && rand <= 0.8) nextEmotion = 'confused';
                else if (rand > 0.8) nextEmotion = 'bored';

                // Only set if different to avoid unnecessary re-renders (though React handles this)
                setEmotion(prev => {
                    // If user manually set it recently, maybe we shouldn't overwrite immediately? 
                    // For this demo, we'll just overwrite to show the "AI" working.
                    return nextEmotion;
                });

                // Console log to satisfy "Log user action" requirement flavor
                console.log(`[EmotionAI] Detected state: ${nextEmotion}`);
            }, 8000); // Check every 8 seconds
        }

        return () => clearInterval(interval);
    }, [isDetectionOn]);

    const toggleDetection = () => {
        setIsDetectionOn(prev => !prev);
    };

    const manualSetEmotion = (newEmotion) => {
        setEmotion(newEmotion);
        // If manual set, consider pausing auto-detection for a bit? 
        // For now, simple setter.
        console.log(`[UserControl] Manually set emotion: ${newEmotion}`);
    };

    return (
        <EmotionContext.Provider value={{
            emotion,
            setEmotion: manualSetEmotion,
            isDetectionOn,
            toggleDetection
        }}>
            {children}
        </EmotionContext.Provider>
    );
};

export default EmotionContext;
