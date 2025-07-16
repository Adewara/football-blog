import { useState } from "react";

function DashboardPage() {
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Euro 2024: Surprising Results",
    },
    {
      id: "2",
      title: "Who Will Win Ballon d'Or?",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    const newPost = {
      id: Date.now().toString(),
      title: newTitle,
    };
    setPosts([newPost, ...posts]);
    setNewTitle("");
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>

      {/* Create New */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Post title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Create
        </button>
      </div>

      {/* Post List */}
      <ul className="space-y-3">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex justify-between items-center bg-gray-800 text-white p-4 rounded"
          >
            <span>{post.title}</span>
            <button
              onClick={() => handleDelete(post.id)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage;
