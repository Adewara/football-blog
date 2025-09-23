import { useState, useEffect } from "react";

function PostForm({ post = {}, mode = "create", onClose, onSave }) {
  const [title, setTitle] = useState(post.title || "");
  const [content, setContent] = useState(post.content || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(post.image || null);

  useEffect(() => {
    if (post.image) {
      setPreview(post.image);
    }
  }, [post]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      image: preview,
    };

    onSave(postData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">
        {mode === "edit" ? "Edit Post" : "Create New Post"}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 max-h-64 w-full object-cover rounded border"
          />
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {mode === "edit" ? "Save Changes" : "Create Post"}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
