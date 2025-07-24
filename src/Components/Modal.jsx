function Modal({ isOpen, onClose, onConfirm, children }) {
  if (!isOpen) return null;

  // Determine if it's a custom content modal (like PostForm)
  const isCustom = !!children;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div
        className={`bg-white p-6 rounded shadow-lg w-full ${
          isCustom ? "max-w-5xl" : "max-w-sm"
        }`}
      >
        {isCustom ? (
          children
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
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
