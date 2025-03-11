import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, LogOut } from 'lucide-react';
import ProjectForm from './ProjectForm';
import LinkedInPostsAdmin from './LinkedInPostsAdmin';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { addProject, updateProject, deleteProject } from '../../firebase/firestore';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    github: string;
    live: string;
  };
}

export default function ProjectsAdmin() {
  const { projects, setProjects, logout, refreshProjects } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const handleAddProject = () => {
    setCurrentProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        // Delete from Firestore
        await deleteProject(projectId);
        
        // Remove from local state
        const updatedProjects = projects.filter(p => p.id !== projectId);
        setProjects(updatedProjects);
        
        // Refresh projects from Firestore to ensure consistency
        await refreshProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleProjectSubmit = async (projectData: Omit<Project, 'id'>) => {
    try {
      if (currentProject) {
        // Update existing project in Firestore
        const updatedProject = { ...projectData, id: currentProject.id };
        await updateProject(updatedProject);
        
        // Update local state
        const updatedProjects = projects.map(p =>
          p.id === currentProject.id ? updatedProject : p
        );
        setProjects(updatedProjects);
      } else {
        // Add new project to Firestore
        const newProjectRef = await addProject(projectData);
        
        if (newProjectRef) {
          // Add to local state
          const newProject = { ...projectData, id: newProjectRef.id };
          setProjects([...projects, newProject]);
        }
      }
      
      // Refresh projects to sync with Firestore
      await refreshProjects();
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Projects</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
          <button
            onClick={handleAddProject}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Project
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEditProject(project)}
                className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <LinkedInPostsAdmin />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white pr-8">
              {currentProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            <ProjectForm
              project={currentProject}
              onSubmit={handleProjectSubmit}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}