import { useEffect, useReducer } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../Components/DashboardSidebar";
import BlogView from "../Components/BlogView";
import Modal from "../Components/Modal";
import PostForm from "../Components/PostForm";
import { dashboardReducer, initialState } from "../reducers/dashboardReducer";

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Prevent accidental leaving without logout
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Confirm logout
  const confirmLogout = async () => {
    await logout();
    dispatch({ type: "CLOSE_MODAL" });
    navigate("/auth");
  };

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

        {state.activePost ? (
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
      {state.modal === "delete" && (
        <Modal
          isOpen
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          onConfirm={() => dispatch({ type: "DELETE_POST" })}
        />
      )}

      {state.modal === "edit" && (
        <Modal isOpen onClose={() => dispatch({ type: "CLOSE_MODAL" })}>
          <PostForm
            mode="edit"
            post={state.activePost}
            onClose={() => dispatch({ type: "CLOSE_MODAL" })}
            onSave={(updatedPost) =>
              dispatch({ type: "SAVE_POST", payload: updatedPost })
            }
          />
        </Modal>
      )}

      {state.modal === "create" && (
        <Modal isOpen onClose={() => dispatch({ type: "CLOSE_MODAL" })}>
          <PostForm
            mode="create"
            onClose={() => dispatch({ type: "CLOSE_MODAL" })}
            onSave={(newPost) =>
              dispatch({ type: "CREATE_POST", payload: newPost })
            }
          />
        </Modal>
      )}

      {state.modal === "logout" && (
        <Modal
          isOpen
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          onConfirm={confirmLogout}
        >
          <p className="mb-4 text-gray-800">
            Are you sure you want to log out?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => dispatch({ type: "CLOSE_MODAL" })}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;
