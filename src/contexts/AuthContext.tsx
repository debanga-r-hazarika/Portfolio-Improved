import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  fetchProjects, 
  fetchLinkedInPosts, 
  addProject, 
  updateProject, 
  deleteProject,
  addLinkedInPost,
  deleteLinkedInPost,
  initializeFirestoreData,
  Project,
  LinkedInPost
} from '../firebase/firestore';

// In a real application, this would be stored securely on the server
const ADMIN_PASSWORD = 'Debanga@91';

const initialLinkedInPosts: LinkedInPost[] = [
  {
    url: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7301979138838409217',
    title: 'LinkedIn Post'
  },
  {
    url: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7260237136778403840',
    title: 'LinkedIn Post'
  },
  {
    url: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7301984124309843968',
    title: 'LinkedIn Post'
  },
  {
    url: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7222494229191614464',
    title: 'LinkedIn Post'
  }
];

const initialProjects: Project[] = [
  {
    id: '1',
    title: "Expense Tracker",
    description: "Full-stack expense tracking application with authentication and data visualization",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    links: {
      github: "https://github.com/debanga/expense-tracker",
      live: "https://expense-tracker-demo.com"
    }
  }
];

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  linkedInPosts: LinkedInPost[];
  setLinkedInPosts: (posts: LinkedInPost[]) => void;
  refreshProjects: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('isAuthenticated');
    return stored === 'true';
  });
  
  const [projects, setProjects] = useState<Project[]>(() => {
    const storedProjects = localStorage.getItem('projects');
    return storedProjects ? JSON.parse(storedProjects) : initialProjects;
  });

  const [linkedInPosts, setLinkedInPosts] = useState<LinkedInPost[]>(() => {
    const storedPosts = localStorage.getItem('linkedInPosts');
    return storedPosts ? JSON.parse(storedPosts) : initialLinkedInPosts;
  });
  
  const [loading, setLoading] = useState(true);

  // Refresh projects from Firestore
  const refreshProjects = async () => {
    try {
      const firestoreProjects = await fetchProjects();
      if (firestoreProjects.length > 0) {
        setProjects(firestoreProjects);
        localStorage.setItem('projects', JSON.stringify(firestoreProjects));
      }
    } catch (error) {
      console.error('Error refreshing projects:', error);
    }
  };

  // Sync data with Firestore on initial load
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Initialize Firestore with default data if collections are empty
        await initializeFirestoreData(initialProjects, initialLinkedInPosts);
        
        // Fetch data from Firestore
        await refreshProjects();
        
        const firestorePosts = await fetchLinkedInPosts();
        
        if (firestorePosts.length > 0) {
          setLinkedInPosts(firestorePosts);
          localStorage.setItem('linkedInPosts', JSON.stringify(firestorePosts));
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initializeData();
  }, []);

  // Sync projects to Firestore
  useEffect(() => {
    const syncProjects = async () => {
      if (!loading) {
        try {
          // Save to localStorage first
          localStorage.setItem('projects', JSON.stringify(projects));
          
          // Sync with Firestore
          for (const project of projects) {
            if (project.id) {
              await updateProject(project);
            } else {
              await addProject(project);
            }
          }
        } catch (error) {
          console.error('Error syncing projects:', error);
        }
      }
    };

    syncProjects();
  }, [projects, loading]);

  // Sync LinkedIn posts to Firestore
  useEffect(() => {
    const syncLinkedInPosts = async () => {
      if (!loading) {
        try {
          // Save to localStorage first
          localStorage.setItem('linkedInPosts', JSON.stringify(linkedInPosts));
          
          // Fetch current posts to compare
          const currentPosts = await fetchLinkedInPosts();
          
          // Find posts to add (in local but not in Firestore)
          const postsToAdd = linkedInPosts.filter(localPost => 
            !currentPosts.some(firestorePost => firestorePost.url === localPost.url)
          );
          
          // Find posts to delete (in Firestore but not in local)
          const postsToDelete = currentPosts.filter(firestorePost => 
            !linkedInPosts.some(localPost => localPost.url === firestorePost.url)
          );
          
          // Add new posts to Firestore
          for (const post of postsToAdd) {
            await addLinkedInPost(post);
          }
          
          // Delete removed posts from Firestore
          for (const post of postsToDelete) {
            await deleteLinkedInPost(post.url);
          }
        } catch (error) {
          console.error('Error syncing LinkedIn posts:', error);
        }
      }
    };

    syncLinkedInPosts();
  }, [linkedInPosts, loading]);

  const login = (password: string) => {
    const isValid = password === ADMIN_PASSWORD;
    if (isValid) {
      setIsAuthenticated(true);
    }
    return isValid;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      projects, 
      setProjects, 
      linkedInPosts, 
      setLinkedInPosts,
      refreshProjects 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}