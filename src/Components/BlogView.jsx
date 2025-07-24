// components/BlogView.jsx

import Button from "./Buttton";

function BlogView({ post, onEdit, onDelete }) {
  if (!post) return <div className="p-4">Select a post to view</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>
      <div className="flex gap-4 mt-6">
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete} variant="danger">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default BlogView;
