import { useNavigate, useParams } from "react-router-dom";
import blogPosts from "../data/blogPosts";
import Button from "../Components/Buttton";
import NotFound from "./NotFound";

function ArticlePage() {
  const params = useParams();
  const article = blogPosts.find((p) => p.id === params.articleId);

  const navigate = useNavigate();

  if (article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{article.title}</h1>

        {/* Metadata */}
        <div className="text-sm text-gray-500 mb-6">
          By {article.author} · {article.date}
        </div>

        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none text-grey-900">
          {/* Assume post.content is HTML or Markdown rendered */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Tags or Bookmark */}
        <div className="mt-10 flex justify-between items-center">
          <div className="space-x-2">
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-gray-700 text-white px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          {/* Add Bookmark here if needed */}
          <div>
            <Button onClick={() => navigate(-1)} variant="back">
              Go back
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
}

export default ArticlePage;
