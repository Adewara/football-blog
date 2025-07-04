import blogPosts from "../data/blogPosts";
import BlogHero from "./BlogHero";
import BlogGrid from "./BlogGrid";

function BlogLayout() {
  const heroPost = blogPosts.find((post) => post.featured);
  const otherPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div>
      {heroPost && <BlogHero post={heroPost} />}
      <BlogGrid posts={otherPosts} />
    </div>
  );
}

export default BlogLayout;
