// Export all Firebase functionality
import { db } from './config';
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  fetchLinkedInPosts,
  addLinkedInPost,
  deleteLinkedInPost,
  initializeFirestoreData
} from './firestore';

export {
  db,
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  fetchLinkedInPosts,
  addLinkedInPost,
  deleteLinkedInPost,
  initializeFirestoreData
};