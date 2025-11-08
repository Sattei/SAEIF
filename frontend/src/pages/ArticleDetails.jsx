import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API = process.env.REACT_APP_API || "";

const ArticleDetails = () => {
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // ✅ FIX: scroll to top whenever user navigates to a new article
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/blog/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post.");
        const data = await res.json();
        setPost(data);

        // Fetch other articles for explore section
        const relatedRes = await fetch(`${API}/api/blog`);
        const relatedData = await relatedRes.json();
        const filtered = relatedData.filter((b) => b._id !== id).slice(0, 3);
        setRelated(filtered);
      } catch (err) {
        setError("Failed to fetch post.");
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]); // ✅ triggers scroll + fetch whenever ID changes

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Post not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-16 font-poppins">
      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          {post.title}
        </h1>

        {/* Author */}
        <p className="text-center text-gray-500 italic mb-10">
          By {post.author || "Anonymous"}
        </p>

        {/* Image */}
        <div className="overflow-hidden rounded-3xl shadow-md mb-12">
          <img
            src={`${API}${post.coverImage}`}
            alt={post.title}
            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 leading-relaxed text-gray-700 text-lg tracking-wide">
          <p style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>
        </div>
      </div>

      {/* Explore More Section */}
      <div className="container mx-auto px-4 max-w-6xl mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
          Explore <span className="text-orange-500">More Articles</span>
        </h2>

        {related.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {related.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={`${API}${blog.coverImage}`}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p
                    className="text-gray-600 text-sm line-clamp-3"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {blog.content.length > 100
                      ? `${blog.content.substring(0, 100)}...`
                      : blog.content}
                  </p>
                  <span className="inline-block mt-4 text-orange-500 font-medium text-sm hover:underline">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No related articles found.
          </p>
        )}
      </div>

      {/* Subscribe / CTA Section */}
      <div className="mt-20 bg-gradient-to-r from-blue-600 to-orange-500 py-16 rounded-3xl text-center text-white mx-4 md:mx-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay <span className="text-yellow-300">Inspired</span>
        </h2>
        <p className="max-w-xl mx-auto text-gray-100 mb-8">
          Get the latest stories and updates delivered straight to your inbox.
        </p>
        <form className="flex justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-l-lg w-2/3 focus:outline-none text-gray-700"
          />
          <button
            type="submit"
            className="bg-white text-orange-600 font-semibold px-5 rounded-r-lg hover:bg-gray-100 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArticleDetails;
