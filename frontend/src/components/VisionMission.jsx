import React from "react";
import { FaEye, FaBullseye } from "react-icons/fa";

const cards = [
  {
    icon: <FaEye className="text-3xl text-blue-500" />,
    title: "Our Vision",
    color: "bg-blue-50",
    text: "To create a skilled, empowered, and prosperous India where every individual has access to quality education, meaningful employment, and opportunities for personal and professional growth.",
  },
  {
    icon: <FaBullseye className="text-3xl text-purple-500" />,
    title: "Our Mission",
    color: "bg-purple-50",
    text: "To bridge the skill gap in India by providing comprehensive training, mentorship, and support systems that enable individuals to thrive in the modern economy and contribute to national development.",
  },
];

const VisionMission = () => (
  <section className="py-8 bg-white font-poppins">
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`rounded-2xl shadow-lg p-8 flex flex-col items-center ${card.color} transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fadeInUp`}
        >
          <div className="mb-3">{card.icon}</div>
          <h3 className="font-semibold text-lg mb-2 text-[#0D2241]">{card.title}</h3>
          <p className="text-gray-600 text-base">{card.text}</p>
        </div>
      ))}
    </div>
  </section>
);

export default VisionMission; 