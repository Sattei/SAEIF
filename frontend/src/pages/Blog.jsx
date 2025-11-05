import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API || "";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/blog`);
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        setError("Failed to fetch blog posts.");
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Our Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              to={`/blog/${blog._id}`}
              key={blog._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1"
            >
              <img
                src={`${API}${blog.coverImage}`}
                alt={blog.title}
                className="w-full h-48 object-contain bg-gray-100"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-4">by {blog.author}</p>
                <p
                  className="text-gray-700 text-sm overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {blog.content.substring(0, 100)}...
                </p>
                <span className="text-primary font-medium mt-4 inline-block">
                  Read More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
