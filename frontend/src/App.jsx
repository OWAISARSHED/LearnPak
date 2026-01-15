import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import ModernLandingPage from './pages/ModernLandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/Student/StudentDashboard';
import InstructorDashboard from './pages/Instructor/InstructorDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Profile from './pages/Profile';
import Courses from './pages/Courses';
import Mentors from './pages/Mentors';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import Careers from './pages/Careers';
import CoursePlayer from './pages/Student/CoursePlayer';
import './App.css';

import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<ModernLandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Public Pages */}
              <Route path="/courses" element={<Courses />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/careers" element={<Careers />} />

              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student"
                element={
                  <ProtectedRoute role="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/instructor"
                element={
                  <ProtectedRoute role="instructor">
                    <InstructorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/course/:id"
                element={
                  <ProtectedRoute role="student">
                    <CoursePlayer />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
