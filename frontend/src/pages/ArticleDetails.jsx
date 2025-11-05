import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API = process.env.REACT_APP_API || "";

const ArticleDetails = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/blog/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError("Failed to fetch post.");
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

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
    <div className="min-h-screen bg-white py-12 font-poppins">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl lg:text-5xl font-bold text-center text-primary mb-4">
          {post.title}
        </h1>
        <p className="text-center text-gray-600 text-lg mb-8">
          by {post.author}
        </p>

        <img
          src={`${API}${post.coverImage}`}
          alt={post.title}
          className="w-full h-96 object-contain bg-gray-100 rounded-lg shadow-lg mb-12"
        />

        <div className="max-w-none">
          <p
            className="text-lg text-gray-700 leading-relaxed"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {post.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
