import { Link } from "react-router-dom";
import BookmarkButton from "./BookmarkButton";

function BlogHero({ post }) {
  return (
    <div
      className="relative h-screen lg:max-w-7xl mx-auto bg-cover bg-center"
      style={{ backgroundImage: `url(${post.image})` }}
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8">
        <Link to={`/article/${post.id}`}>
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 hover:underline">
            {post.title}
          </h1>
        </Link>

        {/* Big transparent bookmark */}
        {/* <div className="self-end">
          <BookmarkButton
            postId={post.id}
            className="bg-transparent hover:bg-transparent self-end"
            iconClassName="text-white w-6 h-6 md:w-12 md:h-12 lg:w-16 lg:h-16"
          />
        </div> */}
      </div>
    </div>
  );
}

export default BlogHero;
