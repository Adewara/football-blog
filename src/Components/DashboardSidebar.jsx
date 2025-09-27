import { useState } from "react";
import { ChevronLeft, ChevronRight, Pen } from "lucide-react";

function DashboardSidebar({ posts, activeId, onSelect, onCreate }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-gray-100 p-4 border-r overflow-y-auto transition-all duration-300 flex flex-col`}
    >
      {/* Header with toggle button */}
      <div className="flex items-center justify-between mb-4">
        {!collapsed && (
          <h2 className="text-xl font-semibold whitespace-nowrap">My Posts</h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-200"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* New Post Button */}
      <button
        onClick={onCreate}
        className={`mb-6 flex items-center justify-center w-full px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition`}
      >
        {collapsed ? <Pen size={18} /> : "+ New Post"}
      </button>

      {/* Posts list (only when expanded) */}
      {!collapsed && (
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
      )}
    </aside>
  );
}

export default DashboardSidebar;
