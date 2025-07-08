import blogPosts from "../data/blogPosts";
import BlogHero from "../Components/BlogHero";
import BlogGrid from "../Components/BlogGrid";

function BlogHome() {
  const heroPost = blogPosts.find((post) => post.featured);
  const otherPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div>
      {heroPost && <BlogHero post={heroPost} />}
      <BlogGrid posts={otherPosts} />
    </div>
  );
}

export default BlogHome;
