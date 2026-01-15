import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import ModernLayout from '../../components/ModernLayout';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    Award,
    DollarSign,
    CheckCircle,
    XCircle,
    Trash2,
    Search,
    LogOut,
    Menu,
    X,
    Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user) return null;

    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0, pendingCourses: 0, totalInstructors: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('/api/admin/stats', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setStats(data);
            } catch (error) { console.error(error); }
        };
        if (user) fetchStats();
    }, [user, activeTab]);

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab stats={stats} setActiveTab={setActiveTab} />;
            case 'users': return <UsersList user={user} />;
            case 'courses': return <CoursesList user={user} />;
            case 'instructors': return <InstructorsList user={user} />;
            case 'payouts': return <PayoutsList />;
            default: return <OverviewTab stats={stats} setActiveTab={setActiveTab} />;
        }
    };

    const SidebarItem = ({ id, label, icon: Icon }) => (
        <button onClick={() => setActiveTab(id)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-medium transition-all ${activeTab === id ? 'bg-white/10 text-white border border-white/5 shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Icon size={20} className={activeTab === id ? 'text-red-400' : 'text-gray-500'} /> {label}
        </button>
    );

    return (
        <ModernLayout>
            <div className="flex min-h-[calc(100vh-64px)]">
                <div className="w-72 hidden md:block bg-gray-900/40 backdrop-blur-xl border-r border-white/10 sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto p-6">
                    <div className="flex items-center gap-4 mb-10 bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg"><Shield size={24} /></div>
                        <div><p className="font-bold text-white">Admin Panel</p><p className="text-xs text-red-300">Super User</p></div>
                    </div>
                    <nav className="space-y-2">
                        <SidebarItem id="overview" label="Overview" icon={LayoutDashboard} />
                        <SidebarItem id="users" label="Users" icon={Users} />
                        <SidebarItem id="courses" label="Courses" icon={BookOpen} />
                        <SidebarItem id="instructors" label="Instructors" icon={Award} />
                        <SidebarItem id="payouts" label="Payouts" icon={DollarSign} />
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 mt-8 border border-transparent hover:border-red-500/20"
                        >
                            <LogOut size={20} /> Log Out
                        </button>
                    </nav>
                </div>
                <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                    {renderContent()}
                </div>
            </div>
        </ModernLayout>
    );
};

const OverviewTab = ({ stats, setActiveTab }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl font-bold text-white mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Users" value={stats.totalUsers} color="blue" onClick={() => setActiveTab('users')} />
            <StatCard title="Total Courses" value={stats.totalCourses} color="green" onClick={() => setActiveTab('courses')} />
            <StatCard title="Pending Courses" value={stats.pendingCourses} color="orange" onClick={() => setActiveTab('courses')} />
            <StatCard title="Instructors" value={stats.totalInstructors} color="purple" onClick={() => setActiveTab('instructors')} />
        </div>
    </motion.div>
);

const StatCard = ({ title, value, color, onClick }) => (
    <div onClick={onClick} className={`bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 border-l-4 border-l-${color}-500/50 cursor-pointer hover:bg-white/5 transition-colors`}>
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <p className={`text-2xl font-bold text-white`}>{value}</p>
    </div>
);

const UsersList = ({ user }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${user.token}` } }).then(({ data }) => setUsers(data)).catch(console.error);
    }, [user]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`/api/admin/users/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
            setUsers(users.filter(u => u._id !== id));
        } catch (e) { alert('Failed'); }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-left text-white">
                    <thead className="bg-white/5 text-gray-400">
                        <tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map(u => (
                            <tr key={u._id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-medium">{u.name}</td>
                                <td className="p-4 text-gray-400">{u.email}</td>
                                <td className="p-4"><span className={`px-2 py-1 rounded text-xs uppercase font-bold ${u.role === 'admin' ? 'bg-red-500/20 text-red-300' : u.role === 'instructor' ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-500/20 text-gray-300'}`}>{u.role}</span></td>
                                <td className="p-4"><button onClick={() => handleDelete(u._id)} className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-full"><Trash2 size={18} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

const CoursesList = ({ user }) => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios.get('/api/courses?status=all', { headers: { Authorization: `Bearer ${user.token}` } }).then(({ data }) => setCourses(data)).catch(console.error);
    }, [user]);

    const handleStatus = async (id, status) => {
        try {
            await axios.put(`/api/courses/${id}/status`, { status }, { headers: { Authorization: `Bearer ${user.token}` } });
            setCourses(courses.map(c => c._id === id ? { ...c, status } : c));
        } catch (e) { alert('Failed'); }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold text-white mb-6">Course Management</h2>
            <div className="space-y-4">
                {courses.map(course => (
                    <div key={course._id} className="bg-gray-900/50 backdrop-blur-md p-4 rounded-xl border border-white/10 flex flex-col md:flex-row justify-between items-center group hover:border-gray-600 transition-colors">
                        <div className="flex gap-4 items-center w-full md:w-auto">
                            <img src={course.thumbnail} alt="" className="w-16 h-16 object-cover rounded-lg" />
                            <div>
                                <h3 className="font-bold text-white">{course.title}</h3>
                                <p className="text-sm text-gray-400">Instructor: {course.instructor?.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${course.status === 'approved' ? 'bg-green-500/20 text-green-300' : course.status === 'rejected' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{course.status}</span>
                            {course.status !== 'approved' && <button onClick={() => handleStatus(course._id, 'approved')} className="text-green-400 hover:bg-green-500/10 p-2 rounded"><CheckCircle size={20} /></button>}
                            {course.status !== 'rejected' && <button onClick={() => handleStatus(course._id, 'rejected')} className="text-red-400 hover:bg-red-500/10 p-2 rounded"><XCircle size={20} /></button>}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const InstructorsList = ({ user }) => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        axios.get('/api/admin/instructors', { headers: { Authorization: `Bearer ${user.token}` } }).then(({ data }) => setInstructors(data)).catch(console.error);
    }, [user]);

    const handleVerify = async (id) => {
        try {
            await axios.put(`/api/admin/verify-instructor/${id}`, {}, { headers: { Authorization: `Bearer ${user.token}` } });
            setInstructors(instructors.map(i => i._id === id ? { ...i, isVerified: true } : i));
        } catch (e) { alert('Failed'); }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold text-white mb-6">Instructor Verification</h2>
            <div className="space-y-4">
                {instructors.map(inst => (
                    <div key={inst._id} className="bg-gray-900/50 backdrop-blur-md p-6 rounded-xl border border-white/10 flex flex-col md:flex-row justify-between items-center">
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-white text-lg">{inst.name}</h3>
                                {inst.isVerified && <CheckCircle size={16} className="text-green-400" />}
                            </div>
                            <p className="text-sm text-gray-400">{inst.email}</p>
                            {inst.identityDoc && <a href={inst.identityDoc} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-300 underline mt-1 inline-block">View Identity Document</a>}
                        </div>
                        {!inst.isVerified && <button onClick={() => handleVerify(inst._id)} className="mt-4 md:mt-0 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-green-900/20">Verify Identity</button>}
                    </div>
                ))}
                {instructors.length === 0 && <p className="text-gray-500 text-center py-10">No instructors found.</p>}
            </div>
        </motion.div>
    );
};

const PayoutsList = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-white/10">
        <DollarSign className="mx-auto h-16 w-16 text-gray-700 mb-4" />
        <h3 className="text-xl font-bold text-white">No Payout Requests</h3>
        <p className="text-gray-500">There are currently no active payout requests pending.</p>
    </motion.div>
);

export default AdminDashboard;
