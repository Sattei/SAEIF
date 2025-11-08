import React, { useState, useEffect } from "react";

const API = process.env.REACT_APP_API || "";

// Extract YouTube video ID from URL
const getYouTubeId = (url) => {
  try {
    const videoUrl = new URL(url);
    return videoUrl.searchParams.get("v") || videoUrl.pathname.split("/").pop();
  } catch (error) {
    console.error("Invalid YouTube URL:", url);
    return null;
  }
};

// Video Modal
const VideoModal = ({ video, onClose }) => {
  const videoId = getYouTubeId(video.url);
  if (!videoId) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl relative w-full max-w-3xl mx-auto max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-2 right-2 bg-white border border-gray-300 rounded-full w-9 h-9 flex items-center justify-center text-2xl font-bold text-gray-700 hover:text-black shadow-md z-50"
        >
          &times;
        </button>

        {/* Embedded Video */}
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

        {/* Title and Description */}
        <div className="mt-6 px-6 pb-8">
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

// Main Media Page
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
    <div className="bg-gray-50">
      {/* ---------- Hero Section ---------- */}
      <section
        className="relative h-[65vh] flex flex-col items-center justify-center text-white bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/media-hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Media</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Explore our journey through powerful visuals that capture the
            impact, growth, and success stories of individuals empowered by
            SaEIF initiatives.
          </p>

          <div className="mt-10 flex justify-center gap-8 text-lg font-medium">
            <div>
              <span className="text-3xl font-bold">5+</span> <br /> Events
            </div>
            <div>
              <span className="text-3xl font-bold">50+</span> <br /> Videos
            </div>
            <div>
              <span className="text-3xl font-bold">1000+</span> <br /> Lives
              Impacted
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Featured Stories ---------- */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-4">
          Featured <span className="text-blue-600">Stories</span>
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Handpicked moments that showcase our most impactful programs and
          inspiring success stories.
        </p>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {videos.map((video) => {
            const videoId = getYouTubeId(video.url);
            if (!videoId) return null;
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return (
              <div
                key={video._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative">
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white opacity-90"
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- Modal ---------- */}
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
