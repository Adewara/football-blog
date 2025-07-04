import { Bookmark } from "lucide-react";

function BlogHero({ post }) {
  return (
    <div
      className="relative h-screen lg:max-w-7xl lg: mx-auto bg-cover bg-center"
      style={{ backgroundImage: `url(${post.image})` }}
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
          {post.title}
        </h1>
        <Bookmark className="text-white w-6 h-6 self-end" />
      </div>
    </div>
  );
}

export default BlogHero;
