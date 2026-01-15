import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import CourseCard from '../../components/CourseCard';
import ModernLayout from '../../components/ModernLayout';
import Profile from '../Profile';
import {
    LayoutDashboard,
    BookOpen,
    Award,
    MessageCircle,
    BarChart2,
    Search,
    Play,
    Send,
    LogOut,
    Menu,
    X,
    User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentDashboard = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) return null;

    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [activeTab, setActiveTab] = useState('active');
    const [loading, setLoading] = useState(true);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('All');

    // AI Chat State
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'AI', text: "Hello! I'm your LearnPak virtual assistant. How can I help you regarding your courses or career path today?" },
    ]);

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;
        const newMsg = { sender: 'Me', text: chatInput };
        setMessages([...messages, newMsg]);
        setChatInput('');

        // Simulate AI reply
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'AI', text: "I'm analyzing your request... (This applies to the actual AI integration later!)" }]);
        }, 1000);
    };

    useEffect(() => {
        if (user) fetchData();
    }, [user, activeTab]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const { data: allCourses } = await axios.get('/api/courses');
            setCourses(allCourses);

            if (user && user.token) {
                const { data: myEnrollments } = await axios.get('/api/enrollments', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setEnrolledCourses(myEnrollments.map(e => ({
                    ...e.course,
                    enrollmentId: e._id,
                    progress: e.progress,
                    isCompleted: e.isCompleted
                })));
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleEnroll = async (courseId) => {
        try {
            await axios.post('/api/enrollments',
                { courseId },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            alert('Enrolled successfully!');
            fetchData();
            setActiveTab('active');
        } catch (err) {
            alert(err.response?.data?.message || 'Enrollment failed');
        }
    };

    const enrolledIds = new Set(enrolledCourses.map(c => c._id));

    // Views
    const renderContent = () => {
        switch (activeTab) {
            case 'active':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Active Courses</h2>
                        {enrolledCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {enrolledCourses.map(course => (
                                    <CourseCard key={course._id} course={course} enrolled={true} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-white/10">
                                <BookOpen className="mx-auto h-20 w-20 text-gray-700 mb-6" />
                                <p className="text-xl text-gray-400 mb-6">You haven't enrolled in any courses yet.</p>
                                <button
                                    onClick={() => setActiveTab('browse')}
                                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:-translate-y-1"
                                >
                                    Browse Courses
                                </button>
                            </div>
                        )}
                    </motion.div>
                );
            case 'profile':
                return <Profile />;
            case 'browse':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <h2 className="text-3xl font-bold text-white">Available Courses</h2>

                            {/* Language Filter */}
                            <div className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-md p-1 pr-4 rounded-xl border border-white/10">
                                <span className="bg-white/10 px-3 py-2 rounded-lg text-sm font-bold text-purple-300">Language</span>
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="bg-transparent text-white text-sm outline-none cursor-pointer"
                                >
                                    <option value="All" className="bg-gray-900">All Languages</option>
                                    <option value="Urdu" className="bg-gray-900">Urdu</option>
                                    <option value="English" className="bg-gray-900">English</option>
                                    <option value="Punjabi" className="bg-gray-900">Punjabi</option>
                                    <option value="Sindhi" className="bg-gray-900">Sindhi</option>
                                    <option value="Pashto" className="bg-gray-900">Pashto</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses
                                .filter(c => !enrolledIds.has(c._id))
                                .filter(c => selectedLanguage === 'All' || c.language === selectedLanguage)
                                .map(course => (
                                    <CourseCard
                                        key={course._id}
                                        course={course}
                                        enrolled={false}
                                        onEnroll={() => handleEnroll(course._id)}
                                    />
                                ))}
                            {courses.filter(c => !enrolledIds.has(c._id) && (selectedLanguage === 'All' || c.language === selectedLanguage)).length === 0 && (
                                <div className="col-span-full text-center py-20 text-gray-500">
                                    <p>No courses found for the selected language.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
            case 'certificates':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">My Certificates</h2>
                        <div className="bg-gray-900/50 backdrop-blur-md p-10 rounded-2xl border border-white/10 text-center">
                            <Award className="mx-auto h-20 w-20 text-yellow-500/50 mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-2">No Certificates Yet</h3>
                            <p className="text-gray-400">Complete a course to earn your first verified certificate!</p>
                        </div>
                    </motion.div>
                );
            case 'help':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-[600px] flex flex-col bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                        <div className="p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 flex items-center gap-3 border-b border-white/10">
                            <MessageCircle className="text-purple-400" />
                            <h3 className="font-bold text-lg text-white">AI Learning Assistant</h3>
                        </div>
                        <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex gap-3 ${msg.sender === 'Me' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${msg.sender === 'AI' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                                        {msg.sender === 'AI' ? 'AI' : 'Me'}
                                    </div>
                                    <div className={`p-4 rounded-2xl max-w-[80%] ${msg.sender === 'AI' ? 'bg-white/10 text-gray-200 rounded-tl-none' : 'bg-purple-600/20 text-purple-100 border border-purple-500/30 rounded-tr-none'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-black/20 border-t border-white/10">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask anything about your studies..."
                                    className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-xl transition-colors"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'progress':
                return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Learning Progress</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                                <h3 className="font-bold text-gray-200 mb-6 flex items-center gap-2"><BarChart2 className="text-purple-400" /> Weekly Activity</h3>
                                <div className="flex items-end gap-2 h-48">
                                    {[40, 70, 30, 85, 50, 60, 90].map((h, i) => (
                                        <div key={i} className="flex-1 bg-white/5 rounded-t-lg relative group overflow-hidden">
                                            <div
                                                className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-lg transition-all duration-700 ease-out"
                                                style={{ height: `${h}%` }}
                                            ></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4 text-xs text-gray-500 uppercase tracking-wider">
                                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                </div>
                            </div>

                            <div className="bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                                <h3 className="font-bold text-gray-200 mb-6">Course Completion</h3>
                                <div className="space-y-6">
                                    {enrolledCourses.slice(0, 3).map((course, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-gray-300">{course.title}</span>
                                                <span className="font-bold text-purple-400">{(i + 1) * 25}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${(i + 1) * 25}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                    {enrolledCourses.length === 0 && <p className="text-gray-500 italic">Enroll in courses to see progress tracking here.</p>}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    const SidebarItem = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === id
                ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-500/30 shadow-inner'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
        >
            <Icon size={20} className={activeTab === id ? 'text-purple-400' : 'text-gray-500'} />
            {label}
        </button>
    );

    return (
        <ModernLayout>
            <div className="flex min-h-[calc(100vh-64px)] relative">
                {/* Desktop Sidebar */}
                <div className="w-72 hidden md:block bg-gray-900/40 backdrop-blur-xl border-r border-white/10 sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-10 bg-white/5 p-4 rounded-2xl border border-white/10">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-bold text-white truncate">{user?.name || 'Student'}</p>
                                <p className="text-xs text-purple-300 capitalize">{user?.role || 'Student'}</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            <SidebarItem id="active" label="Active Courses" icon={BookOpen} />
                            <SidebarItem id="browse" label="Browse Courses" icon={Search} />
                            <SidebarItem id="certificates" label="My Certificates" icon={Award} />
                            <SidebarItem id="progress" label="My Progress" icon={BarChart2} />
                            <SidebarItem id="profile" label="Profile Settings" icon={User} />
                            <SidebarItem id="help" label="AI Assistant" icon={MessageCircle} />
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-8 border border-transparent hover:border-red-500/20"
                            >
                                <LogOut size={20} />
                                Log Out
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden fixed bottom-6 right-6 z-50">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="bg-purple-600 text-white p-4 rounded-full shadow-2xl hover:bg-purple-500 transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Sidebar Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-xl md:hidden pt-20 px-6"
                        >
                            <nav className="space-y-4">
                                <SidebarItem id="active" label="Active Courses" icon={BookOpen} />
                                <SidebarItem id="browse" label="Browse Courses" icon={Search} />
                                <SidebarItem id="certificates" label="My Certificates" icon={Award} />
                                <SidebarItem id="progress" label="My Progress" icon={BarChart2} />
                                <SidebarItem id="profile" label="Profile Settings" icon={User} />
                                <SidebarItem id="help" label="AI Assistant" icon={MessageCircle} />
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors border border-red-500/20 mt-8"
                                >
                                    <LogOut size={20} /> Log Out
                                </button>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                    {renderContent()}
                </div>
            </div>
        </ModernLayout>
    );
};

export default StudentDashboard;
