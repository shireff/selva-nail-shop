import React from "react";
import { Link } from "react-router-dom";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  publishedAt: string;
  featuredImage?: string;
  views: number;
  likes: number;
};

const BlogList = () => {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://selva-server.vercel.app/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link
          to="/admin/blogs/new"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + New Post
        </Link>
      </div>
      <div className="grid gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded shadow p-4 flex flex-col md:flex-row gap-4"
          >
            {post.featuredImage && (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-32 h-32 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.excerpt}</p>
              <div className="text-sm text-gray-500 mt-2">
                By {post.author} | {post.category} |{" "}
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
              <div className="mt-2 flex gap-4 text-xs text-gray-400">
                <span>Views: {post.views}</span>
                <span>Likes: {post.likes}</span>
              </div>
              <Link
                to={`/admin/blogs/${post.id}/edit`}
                className="inline-block mt-2 text-purple-700 underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
