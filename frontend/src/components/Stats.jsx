import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, label: "Lives Impacted", suffix: "+" },
  { value: 50, label: "Programs", suffix: "+" },
  { value: 25, label: "Members", suffix: "+" },
];

const Stats = () => {
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
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
  }, [visible]);

  return (
    <section ref={sectionRef} className="py-12 bg-white font-poppins">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center animate-fadeInUp">
            <span className="text-4xl font-bold text-primary mb-2">
              {counts[i]}{stat.suffix}
            </span>
            <span className="text-lg text-gray-700 font-medium">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats; 