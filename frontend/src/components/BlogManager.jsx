import React, { useState, useEffect } from "react";

const API = process.env.REACT_APP_API || "";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [editingId, setEditingId] = useState(null); // null = new post, ID = editing
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/blog`);
      const data = await res.json();
      setBlogs(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch blogs");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 2. Clear the form
  const clearForm = () => {
    setTitle("");
    setContent("");
    setAuthor("");
    setCoverImage(null);
    setEditingId(null);
    document.getElementById("coverImage").value = null; // Clear file input
  };

  // 3. Handle Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    // We must use FormData because we are uploading a file
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    const isEditing = editingId !== null;
    const url = isEditing ? `${API}/api/blog/${editingId}` : `${API}/api/blog`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // No 'Content-Type', browser sets it for FormData
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Operation failed");
      }

      clearForm();
      fetchBlogs(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // 4. Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete post");

      fetchBlogs(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // 5. Handle setting the form for editing
  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author);
    setEditingId(blog._id);
    window.scrollTo(0, 0); // Scroll to top to see the form
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Blog Management</h2>
      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>
      )}

      {/* --- Create/Edit Form --- */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8 space-y-4"
      >
        <h3 className="text-xl font-medium">
          {editingId ? "Edit Post" : "Create New Post"}
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cover Image {editingId ? "(Optional: only to replace)" : ""}
          </label>
          <input
            type="file"
            id="coverImage"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept="image/*"
            required={!editingId} // Image is required for new posts
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : editingId ? "Update Post" : "Create Post"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={clearForm}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* --- Blog Post List --- */}
      <h3 className="text-xl font-medium mb-4">All Posts</h3>
      <div className="space-y-4">
        {loading && blogs.length === 0 ? (
          <p>Loading posts...</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <div>
                <h4 className="font-semibold">{blog.title}</h4>
                <p className="text-sm text-gray-600">by {blog.author}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="px-3 py-1 text-sm bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogManager;
