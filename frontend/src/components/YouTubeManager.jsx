import React, { useState, useEffect } from "react";

// Hardcode the API path just like we did for the blog
const API = process.env.REACT_APP_API || "";

const YouTubeManager = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Fetch all videos
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/youtube`);
      const data = await res.json();
      setVideos(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch videos");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // 2. Clear the form
  const clearForm = () => {
    setTitle("");
    setUrl("");
    setDescription("");
    setEditingId(null);
  };

  // 3. Handle Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    // This is simple JSON, no FormData needed
    const body = JSON.stringify({ title, url, description });

    const isEditing = editingId !== null;
    const apiUrl = isEditing
      ? `${API}/api/youtube/${editingId}`
      : `${API}/api/youtube`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(apiUrl, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // We send JSON
        },
        body: body,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Operation failed");
      }

      clearForm();
      fetchVideos(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // 4. Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/youtube/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete video");

      fetchVideos(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // 5. Handle setting the form for editing
  const handleEdit = (video) => {
    setTitle(video.title);
    setUrl(video.url);
    setDescription(video.description);
    setEditingId(video._id);
    window.scrollTo(0, 0); // Scroll to top
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">YouTube Video Management</h2>
      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>
      )}

      {/* --- Create/Edit Form --- */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8 space-y-4"
      >
        <h3 className="text-xl font-medium">
          {editingId ? "Edit Video" : "Add New Video"}
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
            YouTube URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., https://www.youtube.com/watch?v=XXXXXXXXXXX"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : editingId ? "Update Video" : "Add Video"}
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

      {/* --- Video List --- */}
      <h3 className="text-xl font-medium mb-4">All Videos</h3>
      <div className="space-y-4">
        {loading && videos.length === 0 ? (
          <p>Loading videos...</p>
        ) : (
          videos.map((video) => (
            <div
              key={video._id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <div>
                <h4 className="font-semibold">{video.title}</h4>
                <p className="text-sm text-gray-600 truncate max-w-md">
                  {video.description}
                </p>
              </div>
              <div className="flex space-x-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(video)}
                  className="px-3 py-1 text-sm bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(video._id)}
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

export default YouTubeManager;
