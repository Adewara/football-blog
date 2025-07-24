// components/DashboardSidebar.jsx

function DashboardSidebar({ posts, activeId, onSelect, onCreate }) {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">My Posts</h2>

      {/* New Post Button */}
      <button
        onClick={onCreate}
        className="mb-6 w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        + New Post
      </button>

      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id}>
            <button
              onClick={() => onSelect(post)}
              className={`block w-full text-left px-3 py-2 rounded ${
                post.id === activeId
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {post.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default DashboardSidebar;
