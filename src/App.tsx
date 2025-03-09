import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import FloatingNav from './components/layout/FloatingNav';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProjectsAdmin from './components/admin/ProjectsAdmin';
import AdminLogin from './components/admin/AdminLogin';
import { useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
}

function AdminLoginWrapper() {
  const navigate = useNavigate();
  return <AdminLogin onSuccess={() => navigate('/admin')} />;
}

function AdminPanel() {
  return <ProjectsAdmin />;
}

function MainLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <FloatingNav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/admin/login" element={<AdminLoginWrapper />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
