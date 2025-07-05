function ArticleSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-pulse">
      {/* Title placeholder */}
      <div className="h-10 bg-gray-700 rounded w-3/4 mb-4"></div>

      {/* Metadata */}
      <div className="h-4 bg-gray-600 rounded w-1/4 mb-6"></div>

      {/* Image placeholder */}
      <div className="h-64 bg-gray-800 rounded-lg mb-8"></div>

      {/* Paragraphs */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      </div>

      {/* Tags/bookmark area */}
      <div className="flex justify-between items-center mt-10">
        <div className="space-x-2">
          <span className="h-6 w-16 bg-gray-700 rounded-full inline-block"></span>
          <span className="h-6 w-20 bg-gray-700 rounded-full inline-block"></span>
        </div>
        <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
}

export default ArticleSkeleton;
