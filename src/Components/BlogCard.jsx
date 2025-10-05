import { Link } from "react-router-dom";
import BookmarkButton from "./BookmarkButton";

function BlogCard({ post }) {
  return (
    <div className="relative bg-white shadow-sm rounded-sm overflow-hidden w-full max-w-xs cursor-pointer transform transition duration-200 hover:scale-101 hover:shadow-lg">
      <Link to={`/article/${post.id}`} className="block h-full">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover transition-transform duration-200 hover:scale-101"
          />
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold">{post.title}</h3>
        </div>
      </Link>
      {/* Bookmark button sits on top, outside Link */}
      <BookmarkButton
        postId={post.id}
        className="absolute bottom-3 right-3 bg-white/80 rounded-full hover:bg-white"
        iconClassName="w-5 h-5"
      />
    </div>
  );
}

export default BlogCard;
