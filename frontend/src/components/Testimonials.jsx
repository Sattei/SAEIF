import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaQuoteLeft, FaQuoteRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Nikky Joan",
    role: "CEO OF Yellow",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex commodo consequat. Duis aute irure dolor in reprehenderit",
    rating: 4,
    avatar: "/nikky-joan.jpg",
  },
  {
    name: "Rahul Mehra",
    role: "Product Manager",
    message:
      "A wonderful experience! The mentorship and support helped me grow professionally.",
    rating: 5,
    avatar: "/rahul-mehra.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Data Analyst",
    message:
      "The programs are practical and impactful. Highly recommended!",
    rating: 5,
    avatar: "/priya-sharma.jpg",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  if (!testimonials.length || !t) {
    return (
      <section className="py-16 bg-white font-poppins text-center">
        <h3 className="text-3xl font-semibold text-[#0D2241] mb-2">Testimonials</h3>
        <div className="w-20 h-2 bg-[#0D2241] rounded-full mx-auto mb-10" />
        <div className="text-gray-500 text-lg">No testimonials available.</div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white font-poppins">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-semibold text-[#0D2241] mb-2">Testimonials</h3>
        <div className="w-20 h-2 bg-[#0D2241] rounded-full mx-auto mb-10" />
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
          {/* Left Arrow */}
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-12 h-12 flex items-center justify-center text-2xl text-[#0D2241] hover:bg-accent hover:text-white transition"
          >
            <FaChevronLeft />
          </button>
          {/* User Image and Name */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-48 h-48 rounded-full object-cover mb-4 border-4 border-white shadow-lg"
            />
            <div className="font-semibold text-[#0D2241] text-lg mt-2">{t.name}</div>
            <div className="text-gray-500 text-sm mb-2">{t.role}</div>
          </div>
          {/* Testimonial Content */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaQuoteLeft className="text-4xl text-gray-700" />
            </div>
            <p className="italic text-gray-700 text-lg md:text-xl max-w-xl mx-auto font-serif leading-relaxed">
              {t.message}
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 mb-2">
              <FaQuoteRight className="text-4xl text-gray-700" />
            </div>
            <div className="flex gap-1 text-2xl justify-center mt-2 mb-2">
              {Array.from({ length: t.rating }).map((_, i) => (
                <FaStar key={i} className="text-accent" />
              ))}
            </div>
          </div>
          {/* Right Arrow */}
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full w-12 h-12 flex items-center justify-center text-2xl text-[#0D2241] hover:bg-accent hover:text-white transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 