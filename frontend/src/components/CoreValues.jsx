import React from "react";
import { FaUserGraduate, FaHandshake, FaCertificate, FaIndustry } from "react-icons/fa";

const values = [
  {
    icon: <FaUserGraduate className="text-2xl text-blue-500" />,
    title: "Skill Development Courses",
    desc: "Working together across diverse backgrounds",
    color: "bg-blue-50",
  },
  {
    icon: <FaIndustry className="text-2xl text-green-500" />,
    title: "Industry Connect",
    desc: "Enabling individuals to reach their potential",
    color: "bg-green-50",
  },
  {
    icon: <FaHandshake className="text-2xl text-purple-500" />,
    title: "Mentorship & Personalized Guidance",
    desc: "Striving for the highest quality in everything",
    color: "bg-purple-50",
  },
  {
    icon: <FaCertificate className="text-2xl text-orange-400" />,
    title: "Government Certification",
    desc: "Embracing new approaches and solutions",
    color: "bg-orange-50",
  },
];

const CoreValues = () => (
  <section className="py-14 bg-white font-poppins">
    <h3 className="text-2xl font-semibold mb-8 text-center">
      Our <span className="text-accent">Core Values</span>
    </h3>
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
      {values.map((val, i) => (
        <div
          key={i}
          className={`flex flex-col items-center rounded-2xl shadow-md p-6 ${val.color} transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fadeInUp`}
        >
          <div className="mb-2">{val.icon}</div>
          <div className="font-semibold mb-1 text-[#0D2241] text-center">{val.title}</div>
          <div className="text-xs text-gray-500 text-center">{val.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default CoreValues; 