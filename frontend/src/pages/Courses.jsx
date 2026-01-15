import { motion } from 'framer-motion';
import { Star, Clock, BookOpen, Search } from 'lucide-react';
import ModernLayout from '../components/ModernLayout';

const courses = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        instructor: "Sir Ubaid",
        rating: 4.9,
        reviews: 120,
        duration: "40h",
        lectures: 154,
        price: "Rs. 4,999",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Development"
    },
    {
        id: 2,
        title: "Freelancing Mastery for Beginners",
        instructor: "Sara Khan",
        rating: 4.8,
        reviews: 85,
        duration: "12h",
        lectures: 45,
        price: "Rs. 2,499",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Business"
    },
    {
        id: 3,
        title: "UI/UX Design Fundamentals",
        instructor: "Ali Raza",
        rating: 4.7,
        reviews: 56,
        duration: "18h",
        lectures: 62,
        price: "Rs. 3,999",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a5638d48?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Design"
    },
    {
        id: 4,
        title: "Python for Data Science",
        instructor: "Dr. Ayesha",
        rating: 4.9,
        reviews: 210,
        duration: "35h",
        lectures: 110,
        price: "Rs. 5,999",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Data Science"
    },
    {
        id: 5,
        title: "Digital Marketing Zero to Hero",
        instructor: "Hamza Ahmed",
        rating: 4.6,
        reviews: 90,
        duration: "20h",
        lectures: 80,
        price: "Rs. 2,999",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Marketing"
    },
    {
        id: 6,
        title: "Mobile App Development with Flutter",
        instructor: "Bilal Sheikh",
        rating: 4.8,
        reviews: 45,
        duration: "25h",
        lectures: 95,
        price: "Rs. 4,499",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Mobile Dev"
    }
];

const Courses = () => {
    return (
        <ModernLayout>
            <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-white mb-6"
                    >
                        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Premium Courses</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Master the skills that top employers look for. From coding to design, we have you covered.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 max-w-xl mx-auto relative"
                    >
                        <input
                            type="text"
                            placeholder="Search for a course..."
                            className="w-full bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-full py-4 px-6 pl-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 overflow-hidden group hover:border-purple-500/30 transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
                                <div className="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-white border border-white/10 shadow-lg">
                                    {course.price}
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-900/50 border border-purple-500/30 px-2 py-1 rounded-md">
                                        {course.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-purple-400 transition-colors">{course.title}</h3>
                                </div>
                                <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                        {course.instructor.charAt(0)}
                                    </span>
                                    {course.instructor}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500 border-t border-white/10 pt-4 mt-4">
                                    <div className="flex items-center gap-1 text-yellow-400 font-bold">
                                        <Star className="w-4 h-4 fill-current" /> {course.rating}
                                        <span className="text-gray-500 font-normal ml-1">({course.reviews})</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <Clock className="w-3 h-3" /> {course.duration}
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <BookOpen className="w-3 h-3" /> {course.lectures}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </ModernLayout>
    );
};

export default Courses;
