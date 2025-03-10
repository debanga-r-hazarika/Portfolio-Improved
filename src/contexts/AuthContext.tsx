import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface LinkedInPost {
  url: string;
  title: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  linkedInPosts: LinkedInPost[];
  setLinkedInPosts: (posts: LinkedInPost[]) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// In a real application, this would be stored securely on the server
const ADMIN_PASSWORD = 'Debanga@91';

const initialLinkedInPosts = [
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

const initialProjects = [
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('isAuthenticated');
    return stored === 'true';
  });
  
  const [projects, setProjects] = useState(() => {
    const storedProjects = localStorage.getItem('projects');
    return storedProjects ? JSON.parse(storedProjects) : initialProjects;
  });

  const [linkedInPosts, setLinkedInPosts] = useState(() => {
    const storedPosts = localStorage.getItem('linkedInPosts');
    return storedPosts ? JSON.parse(storedPosts) : initialLinkedInPosts;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('linkedInPosts', JSON.stringify(linkedInPosts));
  }, [linkedInPosts]);

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
    <AuthContext.Provider value={{ isAuthenticated, login, logout, projects, setProjects, linkedInPosts, setLinkedInPosts }}>
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