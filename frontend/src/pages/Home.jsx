import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Purpose from "../components/Purpose";
import VisionMission from "../components/VisionMission";
import CoreValues from "../components/CoreValues";
import Testimonials from "../components/Testimonials";

const Home = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.reveal-section');
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white font-poppins">
      <Hero />
      <div className="reveal-section"><Purpose /></div>
      <div className="reveal-section"><VisionMission /></div>
      <div className="reveal-section"><CoreValues /></div>
      <div className="reveal-section"><Testimonials /></div>
    </div>
  );
};

export default Home; 