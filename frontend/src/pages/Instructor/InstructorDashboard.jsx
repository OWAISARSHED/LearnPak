import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import ModernLayout from '../../components/ModernLayout';
import {
    LayoutDashboard,
    Plus,
    Book,
    Users,
    DollarSign,
    ShieldCheck,
    Upload,
    FileText,
    HelpCircle,
    LogOut,
    Menu,
    X,
    Trash2,
    ChevronDown,
    ChevronUp,
    Video,
    File,
    User
} from 'lucide-react';
import Profile from '../Profile';
import { motion, AnimatePresence } from 'framer-motion';

const InstructorDashboard = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) return null;

    const [activeTab, setActiveTab] = useState('courses');
    const [courses, setCourses] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Create Course State
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        price: 0,
        category: 'Development',
        language: 'Urdu',
        thumbnail: '',
        chapters: [
            {
                id: Date.now(),
                title: 'Introduction',
                lessons: [
                    { id: Date.now() + 1, title: 'Welcome', videoUrl: '', audioUrl: '', pdfUrl: '', duration: 5, isFree: true }
                ]
            }
        ],
        quizzes: [],
        assignments: []
    });

    // Verification State
    const [verificationStatus, setVerificationStatus] = useState(user.isVerified ? 'verified' : 'pending');
    const [pendingFile, setPendingFile] = useState(null);
    const [stats, setStats] = useState({ totalStudents: 0, totalWatchTime: 0, completionRate: 0 });

    const fetchCourses = async () => {
        try {
            const { data } = await axios.get(`/api/courses?instructor=${user._id}`);
            setCourses(data);
        } catch (error) { console.error(error); }
    };

    const fetchStats = async () => {
        try {
            const { data } = await axios.get('/api/courses/instructor/stats', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setStats(data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => {
        if (user && user.role === 'instructor') {
            fetchCourses();
            fetchStats();
            axios.get('/api/auth/profile', {
                headers: { Authorization: `Bearer ${user.token}` }
            }).then(({ data }) => {
                if (data.identityDoc) setVerificationStatus('pending-review');
            }).catch(console.error);
        }
    }, [user]);

    const uploadFileHandler = async (e, callback) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            // Show loading state for specific button if needed, or general loading
            const { data } = await axios.post('/api/upload', formData, config);
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            callback(`${baseURL}${data}`);
        } catch (error) {
            console.error(error);
            alert('File upload failed');
        }
    };

    // Course Form Helpers
    const updateCourseField = (field, value) => setCourseData({ ...courseData, [field]: value });

    // Chapter & Lesson Management
    const addChapter = () => {
        setCourseData({
            ...courseData,
            chapters: [...courseData.chapters, { id: Date.now(), title: 'New Chapter', lessons: [] }]
        });
    };

    const updateChapterTitle = (chapterId, title) => {
        setCourseData({
            ...courseData,
            chapters: courseData.chapters.map(c => c.id === chapterId ? { ...c, title } : c)
        });
    };

    const deleteChapter = (chapterId) => {
        setCourseData({
            ...courseData,
            chapters: courseData.chapters.filter(c => c.id !== chapterId)
        });
    };

    const addLesson = (chapterId) => {
        setCourseData({
            ...courseData,
            chapters: courseData.chapters.map(c =>
                c.id === chapterId
                    ? { ...c, lessons: [...c.lessons, { id: Date.now(), title: 'New Lesson', videoUrl: '', audioUrl: '', pdfUrl: '', duration: 10, isFree: false }] }
                    : c
            )
        });
    };

    const updateLesson = (chapterId, lessonId, field, value) => {
        setCourseData({
            ...courseData,
            chapters: courseData.chapters.map(c =>
                c.id === chapterId
                    ? {
                        ...c,
                        lessons: c.lessons.map(l => l.id === lessonId ? { ...l, [field]: value } : l)
                    }
                    : c
            )
        });
    };

    const deleteLesson = (chapterId, lessonId) => {
        setCourseData({
            ...courseData,
            chapters: courseData.chapters.map(c =>
                c.id === chapterId
                    ? { ...c, lessons: c.lessons.filter(l => l.id !== lessonId) }
                    : c
            )
        });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            if (!user.isVerified) {
                alert('You must verify your identity before creating a course.');
                setActiveTab('verification');
                return;
            }
            setLoading(true);

            // Flatten chapters into lessons with chapter field
            const lessons = courseData.chapters.flatMap(chapter =>
                chapter.lessons.map(lesson => ({
                    title: lesson.title,
                    videoUrl: lesson.videoUrl,
                    audioUrl: lesson.audioUrl,
                    pdfUrl: lesson.pdfUrl,
                    duration: lesson.duration,
                    isFree: lesson.isFree,
                    chapter: chapter.title
                }))
            );

            await axios.post('/api/courses', {
                title: courseData.title,
                description: courseData.description,
                price: courseData.price,
                category: courseData.category,
                language: courseData.language,
                thumbnail: courseData.thumbnail,
                lessons,
                quizzes: courseData.quizzes,
                assignments: courseData.assignments
            }, { headers: { Authorization: `Bearer ${user.token}` } });

            alert('Course submitted! Waiting for Admin Approval.');
            fetchCourses();
            setActiveTab('courses');
            setCourseData({ ...courseData, title: '', description: '', chapters: [] }); // Reset basic fields
        } catch (error) {
            console.error(error);
            alert('Error creating course: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) setPendingFile(file);
    };

    const handleSubmitVerification = async () => {
        if (!pendingFile) return;
        const formData = new FormData();
        formData.append('file', pendingFile);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await axios.post('/api/upload', formData, config);
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const docUrl = `${baseURL}${data}`;
            await axios.post('/api/auth/verify-identity', { identityDoc: docUrl }, { headers: { Authorization: `Bearer ${user.token}` } });
            alert('Identity document uploaded. Please wait for admin approval.');
            setVerificationStatus('pending-review');
            setPendingFile(null);
        } catch (error) { alert('Upload failed'); }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'courses':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-white">My Courses</h2>
                            <button onClick={() => setActiveTab('create')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 transition-all font-bold">
                                <Plus size={20} /> Create New Course
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map(course => (
                                <div key={course._id} className="bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 overflow-hidden group">
                                    <div className="relative">
                                        <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${course.status === 'approved' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : course.status === 'rejected' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'}`}>
                                                {course.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg mb-2 text-white truncate">{course.title}</h3>
                                        <div className="flex justify-between items-center text-sm text-gray-400">
                                            <span>{course.language}</span>
                                            <span>Rs. {course.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {courses.length === 0 && <div className="col-span-full text-center py-10 text-gray-400">No courses found. Create one now!</div>}
                        </div>
                    </motion.div>
                );
            case 'create':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-6">Create New Course</h2>
                        {!user.isVerified && (
                            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
                                <p className="text-red-400 font-bold">Identity Verification Required</p>
                                <button onClick={() => setActiveTab('verification')} className="text-red-300 underline mt-2 text-sm">Go to Verification</button>
                            </div>
                        )}
                        <form onSubmit={handleCreate} className="space-y-8">
                            {/* Basic Info */}
                            <div className="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/10 space-y-6">
                                <h3 className="text-xl font-bold text-purple-300 flex items-center gap-2"><Book size={20} /> Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                                        <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" value={courseData.title} onChange={(e) => updateCourseField('title', e.target.value)} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Language</label>
                                        <select className="w-full bg-gray-800 border border-white/10 p-3 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" value={courseData.language} onChange={(e) => updateCourseField('language', e.target.value)}>
                                            <option>Urdu</option><option>English</option><option>Punjabi</option><option>Sindhi</option><option>Pashto</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                    <textarea className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none" rows="4" value={courseData.description} onChange={(e) => updateCourseField('description', e.target.value)} required />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Price (Rs.)</label>
                                        <input type="number" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none" value={courseData.price} onChange={(e) => updateCourseField('price', e.target.value)} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                        <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none" value={courseData.category} onChange={(e) => updateCourseField('category', e.target.value)} required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Thumbnail URL</label>
                                        <input className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none" value={courseData.thumbnail} onChange={(e) => updateCourseField('thumbnail', e.target.value)} placeholder="https://..." required />
                                    </div>
                                </div>
                            </div>

                            {/* Curriculum Builder */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-purple-300 flex items-center gap-2"><Video size={20} /> Course Curriculum</h3>
                                    <button type="button" onClick={addChapter} className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"><Plus size={16} /> Add Chapter</button>
                                </div>

                                {courseData.chapters.map((chapter, cIndex) => (
                                    <div key={chapter.id} className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                                        <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/5">
                                            <input
                                                className="bg-transparent text-lg font-bold text-white focus:outline-none w-full"
                                                value={chapter.title}
                                                onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
                                                placeholder="Chapter Title"
                                            />
                                            <div className="flex items-center gap-2">
                                                <button type="button" onClick={() => deleteChapter(chapter.id)} className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg"><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                        <div className="p-4 space-y-4">
                                            {chapter.lessons.map((lesson, lIndex) => (
                                                <div key={lesson.id} className="bg-black/20 p-4 rounded-xl border border-white/5">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Lesson {lIndex + 1}</h4>
                                                        <button type="button" onClick={() => deleteLesson(chapter.id, lesson.id)} className="text-gray-500 hover:text-red-400"><X size={16} /></button>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                        <input
                                                            className="bg-white/5 border border-white/10 p-2 rounded-lg text-white text-sm"
                                                            placeholder="Lesson Title"
                                                            value={lesson.title}
                                                            onChange={(e) => updateLesson(chapter.id, lesson.id, 'title', e.target.value)}
                                                        />
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="number"
                                                                className="bg-white/5 border border-white/10 p-2 rounded-lg text-white text-sm w-24"
                                                                placeholder="Duration (m)"
                                                                value={lesson.duration}
                                                                onChange={(e) => updateLesson(chapter.id, lesson.id, 'duration', e.target.value)}
                                                            />
                                                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 rounded-lg">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={lesson.isFree}
                                                                    onChange={(e) => updateLesson(chapter.id, lesson.id, 'isFree', e.target.checked)}
                                                                />
                                                                <span className="text-xs text-gray-300">Preview</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-bold text-gray-500 mb-1">VIDEO URL</label>
                                                            <div className="flex gap-2">
                                                                <input className="w-full bg-white/5 border border-white/10 p-2 rounded-lg text-xs text-white" value={lesson.videoUrl} onChange={(e) => updateLesson(chapter.id, lesson.id, 'videoUrl', e.target.value)} placeholder="Upload or paste URL" />
                                                                <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 p-2 rounded-lg"><Upload size={14} className="text-white" />
                                                                    <input type="file" className="hidden" onChange={(e) => uploadFileHandler(e, (url) => updateLesson(chapter.id, lesson.id, 'videoUrl', url))} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold text-gray-500 mb-1">AUDIO URL</label>
                                                            <div className="flex gap-2">
                                                                <input className="w-full bg-white/5 border border-white/10 p-2 rounded-lg text-xs text-white" value={lesson.audioUrl} onChange={(e) => updateLesson(chapter.id, lesson.id, 'audioUrl', e.target.value)} placeholder="Optional" />
                                                                <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 p-2 rounded-lg"><Upload size={14} className="text-white" />
                                                                    <input type="file" className="hidden" onChange={(e) => uploadFileHandler(e, (url) => updateLesson(chapter.id, lesson.id, 'audioUrl', url))} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold text-gray-500 mb-1">PDF URL</label>
                                                            <div className="flex gap-2">
                                                                <input className="w-full bg-white/5 border border-white/10 p-2 rounded-lg text-xs text-white" value={lesson.pdfUrl} onChange={(e) => updateLesson(chapter.id, lesson.id, 'pdfUrl', e.target.value)} placeholder="Optional" />
                                                                <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 p-2 rounded-lg"><Upload size={14} className="text-white" />
                                                                    <input type="file" className="hidden" onChange={(e) => uploadFileHandler(e, (url) => updateLesson(chapter.id, lesson.id, 'pdfUrl', url))} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addLesson(chapter.id)} className="w-full py-2 border-2 border-dashed border-gray-700/50 hover:border-purple-500/50 rounded-xl text-gray-500 hover:text-purple-400 transition-colors flex justify-center items-center gap-2 text-sm font-bold">
                                                <Plus size={16} /> Add Lesson
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Quizzes & Assignments */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Quizzes Section */}
                                <div className="bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-purple-300 flex items-center gap-2"><HelpCircle size={20} /> Quizzes</h3>
                                        <button type="button" onClick={() => setCourseData({ ...courseData, quizzes: [...courseData.quizzes, { title: '', fileUrl: '' }] })} className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded flex items-center gap-1"><Plus size={12} /> Add</button>
                                    </div>
                                    <div className="space-y-4">
                                        {courseData.quizzes.map((quiz, idx) => (
                                            <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/5 relative group">
                                                <button type="button" onClick={() => setCourseData({ ...courseData, quizzes: courseData.quizzes.filter((_, i) => i !== idx) })} className="absolute top-2 right-2 text-gray-500 hover:text-red-400"><X size={14} /></button>
                                                <input
                                                    className="w-full bg-transparent border-b border-gray-700 focus:border-purple-500 outline-none text-white text-sm mb-2 pb-1"
                                                    placeholder="Quiz Title"
                                                    value={quiz.title}
                                                    onChange={(e) => {
                                                        const newQuizzes = [...courseData.quizzes];
                                                        newQuizzes[idx].title = e.target.value;
                                                        setCourseData({ ...courseData, quizzes: newQuizzes });
                                                    }}
                                                />
                                                <div className="flex items-center gap-2">
                                                    <input className="flex-1 bg-black/20 text-xs text-gray-400 p-2 rounded" value={quiz.fileUrl} readOnly placeholder="Upload PDF" />
                                                    <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 p-2 rounded text-white"><Upload size={12} />
                                                        <input type="file" className="hidden" onChange={(e) => uploadFileHandler(e, (url) => {
                                                            const newQuizzes = [...courseData.quizzes];
                                                            newQuizzes[idx].fileUrl = url;
                                                            setCourseData({ ...courseData, quizzes: newQuizzes });
                                                        })} />
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                        {courseData.quizzes.length === 0 && <p className="text-xs text-gray-500 italic">No quizzes added.</p>}
                                    </div>
                                </div>

                                {/* Assignments Section */}
                                <div className="bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-purple-300 flex items-center gap-2"><FileText size={20} /> Assignments</h3>
                                        <button type="button" onClick={() => setCourseData({ ...courseData, assignments: [...courseData.assignments, { title: '', fileUrl: '' }] })} className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded flex items-center gap-1"><Plus size={12} /> Add</button>
                                    </div>
                                    <div className="space-y-4">
                                        {courseData.assignments.map((assign, idx) => (
                                            <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/5 relative group">
                                                <button type="button" onClick={() => setCourseData({ ...courseData, assignments: courseData.assignments.filter((_, i) => i !== idx) })} className="absolute top-2 right-2 text-gray-500 hover:text-red-400"><X size={14} /></button>
                                                <input
                                                    className="w-full bg-transparent border-b border-gray-700 focus:border-purple-500 outline-none text-white text-sm mb-2 pb-1"
                                                    placeholder="Assignment Title"
                                                    value={assign.title}
                                                    onChange={(e) => {
                                                        const newAssigns = [...courseData.assignments];
                                                        newAssigns[idx].title = e.target.value;
                                                        setCourseData({ ...courseData, assignments: newAssigns });
                                                    }}
                                                />
                                                <div className="flex items-center gap-2">
                                                    <input className="flex-1 bg-black/20 text-xs text-gray-400 p-2 rounded" value={assign.fileUrl} readOnly placeholder="Upload PDF" />
                                                    <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 p-2 rounded text-white"><Upload size={12} />
                                                        <input type="file" className="hidden" onChange={(e) => uploadFileHandler(e, (url) => {
                                                            const newAssigns = [...courseData.assignments];
                                                            newAssigns[idx].fileUrl = url;
                                                            setCourseData({ ...courseData, assignments: newAssigns });
                                                        })} />
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                        {courseData.assignments.length === 0 && <p className="text-xs text-gray-500 italic">No assignments added.</p>}
                                    </div>
                                </div>
                            </div>

                            <button type="submit" disabled={loading || !user.isVerified} className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all ${!user.isVerified ? 'bg-gray-600 cursor-not-allowed' : loading ? 'bg-purple-800' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg shadow-purple-900/20 transform hover:-translate-y-0.5'}`}>
                                {loading ? 'Creating Course...' : 'Publish Course'}
                            </button>
                        </form>
                    </motion.div>
                );
            case 'analytics':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <h2 className="text-3xl font-bold text-white mb-6">Student Analytics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <StatCard title="Total Students" value={stats.totalStudents} color="blue" />
                            <StatCard title="Total Watch Time" value={`${stats.totalWatchTime} Hrs`} color="purple" />
                            <StatCard title="Completion Rate" value={`${stats.completionRate}%`} color="green" />
                        </div>
                    </motion.div>
                );
            case 'verification':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">Identity Verification</h2>
                        <div className="bg-gray-900/50 backdrop-blur-md p-10 rounded-3xl border border-white/10">
                            <ShieldCheck className={`mx-auto h-20 w-20 mb-6 ${user.isVerified ? 'text-green-500' : 'text-gray-500'}`} />
                            <h3 className="text-xl font-bold text-white mb-2">{user.isVerified ? 'Verified Instructor' : 'Identity Verification Required'}</h3>
                            {!user.isVerified && (
                                <div className="space-y-6 mt-6">
                                    <p className="text-gray-400">Upload your CNIC or Passport to verify your identity.</p>
                                    <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 hover:bg-white/5 transition-colors cursor-pointer relative">
                                        <input type="file" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                        <Upload className="h-10 w-10 text-gray-500 mx-auto mb-2" />
                                        <p className="text-sm text-gray-400">Click to upload document</p>
                                    </div>
                                    {pendingFile && (
                                        <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-xl">
                                            <p className="text-purple-300 text-sm mb-2">Selected: {pendingFile.name}</p>
                                            <button onClick={handleSubmitVerification} className="bg-purple-600 text-white px-6 py-2 rounded-full font-bold hover:bg-purple-500">Submit Request</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            case 'earnings':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <h2 className="text-3xl font-bold text-white mb-6">My Earnings</h2>
                        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-pink-900 p-10 rounded-3xl shadow-2xl border border-white/10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10"><DollarSign size={100} /></div>
                            <p className="text-purple-200 mb-2 font-medium">Total Lifetime Earnings</p>
                            <h3 className="text-5xl font-bold mb-8">Rs. {user.earnings?.total || 0}</h3>
                            <button className="bg-white text-purple-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">Withdraw Funds</button>
                        </div>
                    </motion.div>
                );
            case 'profile':
                return <Profile />;
            default: return null;
        }
    };

    const SidebarItem = ({ id, label, icon: Icon }) => (
        <button onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-medium transition-all ${activeTab === id ? 'bg-white/10 text-white border border-white/5 shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Icon size={20} className={activeTab === id ? 'text-purple-400' : 'text-gray-500'} /> {label}
        </button>
    );

    const StatCard = ({ title, value, color }) => (
        <div className={`bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 border-l-4 border-l-${color}-500/50`}>
            <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    );

    return (
        <ModernLayout>
            <div className="flex min-h-[calc(100vh-64px)] relative">
                {/* Desktop Sidebar */}
                <div className="w-72 hidden md:block bg-gray-900/40 backdrop-blur-xl border-r border-white/10 sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto p-6">
                    <div className="flex items-center gap-4 mb-10 bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">{user?.name?.charAt(0)}</div>
                        <div><p className="font-bold text-white truncate w-28">{user?.name}</p><p className="text-xs text-cyan-300">Instructor</p></div>
                    </div>
                    <nav className="space-y-2">
                        <SidebarItem id="courses" label="My Courses" icon={Book} />
                        <SidebarItem id="create" label="Create Course" icon={Plus} />
                        <SidebarItem id="analytics" label="Students & Stats" icon={Users} />
                        <SidebarItem id="earnings" label="Earnings" icon={DollarSign} />
                        <SidebarItem id="verification" label="Verification" icon={ShieldCheck} />
                        <SidebarItem id="profile" label="Profile Settings" icon={User} />
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-8 border border-transparent hover:border-red-500/20"
                        >
                            <LogOut size={20} /> Log Out
                        </button>
                    </nav>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden fixed bottom-6 right-6 z-50">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="bg-purple-600 text-white p-4 rounded-full shadow-2xl hover:bg-purple-500 transition-colors">
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-xl md:hidden pt-20 px-6">
                            <nav className="space-y-4">
                                <SidebarItem id="courses" label="My Courses" icon={Book} />
                                <SidebarItem id="create" label="Create Course" icon={Plus} />
                                <SidebarItem id="analytics" label="Students & Stats" icon={Users} />
                                <SidebarItem id="earnings" label="Earnings" icon={DollarSign} />
                                <SidebarItem id="verification" label="Verification" icon={ShieldCheck} />
                                <SidebarItem id="profile" label="Profile Settings" icon={User} />
                                <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors border border-red-500/20 mt-8"><LogOut size={20} /> Log Out</button>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                    {renderContent()}
                </div>
            </div>
        </ModernLayout>
    );
};

export default InstructorDashboard;
