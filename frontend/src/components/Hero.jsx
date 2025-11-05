import React, { useEffect, useRef, useState } from "react";
import { FaHeart, FaArrowRight } from "react-icons/fa";

const typingWords = ["Skill", "Leaders", "Innovators", "Change-makers"];
const stats = [
  { value: 500, label: "Lives Impacted", suffix: "+" },
  { value: 50, label: "Programs", suffix: "+" },
  { value: 25, label: "Members", suffix: "+" },
];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const statsRef = useRef();
  const intervalRef = useRef();

  // Typing animation
  useEffect(() => {
    let charIndex = 0;
    setDisplayed("");
    setTyping(true);
    intervalRef.current = setInterval(() => {
      setDisplayed(typingWords[wordIndex].slice(0, charIndex + 1));
      charIndex++;
      if (charIndex === typingWords[wordIndex].length) {
        clearInterval(intervalRef.current);
        setTimeout(() => {
          setTyping(false);
          setTimeout(() => {
            setWordIndex((prev) => (prev + 1) % typingWords.length);
            setTyping(true);
          }, 1000);
        }, 1200);
      }
    }, 100);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [wordIndex]);

  // Animated stats logic
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
    const durations = [1200, 1200, 1200];
    stats.forEach((stat, i) => {
      let start = 0;
      const end = stat.value;
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
    <div className="relative w-full min-h-[80vh] flex items-center justify-center font-poppins">
      <img
        src="/demo-banner.jpg"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent w-1/2" style={{right: 'auto'}} />
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-4 py-12">
        {/* Top Tag */}
        <div className="flex items-center gap-2 bg-white/90 rounded-full px-5 py-2 mb-6 shadow text-primary text-base font-semibold mx-auto">
          <FaHeart className="text-accent mr-2" />
          Empowering India's Future
        </div>
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2 leading-tight">
          Building Tomorrow's
          <br />
          <span className="text-accent inline-block">
            {displayed}
            <span className="border-r-2 border-accent animate-pulse ml-1" style={{display: typing ? 'inline-block' : 'none'}}></span>
          </span>
        </h1>
        {/* Paragraph */}
        <p className="mb-8 max-w-2xl text-white text-lg md:text-xl font-medium shadow-lg">
          Loremipsum Loremipsum Loremipsum Loremipsum<br />
          LoremipsumLoremipsum LoremipsumLoremipsum
        </p>
        {/* Buttons */}
        <div className="flex gap-4 mb-10 flex-wrap justify-center">
          <button className="flex items-center gap-2 bg-[#16254a] hover:bg-accent px-7 py-3 rounded-lg text-white font-semibold text-lg transition-transform duration-300 hover:scale-105 shadow">
            Explore Programs <FaArrowRight className="ml-2" />
          </button>
          <button className="bg-white text-primary border border-white hover:bg-gray-100 px-7 py-3 rounded-lg font-semibold text-lg transition-transform duration-300 hover:scale-105 shadow">
            Our Impact
          </button>
        </div>
        {/* Animated Stats */}
        <div ref={statsRef} className="flex flex-col md:flex-row gap-8 justify-center items-center mt-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center min-w-[120px]">
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">
                {counts[i]}{stat.suffix}
              </span>
              <span className="text-base md:text-lg text-white/80 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero; 