import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

// Export types to make them available for import
export interface Project {
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

export interface LinkedInPost {
  url: string;
  title: string;
}

// Collection references
const projectsCollection = collection(db, 'projects');
const linkedInPostsCollection = collection(db, 'linkedInPosts');

// Projects CRUD operations
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const snapshot = await getDocs(projectsCollection);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Project));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const addProject = async (project: Omit<Project, 'id'>): Promise<Project | null> => {
  try {
    const docRef = await addDoc(projectsCollection, project);
    return {
      id: docRef.id,
      ...project,
    } as Project;
  } catch (error) {
    console.error('Error adding project:', error);
    return null;
  }
};

export const updateProject = async (project: Project): Promise<boolean> => {
  try {
    const projectRef = doc(db, 'projects', project.id);
    await updateDoc(projectRef, { ...project });
    return true;
  } catch (error) {
    console.error('Error updating project:', error);
    return false;
  }
};

export const deleteProject = async (projectId: string): Promise<boolean> => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await deleteDoc(projectRef);
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
};

// LinkedIn Posts CRUD operations
export const fetchLinkedInPosts = async (): Promise<LinkedInPost[]> => {
  try {
    const snapshot = await getDocs(linkedInPostsCollection);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        url: data.url,
        title: data.title,
      } as LinkedInPost;
    });
  } catch (error) {
    console.error('Error fetching LinkedIn posts:', error);
    return [];
  }
};

export const addLinkedInPost = async (post: LinkedInPost): Promise<LinkedInPost | null> => {
  try {
    const docRef = await addDoc(linkedInPostsCollection, post);
    return {
      url: post.url,
      title: post.title,
    };
  } catch (error) {
    console.error('Error adding LinkedIn post:', error);
    return null;
  }
};

export const deleteLinkedInPost = async (postUrl: string): Promise<boolean> => {
  try {
    // First get the document with the matching URL
    const snapshot = await getDocs(linkedInPostsCollection);
    const postDoc = snapshot.docs.find(doc => doc.data().url === postUrl);
    
    if (postDoc) {
      await deleteDoc(doc(db, 'linkedInPosts', postDoc.id));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting LinkedIn post:', error);
    return false;
  }
};

// Initialize with default data if collections are empty
export const initializeFirestoreData = async (defaultProjects: Project[], defaultPosts: LinkedInPost[]) => {
  try {
    // Check if projects collection is empty
    const projectsSnapshot = await getDocs(projectsCollection);
    if (projectsSnapshot.empty) {
      // Add default projects
      for (const project of defaultProjects) {
        await setDoc(doc(projectsCollection, project.id), project);
      }
      console.log('Initialized default projects');
    }

    // Check if LinkedIn posts collection is empty
    const postsSnapshot = await getDocs(linkedInPostsCollection);
    if (postsSnapshot.empty) {
      // Add default LinkedIn posts
      for (const post of defaultPosts) {
        await addDoc(linkedInPostsCollection, post);
      }
      console.log('Initialized default LinkedIn posts');
    }
  } catch (error) {
    console.error('Error initializing Firestore data:', error);
  }
};