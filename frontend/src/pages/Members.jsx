import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaCrown, FaClock, FaSignOutAlt, FaUser } from "react-icons/fa";

const API = process.env.REACT_APP_API || "";

const Members = () => {
  const [videos, setVideos] = useState([]);
  const [membershipInfo, setMembershipInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkAuthAndLoadData = useCallback(async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    try {
      // Get membership info
      const membershipRes = await fetch(
        `${API}/api/membership/user/${userId}`,
        {
          headers: { "x-auth-token": token },
        }
      );

      if (!membershipRes.ok) {
        throw new Error("Failed to fetch membership info");
      }

      const membershipData = await membershipRes.json();
      setMembershipInfo(membershipData);

      if (!membershipData.isActive) {
        navigate("/login");
        return;
      }

      // Get videos based on membership level
      const videosRes = await fetch(`${API}/api/youtube`, {
        headers: { "x-auth-token": token },
      });

      if (!videosRes.ok) {
        throw new Error("Failed to fetch videos");
      }

      const videosData = await videosRes.json();
      setVideos(videosData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuthAndLoadData();
  }, [checkAuthAndLoadData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const getMembershipBadge = () => {
    if (!membershipInfo) return null;

    const planNames = {
      "6-month": "6-Month Member",
      "1-year": "1-Year Member",
      lifetime: "Lifetime Member",
    };

    const badgeColors = {
      "6-month": "bg-blue-100 text-blue-800",
      "1-year": "bg-purple-100 text-purple-800",
      lifetime: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          badgeColors[membershipInfo.plan]
        }`}
      >
        {membershipInfo.plan === "lifetime" && (
          <FaCrown className="inline mr-1" />
        )}
        {planNames[membershipInfo.plan]}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getVideoEmbedUrl = (youtubeUrl) => {
    const videoId = youtubeUrl.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i
    );
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : youtubeUrl;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="SAEIF" className="h-8 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Member Dashboard
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  {getMembershipBadge()}
                  {membershipInfo?.expiry &&
                    membershipInfo.plan !== "lifetime" && (
                      <span className="text-sm text-gray-500 flex items-center">
                        <FaClock className="mr-1" />
                        Expires: {formatDate(membershipInfo.expiry)}
                      </span>
                    )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back!</p>
                <p className="font-medium text-gray-800">Member</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-darkblue rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <FaUser className="text-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">
                Welcome to Your Learning Hub
              </h2>
              <p className="text-white/80 mt-2">
                Access exclusive content tailored to your {membershipInfo?.plan}{" "}
                membership
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Your Plan</h3>
              <p className="text-white/80">{membershipInfo?.plan}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Status</h3>
              <p className="text-green-300">Active</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Videos Available</h3>
              <p className="text-white/80">{videos.length} videos</p>
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Exclusive Video Content
          </h3>

          {videos.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPlay className="text-3xl text-gray-400" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                No Videos Available
              </h4>
              <p className="text-gray-600">
                Check back soon for new exclusive content!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative">
                    <iframe
                      src={getVideoEmbedUrl(video.url)}
                      title={video.title}
                      className="w-full h-48"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="p-6">
                    <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {video.title}
                    </h4>
                    {video.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {video.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Added: {formatDate(video.uploadedAt)}</span>
                      <span className="flex items-center">
                        <FaPlay className="mr-1" />
                        Watch Now
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Membership Benefits */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Your Membership Benefits
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaPlay className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Exclusive Videos
                </h4>
                <p className="text-gray-600 text-sm">
                  Access to premium video content and tutorials
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaCrown className="text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Premium Content
                </h4>
                <p className="text-gray-600 text-sm">
                  Advanced courses and specialized training materials
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaUser className="text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Community Access
                </h4>
                <p className="text-gray-600 text-sm">
                  Connect with fellow members and mentors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
