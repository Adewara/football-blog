import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";

function BookmarkButton({ postId, className = "", iconClassName = "" }) {
  const [bookmarked, setBookmarked] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarked(saved.includes(postId));
  }, [postId]);

  // Toggle bookmark state + persist to localStorage
  const toggleBookmark = (e) => {
    e.preventDefault(); // stops <Link> navigation when clicking icon
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];

    let updated;
    if (bookmarked) {
      updated = saved.filter((id) => id !== postId);
    } else {
      updated = [...saved, postId];
    }

    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setBookmarked(!bookmarked);
  };

  return (
    <button onClick={toggleBookmark} className={`p-1 transition ${className}`}>
      <Bookmark
        className={`transition-transform duration-200 ${
          bookmarked ? "text-blue-600 fill-blue-600 scale-110" : "text-gray-600"
        } ${iconClassName}`}
      />
    </button>
  );
}

export default BookmarkButton;
