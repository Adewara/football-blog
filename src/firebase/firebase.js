// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzMlj1qYu93ikUO248lFDdMbSvVZwgsnA",
  authDomain: "football-blog-1b51b.firebaseapp.com",
  projectId: "football-blog-1b51b",
  storageBucket: "football-blog-1b51b.appspot.com",
  messagingSenderId: "158184374503",
  appId: "1:158184374503:web:f3e975dab1022050e02242",
  measurementId: "G-C9FFZTNEDE",
};

// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

setPersistence(auth, inMemoryPersistence);

// Firestore
export { app, auth, db, storage };
