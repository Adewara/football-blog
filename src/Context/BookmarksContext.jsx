import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "bookmarks:v1";
const BookmarksContext = createContext(null);

export function BookmarksProvider({ children }) {
  const [bookmarksSet, setBookmarksSet] = useState(new Set());

  // load on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        setBookmarksSet(new Set(arr));
      }
    } catch (e) {
      console.warn("Failed to load bookmarks from localStorage", e);
    }
  }, []);

  // persist when changed
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(Array.from(bookmarksSet))
      );
    } catch (e) {
      console.warn("Failed to save bookmarks to localStorage", e);
    }
  }, [bookmarksSet]);

  const toggleBookmark = (id) =>
    setBookmarksSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const isBookmarked = (id) => bookmarksSet.has(id);
  const getAll = () => Array.from(bookmarksSet);

  return (
    <BookmarksContext.Provider
      value={{ bookmarksSet, toggleBookmark, isBookmarked, getAll }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export const useBookmarks = () => {
  const ctx = useContext(BookmarksContext);
  if (!ctx)
    throw new Error("useBookmarks must be used inside BookmarksProvider");
  return ctx;
};
