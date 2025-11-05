import React, { useState, useEffect, useRef } from "react";
import {
  FaGraduationCap,
  FaUserTie,
  FaChalkboardTeacher,
  FaUsers,
  FaHandshake,
  FaUserFriends,
  FaIndustry,
} from "react-icons/fa";
import ThreeCModel from "../components/ThreeCModel";
import WhoWeWorkWith from "../components/WhoWeWorkWith";

const advisors = [
  {
    id: 1,
    name: "Arshita Arora",
    role: "Founder & CEO",
    image: "/demo-banner.jpg", // Placeholder - replace with actual advisor photo
    description:
      "Leading SAEIF's mission to empower individuals with professional skills.",
  },
  {
    id: 2,
    name: "Vivek Varma",
    role: "Strategic Advisor",
    image: "/demo-banner.jpg", // Placeholder - replace with actual advisor photo
    description:
      "Expert in community building and skill development strategies.",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Education Director",
    image: "/demo-banner.jpg", // Placeholder - replace with actual advisor photo
    description:
      "Specialist in curriculum development and industry partnerships.",
  },
];

const About = () => {
  const [currentAdvisor, setCurrentAdvisor] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const statsRef = useRef();
  const slideRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance advisor slideshow with pause on hover
  useEffect(() => {
    if (isHovered) return; // pause when hovered
    const interval = setInterval(() => {
      setCurrentAdvisor((prev) => (prev + 1) % advisors.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Animated stats
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;
    const stats = [1000, 500, 100];
    const durations = [1200, 1200, 1200];
    stats.forEach((stat, i) => {
      let start = 0;
      const end = stat;
      const increment = Math.ceil(end / (durations[i] / 16));
      const timer = setInterval(() => {
        start += increment;
        setCounts((prev) => {
          const updated = [...prev];
          updated[i] = start > end ? end : start;
          return updated;
        });
        if (start >= end) clearInterval(timer);
      }, 16);
    });
  }, [statsVisible]);

  return (
    <div className="bg-white font-poppins">
      {/* Hero Section */}
      <div className="relative w-full min-h-[80vh] flex items-center justify-center">
        <img
          src="/demo-banner.jpg"
          alt="About Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent w-1/2"
          style={{ right: "auto" }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4 py-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Our <span className="text-accent">Vision</span>
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 max-w-2xl font-medium">
            To empower 1,00,00,000 individuals with Professional Skills
          </p>
          {/* Animated Stats */}
          <div
            ref={statsRef}
            className="flex flex-col md:flex-row gap-8 justify-center items-center mt-8"
          >
            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">
                {counts[0]}+
              </span>
              <span className="text-base md:text-lg text-white/80 font-medium">
                Students Trained
              </span>
            </div>
            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">
                {counts[1]}+
              </span>
              <span className="text-base md:text-lg text-white/80 font-medium">
                Placed
              </span>
            </div>
            <div className="flex flex-col items-center min-w-[120px]">
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">
                {counts[2]}+
              </span>
              <span className="text-base md:text-lg text-white/80 font-medium">
                Corporate Partners
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Why SAEIF Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            Why <span className="text-accent">SAEIF</span>?
          </h2>
          <div className="text-gray-700 text-lg leading-relaxed space-y-6">
            <p>
              Skill Aid Empower India Foundation addresses the widening
              industry-academia gap that fuels the crisis of educated yet
              unemployable youth in India. The country's rigid, theoretical
              education system remains largely misaligned with the evolving
              needs of industry. Subject myopia, minimal practical exposure, and
              lack of career guidance leave young people underprepared, with
              passions unexplored and talents underutilized.
            </p>
            <p>
              According to Mercer-Mettl's India Graduate Skill Index 2025, only
              42.6% of Indian graduates are employable, down from 44.3% in
              2023—a worrying trend. The gap extends beyond technical skills
              like AI and data analytics—our education system rarely nurtures
              essential human capabilities like creativity, problem-solving, and
              decision-making, leaving graduates unprepared for dynamic,
              real-world challenges. This growing mismatch is causing
              frustration among both employers, who struggle to find job ready
              talent, and young employees, who feel ill-equipped and disengaged
              in their roles.
            </p>
          </div>
        </div>
      </section>

      {/* 3C Model Section */}
      <ThreeCModel />

      {/* Who We Work With Section */}
      <WhoWeWorkWith />

      {/* What Sets Us Apart Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
            What Sets <span className="text-accent">US</span> Apart?
          </h2>
          <p className="text-gray-700 text-lg text-center mb-12 max-w-3xl mx-auto">
            Our unique approach focuses on community-first, self-exploratory,
            and confidence-building methods, integrating communication
            development, real-world exposure, and mentorship.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-primary text-white rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                A safe space for self-exploration
              </h3>
              <p className="text-white/90">
                Create an environment where individuals feel comfortable
                exploring their potential.
              </p>
            </div>
            <div className="bg-primary text-white rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <FaUserFriends className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                A vibrant community model
              </h3>
              <p className="text-white/90">
                Build strong networks and support systems for continuous
                learning and growth.
              </p>
            </div>
            <div className="bg-primary text-white rounded-lg p-6 shadow-lg">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <FaIndustry className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Immersive industry engagement
              </h3>
              <p className="text-white/90">
                Direct exposure to real-world challenges and industry best
                practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Advisors Section */}
      <section className="py-16 bg-white relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            Our <span className="text-accent">Advisors</span>
          </h2>

          <div
            ref={slideRef}
            className="flex flex-col items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Slideshow */}
            <div className="relative w-64 h-64 mb-10">
              {advisors.map((advisor, index) => (
                <div
                  key={advisor.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentAdvisor
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                >
                  <div className="text-center">
                    <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4 shadow-lg">
                      <img
                        src={advisor.image}
                        alt={advisor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-1">
                      {advisor.name}
                    </h3>
                    <p className="text-accent font-medium mb-2">
                      {advisor.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {advisor.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {advisors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAdvisor(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentAdvisor ? "bg-accent" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
