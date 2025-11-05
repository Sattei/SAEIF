import React from "react";

const ThreeCModel = () => {
  const cards = [
    {
      title: "Communication",
      content: "Effective communication is vital for success, whether in interviews or professional interactions. At SAEIF, we prioritize building essential soft skills such as presentation, public speaking, and effective expression of ideas to help youth articulate their knowledge confidently."
    },
    {
      title: "1:1 Connect",
      content: "One-on-one mentorship with seasoned industry experts to support career transitions and skill-building."
    },
    {
      title: "Community Connect",
      content: "We believe in the power of multidisciplinary collaboration. Our participants come from diverse backgrounds, creating a vibrant environment for interdisciplinary exchange."
    }
  ];

  const renderTitle = (title) => {
    let firstLetter, restOfTitle;
    
    // Special handling for "1:1 Connect" to make the first 'C' orange
    if (title === "1:1 Connect") {
      return (
        <h3 className="text-xl md:text-2xl font-bold text-white text-center">
          1:1 <span className="text-accent">C</span>onnect
        </h3>
      );
    } else {
      firstLetter = title.charAt(0);
      restOfTitle = title.slice(1);
      
      return (
        <h3 className="text-xl md:text-2xl font-bold text-white text-center">
          <span className="text-accent">{firstLetter}</span>
          {restOfTitle}
        </h3>
      );
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Primary Heading */}
          <div className="lg:pr-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              Our{" "}
              <span className="text-accent">3C</span>{" "}
              Model to Address the Skill Gap
            </h2>
          </div>

          {/* Cards Container */}
          <div className="flex gap-8">
            {/* Left Column */}
            <div className="flex flex-col gap-8">
              {/* Communication Card - Top */}
              <div className="group bg-primary rounded-3xl p-6 md:p-8 shadow-lg transform transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:z-10 w-80 h-64 flex flex-col items-center justify-center">
                {renderTitle(cards[0].title)}
                <div className="overflow-hidden transition-all duration-200 ease-out max-h-0 group-hover:max-h-60 w-full px-4">
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed mt-4 text-center">
                    {cards[0].content}
                  </p>
                </div>
              </div>

              {/* 1:1 Connect Card - Bottom */}
              <div className="group bg-primary rounded-3xl p-6 md:p-8 shadow-lg transform transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:z-10 w-80 h-64 flex flex-col items-center justify-center">
                {renderTitle(cards[1].title)}
                <div className="overflow-hidden transition-all duration-200 ease-out max-h-0 group-hover:max-h-60 w-full px-4">
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed mt-4 text-center">
                    {cards[1].content}
                  </p>
                </div>
              </div>
            </div>

            {/* Community Connect Card - Right (spans height of both left cards) */}
            <div className="group bg-primary rounded-3xl p-6 md:p-8 shadow-lg transform transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:z-10 w-80 h-80 flex flex-col items-center justify-center">
              {renderTitle(cards[2].title)}
              <div className="overflow-hidden transition-all duration-200 ease-out max-h-0 group-hover:max-h-72 w-full px-4">
                <p className="text-white/90 text-xs md:text-sm leading-relaxed mt-4 text-center">
                  {cards[2].content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeCModel; 