// components/DashboardSidebar.jsx
function DashboardSidebar({ posts, activeId, onSelect }) {
  return (
    <aside className="w-64 p-4 bg-gray-100 border-r h-full">
      <h2 className="text-lg font-semibold mb-4">My Posts</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li
            key={post.id}
            onClick={() => onSelect(post)}
            className={`cursor-pointer px-3 py-2 rounded hover:bg-gray-200 ${
              post.id === activeId
                ? "bg-blue-100 text-blue-700 font-medium"
                : ""
            }`}
          >
            {post.title}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default DashboardSidebar;
