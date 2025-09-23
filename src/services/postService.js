import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

const postsCollection = collection(db, "posts");

/** Create a new post */
export const createPost = async (post) => {
  try {
    const docRef = await addDoc(postsCollection, {
      ...post,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const docSnap = await getDoc(docRef);
    return { id: docRef.id, ...docSnap.data() };
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

/** Update an existing post */
export const updatePost = async (id, updatedPost) => {
  try {
    const sanitizedPost = Object.fromEntries(
      Object.entries(updatedPost).filter(([_, value]) => value !== undefined)
    );

    const postRef = doc(db, "posts", id);
    console.log("Updating postRef:", postRef.path);

    // Check if the document exists
    const docSnap = await getDoc(postRef);
    console.log("Document exists?", docSnap.exists());
    if (!docSnap.exists()) {
      throw new Error(`Document with id ${id} does not exist`);
    }

    await updateDoc(postRef, {
      ...sanitizedPost,
      updatedAt: serverTimestamp(),
    });

    console.log("Post updated successfully:", id);
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

/** Delete a post */
export const deletePost = async (id) => {
  try {
    await deleteDoc(doc(db, "posts", id));
    console.log("Post deleted successfully:", id);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

/** Fetch all posts once */
export const fetchPosts = async () => {
  try {
    const q = query(postsCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

/** Real-time listener for posts */
export const subscribeToPosts = (callback, errorCallback) => {
  try {
    const q = query(postsCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(posts);
      },
      (err) => {
        console.error("Firestore subscription error:", err);
        if (errorCallback) errorCallback(err);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.error("subscribeToPosts failed:", err);
    if (errorCallback) errorCallback(err);
    return () => {};
  }
};
