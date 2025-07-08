import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

function BlogCard({ post }) {
  return (
    <div className="relative bg-white shadow-sm rounded-sm overflow-hidden w-full max-w-xs cursor-pointer transform transition duration-200 hover:scale-101 hover:shadow-lg">
      <Link to={`/article/${post.id}`} className="block h-full">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-200 hover:scale-101"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <Bookmark className="absolute bottom-3 right-3 w-5 h-5 text-gray-600" />
        </div>
      </Link>
    </div>
  );
}

export default BlogCard;
