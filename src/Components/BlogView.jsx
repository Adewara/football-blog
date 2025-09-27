import Button from "./Buttton";

function BlogView({ post, onEdit, onDelete }) {
  if (!post) return <div className="p-4">Select a post to view</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>

      {post.image ? (
        <img
          src={post.image}
          alt={post.title}
          className="w-full max-h-[400px] object-cover rounded-md"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
          <span className="text-gray-500">No image available</span>
        </div>
      )}

      <p className="text-gray-700 whitespace-pre-line">{post.content}</p>

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
