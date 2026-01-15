import { PlayCircle, Clock, Globe, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, enrolled, onEnroll }) => {
    return (
        <div className="group bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-lg border border-white/10 hover:border-purple-500/50 hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
            <div className="relative">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-3 left-3">
                    <span className="bg-purple-500/20 backdrop-blur-sm text-purple-200 text-xs px-3 py-1 rounded-full border border-purple-500/30">
                        {course.category}
                    </span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="font-bold text-lg mb-2 text-white truncate group-hover:text-purple-400 transition-colors">{course.title}</h3>

                <div className="flex items-center text-gray-400 text-sm mb-4 gap-4">
                    <span className="flex items-center gap-1.5"><Globe size={14} className="text-blue-400" /> {course.language}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-pink-400" /> {course.lessons?.length || 0} Lessons</span>
                </div>

                <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                    <span className="font-bold text-xl text-white">
                        {course.price === 0 ? 'Free' : `Rs. ${course.price}`}
                    </span>
                    {enrolled ? (
                        course.isCompleted ? (
                            <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm flex items-center gap-1.5 border border-green-500/30 font-bold cursor-default">
                                <CheckCircle size={16} /> Completed
                            </div>
                        ) : (
                            <Link to={`/course/${course._id}`} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm flex items-center gap-1.5 hover:shadow-lg hover:shadow-green-500/20 transition-all">
                                <PlayCircle size={16} /> Continue
                            </Link>
                        )
                    ) : (
                        <button
                            onClick={onEnroll}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm border border-white/10 transition-all hover:border-purple-500/50"
                        >
                            Enroll Now
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
