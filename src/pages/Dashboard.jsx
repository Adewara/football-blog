import { useState } from "react";

import DashboardSidebar from "../Components/DashboardSidebar";
import BlogView from "../Components/BlogView";
import Modal from "../Components/Modal";

const mockPosts = [
  { id: "1", title: "First Post", content: "Lorem ipsum..." },
  { id: "2", title: "Another Post", content: "Dolor sit amet..." },
];

function Dashboard() {
  const [posts, setPosts] = useState(mockPosts);
  const [activePost, setActivePost] = useState(posts[0]);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setPosts((prev) => prev.filter((p) => p.id !== activePost.id));
    setActivePost(null);
    setShowModal(false);
  };

  return (
    <div className="flex h-screen">
      <DashboardSidebar
        posts={posts}
        activeId={activePost?.id}
        onSelect={setActivePost}
      />
      <main className="flex-1 overflow-auto">
        <BlogView
          post={activePost}
          onEdit={() => alert("Edit functionality coming soon")}
          onDelete={() => setShowModal(true)}
        />
      </main>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default Dashboard;
