import { useEffect, useState } from "react";
import blogPosts from "../data/blogPosts";
import BlogHero from "./BlogHero";
import BlogGrid from "./BlogGrid";
import { Bookmark } from "lucide-react";

function BlogLayout() {
  const heroPost = blogPosts.find((post) => post.featured);
  const otherPosts = blogPosts.filter((post) => !post.featured);

  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [showButton, setShowButton] = useState(false);

  // Load bookmarked posts on mount or toggle
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const bookmarked = otherPosts.filter((post) => saved.includes(post.id));
    setBookmarkedPosts(bookmarked);
  }, [showBookmarks]);

  // Detect scroll to show floating button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleBookmarksView = () => {
    setShowBookmarks((prev) => !prev);
  };

  const visiblePosts = showBookmarks ? bookmarkedPosts : otherPosts;

  return (
    <div className="relative">
      {/* Always show hero */}
      {heroPost && <BlogHero post={heroPost} />}

      {/* Conditional rendering for bookmarks view */}
      {showBookmarks && bookmarkedPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
          <Bookmark className="w-10 h-10 text-gray-400 mb-3" />
          <p className="text-lg font-medium">No bookmarks yet</p>
          <p className="text-sm text-gray-500 mt-1">
            Save posts by clicking the bookmark icon to view them here.
          </p>
        </div>
      ) : (
        <BlogGrid posts={visiblePosts} />
      )}

      {/* Floating toggle button — fades in after scroll */}
      <button
        onClick={toggleBookmarksView}
        className={`fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-md hover:bg-blue-700 transition-all flex items-center gap-2 duration-500 ${
          showButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <Bookmark className="w-4 h-4" />
        {showBookmarks ? "Back to All Posts" : "View Bookmarks"}
      </button>
    </div>
  );
}

export default BlogLayout;
