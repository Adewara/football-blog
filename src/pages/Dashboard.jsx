import { useEffect, useReducer, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

import DashboardSidebar from "../Components/DashboardSidebar";
import BlogView from "../Components/BlogView";
import DashboardModals from "../Components/DashboardModals";

import { dashboardReducer, initialState } from "../reducers/dashboardReducer";
import {
  createPost,
  updatePost,
  deletePost,
  subscribeToPosts,
} from "../services/postService";

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Prevent accidental page leave
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Firestore real-time subscription
  useEffect(() => {
    const unsubscribe = subscribeToPosts(
      (posts) => {
        dispatch({ type: "SET_POSTS", payload: posts });
        setLoading(false);
      },
      (err) => {
        console.error("Firestore subscription error:", err);
        setError("Failed to load posts");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // CRUD Handlers

  // Create Post (relies on subscription to update state)
  const handleCreate = async (newPost) => {
    try {
      await createPost(newPost);
    } catch (err) {
      alert("Failed to create post: " + err.message);
    } finally {
      dispatch({ type: "CLOSE_MODAL" });
    }
  };

  // Update Post
  const handleSave = async (updatedData) => {
    if (!state.activePost) return;

    console.log("Attempting to update post:", state.activePost);

    try {
      await updatePost(state.activePost.id, updatedData);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update post: " + err.message);
    } finally {
      dispatch({ type: "CLOSE_MODAL" });
    }
  };

  // Delete Post
  const handleDelete = async () => {
    if (!state.activePost) return;

    try {
      await deletePost(state.activePost.id);
      dispatch({ type: "DELETE_POST" });
    } catch (err) {
      alert("Failed to delete post: " + err.message);
    } finally {
      dispatch({ type: "CLOSE_MODAL" });
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logout();
      dispatch({ type: "CLOSE_MODAL" });
      navigate("/auth");
    } catch (err) {
      alert("Failed to logout: " + err.message);
    }
  };

  // Render

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <DashboardSidebar
        posts={state.posts}
        activeId={state.activePost?.id}
        onSelect={(post) =>
          dispatch({ type: "SET_ACTIVE_POST", payload: post })
        }
        onCreate={() => dispatch({ type: "OPEN_MODAL", payload: "create" })}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 relative">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => dispatch({ type: "OPEN_MODAL", payload: "logout" })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 mt-20">Loading posts...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-20">{error}</p>
        ) : state.activePost ? (
          <BlogView
            post={state.activePost}
            onEdit={() => dispatch({ type: "OPEN_MODAL", payload: "edit" })}
            onDelete={() => dispatch({ type: "OPEN_MODAL", payload: "delete" })}
          />
        ) : (
          <p className="text-center text-gray-500 mt-20">
            Select a post to view
          </p>
        )}
      </main>

      {/* Modals */}
      <DashboardModals
        modal={state.modal}
        activePost={state.activePost}
        dispatch={dispatch}
        onCreate={handleCreate}
        onSave={handleSave}
        onDelete={handleDelete}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default Dashboard;
