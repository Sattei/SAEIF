import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API || "";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/blog`);
        if (!res.ok) throw new Error("Failed to fetch blog posts from server.");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message || "Failed to fetch blog posts.");
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

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

  // ✅ Dynamically extract unique tags
  const uniqueTags = [...new Set(blogs.flatMap((b) => b.tags || []))];
  const filteredBlogs =
    selectedTag === "All"
      ? blogs
      : blogs.filter((b) => b.tags && b.tags.includes(selectedTag));

  return (
    <div className="min-h-screen bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Latest <span className="text-orange-600">Insights</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, success stories, and expert
            advice from our partners.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
          <span className="text-gray-700 font-medium mr-4">Filter by</span>
          <button
            onClick={() => setSelectedTag("All")}
            className={`px-5 py-2 rounded-full text-sm font-medium ${
              selectedTag === "All"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-5 py-2 rounded-full text-sm font-medium ${
                selectedTag === tag
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <Link
              to={`/blog/${blog._id}`}
              key={blog._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 border border-gray-200 flex flex-col"
            >
              <div className="p-5 flex flex-col h-full">
                <img
                  src={`${API}${blog.coverImage}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {blog.title}
                </h2>
                <p
                  className="text-gray-600 text-sm mb-4 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {blog.content}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <p className="text-gray-800 text-sm font-medium">
                    {blog.author}
                  </p>
                  <span className="text-orange-600 font-semibold text-sm hover:underline">
                    Read More
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
