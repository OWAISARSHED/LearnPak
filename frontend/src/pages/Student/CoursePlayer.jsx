import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { EmotionProvider } from '../../context/EmotionContext';
import EmotionIndicator from '../../components/EmotionUI/EmotionIndicator';
import AdaptiveFeedback from '../../components/EmotionUI/AdaptiveFeedback';
import EmotionControls from '../../components/EmotionUI/EmotionControls';
import { Play, CheckCircle, GraduationCap, ArrowLeft } from 'lucide-react';

const CoursePlayer = () => {
    return (
        <EmotionProvider>
            <CoursePlayerContent />
        </EmotionProvider>
    );
};

const CoursePlayerContent = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [course, setCourse] = useState(null);
    const [enrollment, setEnrollment] = useState(null);
    const [currentLesson, setCurrentLesson] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const { data: courseData } = await axios.get(`/api/courses/${id}`);
                setCourse(courseData);
                if (courseData.lessons?.length > 0) setCurrentLesson(courseData.lessons[0]);

                if (user) {
                    const { data: myEnrollments } = await axios.get('/api/enrollments', {
                        headers: { Authorization: `Bearer ${user.token}` }
                    });
                    const found = myEnrollments.find(e => e.course._id === id);
                    if (found) setEnrollment(found);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourse();
    }, [id, user]);

    const handleLessonComplete = async () => {
        if (!enrollment || !currentLesson) return;
        try {
            await axios.put(`http://localhost:5000/api/enrollments/${enrollment._id}/progress`, {
                lessonId: currentLesson._id
            });

            // Check if this was the last lesson
            const isLastLesson = course.lessons[course.lessons.length - 1]._id === currentLesson._id;

            if (isLastLesson) {
                alert('Congratulations! You have completed the course!');
                navigate('/student');
            } else {
                alert('Lesson marked as complete!');
                // Optional: Auto-advance could go here
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (!course) return <div className="flex items-center justify-center h-screen"><p className="text-xl font-bold text-gray-400">Loading Class...</p></div>;

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
            {/* Adaptive Feedback Modal */}
            <AdaptiveFeedback />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div className="max-w-5xl mx-auto space-y-6">

                    {/* Back Button */}
                    <button onClick={() => navigate('/student')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft size={20} /> Back to Dashboard
                    </button>

                    {/* Emotion Dashboard Bar */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-100 text-brand-600 rounded-xl">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h1 className="font-bold text-gray-900">{currentLesson?.title || course.title}</h1>
                                <p className="text-xs text-gray-500">Progress: {enrollment ? Math.round(enrollment.progress || 0) : 0}%</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <EmotionIndicator />
                            {!enrollment && <span className="text-xs text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded">Audit Mode</span>}
                        </div>
                    </div>

                    {/* Video Player */}
                    <div className="aspect-video bg-black rounded-2xl shadow-lg overflow-hidden relative group">
                        {currentLesson?.videoUrl ? (
                            currentLesson.videoUrl.includes('youtube') || currentLesson.videoUrl.includes('youtu.be') ? (
                                <iframe
                                    src={currentLesson.videoUrl.replace('watch?v=', 'embed/')}
                                    className="w-full h-full"
                                    allowFullScreen
                                    title={currentLesson.title}
                                />
                            ) : (
                                <>
                                    <video
                                        src={currentLesson.videoUrl.startsWith('http') ? currentLesson.videoUrl : `http://localhost:5000${currentLesson.videoUrl}`}
                                        controls
                                        className="w-full h-full"
                                        onError={(e) => {
                                            console.error('Video Error:', e);
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="hidden w-full h-full items-center justify-center text-white bg-gray-900 absolute top-0 left-0">
                                        <div className="text-center p-4">
                                            <p className="text-red-400 font-bold mb-2">Video Playback Error</p>
                                            <p className="text-sm text-gray-400 break-all">Could not load: {currentLesson.videoUrl.startsWith('http') ? currentLesson.videoUrl : `http://localhost:5000${currentLesson.videoUrl}`}</p>
                                        </div>
                                    </div>
                                </>
                            )
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white">
                                <p>Select a lesson to play</p>
                            </div>
                        )}
                    </div>

                    {/* Controls & Resources */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-lg mb-4">Lesson Resources</h3>
                                <div className="flex gap-3">
                                    {currentLesson?.audioUrl && (
                                        <a href={currentLesson.audioUrl.startsWith('http') ? currentLesson.audioUrl : `http://localhost:5000${currentLesson.audioUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold hover:bg-blue-100 transition-colors">
                                            <span>🎵 Audio Ver.</span>
                                        </a>
                                    )}
                                    {currentLesson?.pdfUrl && (
                                        <a href={currentLesson.pdfUrl.startsWith('http') ? currentLesson.pdfUrl : `http://localhost:5000${currentLesson.pdfUrl}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-700 rounded-xl font-bold hover:bg-red-100 transition-colors">
                                            <span>📄 Notes (PDF)</span>
                                        </a>
                                    )}
                                    {!currentLesson?.audioUrl && !currentLesson?.pdfUrl && <p className="text-gray-400 text-sm">No downloadable resources for this lesson.</p>}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-lg mb-2">Description</h3>
                                <p className="text-gray-600 leading-relaxed">{course.description}</p>
                            </div>
                        </div>

                        {/* Right Column: Emotion Controls & Actions */}
                        <div className="space-y-6">
                            <EmotionControls />

                            {enrollment && (
                                <button
                                    onClick={handleLessonComplete}
                                    className="w-full bg-brand-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-brand-700 hover:scale-105 transition-all flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={20} /> Mark Complete
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Playlist */}
            <div className="w-full lg:w-80 bg-white border-l h-full overflow-y-auto shrink-0">
                <div className="p-5 border-b sticky top-0 bg-white z-10">
                    <h2 className="font-bold text-lg text-gray-900">Course Content</h2>
                    <p className="text-xs text-gray-500">{course.lessons?.length || 0} Lessons</p>
                </div>
                <div>
                    {course.lessons?.map((lesson, idx) => (
                        <button
                            key={lesson._id}
                            onClick={() => setCurrentLesson(lesson)}
                            className={`w-full text-left p-4 border-b hover:bg-gray-50 transition-colors flex items-center gap-3 ${currentLesson?._id === lesson._id ? 'bg-brand-50 border-l-4 border-l-brand-600' : ''}`}
                        >
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${currentLesson?._id === lesson._id ? 'bg-brand-200 text-brand-800' : 'bg-gray-100 text-gray-500'}`}>
                                {idx + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                                <h4 className={`font-medium text-sm truncate ${currentLesson?._id === lesson._id ? 'text-brand-900' : 'text-gray-700'}`}>{lesson.title}</h4>
                                <span className="text-xs text-gray-400">{lesson.duration || '10'} min</span>
                            </div>
                            <Play size={16} className={currentLesson?._id === lesson._id ? 'text-brand-600' : 'text-gray-300'} />
                        </button>
                    ))}
                    {(!course.lessons || course.lessons.length === 0) && (
                        <div className="p-8 text-center">
                            <p className="text-gray-400 text-sm">No lessons uploaded yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;
