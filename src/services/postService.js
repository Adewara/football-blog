import { db, storage } from "../firebase/firebase";
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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const postsCollection = collection(db, "posts");

/** Upload image to Firebase Storage */
const uploadImage = async (file, postId) => {
  const imageRef = ref(storage, `posts/${postId}/${Date.now()}-${file.name}`);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
};

/** Create a new post (image required) */
export const createPost = async (post) => {
  try {
    if (!post.image) throw new Error("Image is required to create a post");

    // Step 1: create document without image
    const docRef = await addDoc(postsCollection, {
      title: post.title,
      content: post.content,
      image: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Step 2: upload image
    const imageUrl = await uploadImage(post.image, docRef.id);

    // Step 3: update document with image URL
    await updateDoc(docRef, { image: imageUrl });

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
    const postRef = doc(db, "posts", id);
    const docSnap = await getDoc(postRef);

    if (!docSnap.exists()) {
      throw new Error(`Document with id ${id} does not exist`);
    }

    let imageUrl = updatedPost.image;

    // ✅ If a new File is passed, upload to Storage + delete old image
    if (updatedPost.image instanceof File) {
      const oldImage = docSnap.data().image;
      if (oldImage) {
        try {
          // Create ref directly from the download URL
          const oldImageRef = ref(storage, oldImage);
          await deleteObject(oldImageRef);
        } catch (err) {
          console.warn("Old image not found or already deleted:", err.message);
        }
      }
      imageUrl = await uploadImage(updatedPost.image, id);
    }

    await updateDoc(postRef, {
      title: updatedPost.title,
      content: updatedPost.content,
      image: imageUrl || null,
      updatedAt: serverTimestamp(),
    });

    console.log("Post updated successfully:", id);
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

/** Delete post + its image */
export const deletePost = async (id, imageUrl) => {
  try {
    await deleteDoc(doc(db, "posts", id));

    if (imageUrl) {
      try {
        const imageRef = ref(storage, imageUrl); // works with full download URL
        await deleteObject(imageRef);
      } catch (err) {
        console.warn("Image already deleted or not found:", err.message);
      }
    }

    console.log("Post and image deleted successfully:", id);
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
