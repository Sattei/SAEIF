import React, { useState, useEffect, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const API = process.env.REACT_APP_API || "";

function getCroppedBlob(image, crop) {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = Math.floor(crop.width * scaleX);
  canvas.height = Math.floor(crop.height * scaleY);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      0.9
    );
  });
}

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [imgSrc, setImgSrc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  // Fetch blogs and extract tags
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/blog`);
      const data = await res.json();
      setBlogs(data);

      // Build tag suggestions from existing blogs
      const tagSet = new Set();
      data.forEach((b) => (b.tags || []).forEach((t) => tagSet.add(t)));
      setAllTags(Array.from(tagSet).sort((a, b) => a.localeCompare(b)));

      setLoading(false);
    } catch (err) {
      setError("Failed to fetch blogs");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const clearForm = () => {
    setTitle("");
    setContent("");
    setAuthor("");
    setTags([]);
    setTagInput("");
    setEditingId(null);
    const fileInput = document.getElementById("coverImage");
    if (fileInput) fileInput.value = null;
    setImageFile(null);
    setImgSrc("");
    setCrop(undefined);
    setCompletedCrop(null);
    setError("");
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(file);
    }
  };

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    const aspect = 16 / 9;
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: "px", width: width * 0.9 }, aspect, width, height),
      width,
      height
    );
    setCrop(initialCrop);
    setCompletedCrop(initialCrop);
  }

  // Submit new or edited blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);

    // ✅ Add tags to form data
    tags.forEach((tag) => formData.append("tags[]", tag));

    const isEditing = editingId !== null;

    // ✅ Handle image cropping
    if (!isEditing || (isEditing && imgSrc)) {
      if (!completedCrop || !imgRef.current) {
        setError("Please select and crop an image.");
        setLoading(false);
        return;
      }

      try {
        const croppedImageBlob = await getCroppedBlob(
          imgRef.current,
          completedCrop
        );
        formData.append(
          "coverImage",
          croppedImageBlob,
          imageFile?.name || "cover.jpg"
        );
      } catch (e) {
        setError("Failed to crop image. Please try again.");
        setLoading(false);
        return;
      }
    }

    const url = isEditing ? `${API}/api/blog/${editingId}` : `${API}/api/blog`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Operation failed");
      }

      clearForm();
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setLoading(true);
    const token = sessionStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/blog/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete post");
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author);
    setTags(Array.isArray(blog.tags) ? blog.tags : []); // ✅ load existing tags
    setEditingId(blog._id);
    setImgSrc("");
    setImageFile(null);
    setCrop(undefined);
    setCompletedCrop(null);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Blog Management</h2>
      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>
      )}

      {/* Form */}
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

        {/* ✅ Tags Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const newTag = tagInput.trim();
                if (!newTag) return;

                if (tags.length >= 10) {
                  setError("You can add up to 10 tags only.");
                  return;
                }

                const alreadyExists = tags.some(
                  (t) => t.toLowerCase() === newTag.toLowerCase()
                );
                if (!alreadyExists) {
                  setTags([...tags, newTag]);
                }
                setTagInput("");
              }
            }}
            list="tagSuggestions"
            placeholder="Type tag and press Enter (max 10)"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <datalist id="tagSuggestions">
            {allTags.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
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
            onChange={onFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept="image/*"
            required={!editingId}
          />
        </div>

        {imgSrc && (
          <div className="mt-4 p-4 bg-gray-200 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Crop your image (16:9 Aspect Ratio):
            </p>
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={16 / 9}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Crop preview"
                onLoad={onImageLoad}
                style={{ maxHeight: "400px" }}
              />
            </ReactCrop>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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

      {/* Blog List */}
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
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
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
