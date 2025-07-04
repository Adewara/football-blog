import { Bookmark } from "lucide-react"; // or any icon lib

function BlogPost({ image, title, full = false }) {
  return (
    <div
      className={`relative rounded-lg overflow-hidden shadow-md ${
        full ? "h-screen w-full" : "w-full sm:w-1/2 lg:w-1/4"
      }`}
    >
      <img src={image} alt={title} className="w-full h-2/3 object-cover" />
      <div className="p-4 h-1/3 flex flex-col justify-between bg-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex justify-end">
          <Bookmark className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
