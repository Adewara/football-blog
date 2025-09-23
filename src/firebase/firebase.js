// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzMlj1qYu93ikUO248lFDdMbSvVZwgsnA",
  authDomain: "football-blog-1b51b.firebaseapp.com",
  projectId: "football-blog-1b51b",
  storageBucket: "football-blog-1b51b.firebasestorage.app",
  messagingSenderId: "158184374503",
  appId: "1:158184374503:web:f3e975dab1022050e02242",
  measurementId: "G-C9FFZTNEDE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Disable persistent login
setPersistence(auth, inMemoryPersistence);

export { app, analytics, auth };
