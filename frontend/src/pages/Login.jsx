import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import ModernLayout from '../components/ModernLayout';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            if (user.role === 'admin') navigate('/admin');
            else if (user.role === 'instructor') navigate('/instructor');
            else navigate('/student');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <ModernLayout>
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full space-y-8 bg-gray-900/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/10"
                >
                    <div>
                        <h2 className="mt-2 text-center text-3xl font-extrabold text-white tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-400">
                            Sign in to access your personalized dashboard
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded text-red-400 text-sm">
                            <p>{error}</p>
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="appearance-none rounded-xl relative block w-full pl-10 pr-3 py-3 border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="appearance-none rounded-xl relative block w-full pl-10 pr-3 py-3 border border-white/10 bg-white/5 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-gray-500 hover:text-white transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-900/20"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-4 text-sm text-gray-400">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/register')}
                            className="font-bold text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            Register here
                        </button>
                    </div>
                </motion.div>
            </div>
        </ModernLayout>
    );
};

export default Login;
