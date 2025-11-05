import React, { useState, useEffect } from "react";

const API = "http://localhost:5050";

const getYouTubeId = (url) => {
  try {
    const videoUrl = new URL(url);
    return videoUrl.searchParams.get("v") || videoUrl.pathname.split("/").pop();
  } catch (error) {
    console.error("Invalid YouTube URL:", url);
    return null;
  }
};

const VideoModal = ({ video, onClose }) => {
  const videoId = getYouTubeId(video.url);
  if (!videoId) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-2xl shadow-2xl relative w-full max-w-3xl mx-auto max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-2 float-right bg-white border border-gray-300 rounded-full w-9 h-9 flex items-center justify-center text-2xl font-bold text-gray-700 hover:text-black shadow-md z-50"
        >
          &times;
        </button>

        {/* Video Embed (16:9 ratio) */}
        <div className="relative w-full mt-2" style={{ paddingTop: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          ></iframe>
        </div>

        {/* Title + Description */}
        <div className="mt-6 px-2 md:px-4 pb-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            {video.title}
          </h3>
          <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
            {video.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Media = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/youtube`);
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        setError("Failed to fetch videos.");
      }
      setLoading(false);
    };

    fetchVideos();
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
        <h1 className="text-4xl font-bold text-center mb-12">Media</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => {
            const videoId = getYouTubeId(video.url);
            if (!videoId) return null;

            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return (
              <div
                key={video._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:-translate-y-1"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative">
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                    <svg
                      className="w-16 h-16 text-white opacity-80"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 truncate">
                    {video.title}
                  </h2>
                  <p
                    className="text-gray-700 text-sm overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {video.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default Media;
