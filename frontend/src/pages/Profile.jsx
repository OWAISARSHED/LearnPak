import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { Camera, Save, User as UserIcon, Lock, Mail } from 'lucide-react';

const Profile = () => {
    const { user, login } = useContext(AuthContext); // login used to update context
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [message, setMessage] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio || '');
            setAvatar(user.avatar || '');
        }
    }, [user]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        setUploading(true);

        try {
            const { data } = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setAvatar(data.filePath); // keeps it relative e.g. /uploads/image.png
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage(null);
        if (password && password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const { data } = await axios.put(
                '/api/auth/profile',
                { name, email, bio, password, avatar },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            // Storage update logic handled by context usually, but here we might need to manually update localstorage if the token changed (it likely didn't)
            // But we should update the Auth Context state.
            // Simplified: Re-login "effect" or just update localstorage
            localStorage.setItem('userInfo', JSON.stringify(data));
            // Force reload or better, update context (if exposed)
            // For now, reload window to reflect changes globally if context doesn't auto-update from localstorage listener
            window.location.reload();
            alert('Profile Updated Successfully');
        } catch (error) {
            setMessage('Error Updating Profile');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Edit Profile</h1>
            {message && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{message}</div>}

            <form onSubmit={submitHandler} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-32 h-32 mb-4">
                        <img
                            src={avatar ? (avatar.startsWith('http') ? avatar : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${avatar}`) : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full border-4 border-gray-100 shadow-sm"
                        />
                        <label className="absolute bottom-0 right-0 bg-brand-600 p-2 rounded-full cursor-pointer hover:bg-brand-700 transition-colors text-white shadow-lg">
                            <Camera size={20} />
                            <input type="file" className="hidden" onChange={uploadFileHandler} accept="image/*" />
                        </label>
                    </div>
                    {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                className="pl-10 w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="email"
                                className="pl-10 w-full p-3 border border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed"
                                value={email}
                                disabled
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all h-32 resize-none"
                            placeholder="Tell us about yourself..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                    </div>

                    <hr className="border-gray-100" />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password (Optional)</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="password"
                                className="pl-10 w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                placeholder="Leave blank to keep current password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="password"
                                className="pl-10 w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-brand-600 text-white p-4 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 flex justify-center items-center gap-2"
                    >
                        <Save size={20} /> Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
