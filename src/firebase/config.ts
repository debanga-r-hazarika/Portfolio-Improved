// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLyppH-FKXW0h0PwrQ8lWMty36DuoUl64",
  authDomain: "personal-portfolio-94a7e.firebaseapp.com",
  projectId: "personal-portfolio-94a7e",
  storageBucket: "personal-portfolio-94a7e.firebasestorage.app",
  messagingSenderId: "146285874562",
  appId: "1:146285874562:web:17aec7658ffb46197e539b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };