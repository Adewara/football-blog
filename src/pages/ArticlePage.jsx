function ArticlePage({ post }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>

      {/* Metadata */}
      <div className="text-sm text-gray-500 mb-6">
        By {post.author} · {post.date}
      </div>

      {/* Image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg mb-8"
      />

      {/* Content */}
      <div className="prose prose-lg prose-invert max-w-none text-gray-200">
        {/* Assume post.content is HTML or Markdown rendered */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Tags or Bookmark */}
      <div className="mt-10 flex justify-between items-center">
        <div className="space-x-2">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-gray-700 text-white px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        {/* Add Bookmark here if needed */}
      </div>
    </div>
  );
}

export default ArticlePage;
