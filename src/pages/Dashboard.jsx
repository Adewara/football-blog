import { useState } from "react";
import DashboardSidebar from "../Components/DashboardSidebar";
import BlogView from "../Components/BlogView";
import Modal from "../Components/Modal";
import PostForm from "../Components/PostForm";

// Sample blog posts
const mockPosts = [
  { id: "1", title: "First Post", content: "Lorem ipsum...", image: "" },
  { id: "2", title: "Another Post", content: "Dolor sit amet...", image: "" },
];

function Dashboard() {
  const [posts, setPosts] = useState(mockPosts);
  const [activePost, setActivePost] = useState(posts[0]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Delete post
  const handleDelete = () => {
    setPosts((prev) => prev.filter((p) => p.id !== activePost.id));
    setActivePost(null);
    setShowDeleteModal(false);
  };

  // Save after edit
  const handleSavePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
    setActivePost(updatedPost);
    setShowEditModal(false);
  };

  // Save new post
  const handleCreatePost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    setActivePost(newPost);
    setShowCreateModal(false);
  };

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <DashboardSidebar
        posts={posts}
        activeId={activePost?.id}
        onSelect={setActivePost}
        onCreate={() => setShowCreateModal(true)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 relative">
        {activePost ? (
          <BlogView
            post={activePost}
            onEdit={() => setShowEditModal(true)}
            onDelete={() => setShowDeleteModal(true)}
          />
        ) : (
          <p className="text-center text-gray-500 mt-20">
            Select a post to view
          </p>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
          <PostForm
            mode="edit"
            post={activePost}
            onClose={() => setShowEditModal(false)}
            onSave={handleSavePost}
          />
        </Modal>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        >
          <PostForm
            mode="create"
            onClose={() => setShowCreateModal(false)}
            onSave={handleCreatePost}
          />
        </Modal>
      )}
    </div>
  );
}

export default Dashboard;
