// components/Modal.jsx
import { useEffect } from "react";

function Modal({
  isOpen,
  onClose,
  onConfirm,
  children,
  loading = false,
  error = null,
}) {
  // ✅ Always call useEffect
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isCustom = !!children;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose} // backdrop closes
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`relative bg-white rounded shadow-lg w-full max-h-[90vh] overflow-auto p-6`}
        style={{ maxWidth: "80vw" }}
        onClick={(e) => e.stopPropagation()} // prevent backdrop close
      >
        {/* Close button */}
        <button
          aria-label="Close modal"
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded hover:bg-gray-100"
        >
          <svg
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 8.586L15.95 2.636a1 1 0 111.414 1.414L11.414 10l5.95 5.95a1 1 0 11-1.414 1.414L10 11.414l-5.95 5.95a1 1 0 11-1.414-1.414L8.586 10 2.636 4.05A1 1 0 114.05 2.636L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isCustom ? (
          <>
            {children}
            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
          </>
        ) : (
          <>
            <p className="mb-4 text-gray-800">
              Are you sure you want to delete this blog post?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-60"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
          </>
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-gray-700" />
              <span className="text-gray-700">Please wait...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
