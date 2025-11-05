import React from "react";

const WhoWeWorkWith = () => {
  const sections = [
    {
      icon: (
        <img 
          src="/students-icon.png" 
          alt="Students Icon" 
          className="w-24 h-24 object-cover rounded-full"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
      ),
      fallbackIcon: (
        <div className="relative w-16 h-16">
          {/* Video call grid */}
          <div className="grid grid-cols-2 gap-1 w-12 h-12 bg-black rounded-lg p-1">
            <div className="bg-teal-500 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            </div>
            <div className="bg-black rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <div className="bg-black rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <div className="bg-teal-500 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            </div>
          </div>
          {/* Graduation cap */}
          <div className="absolute -top-1 -left-1 w-6 h-4 bg-teal-500 rounded-t-lg">
            <div className="w-full h-0.5 bg-black mt-0.5"></div>
          </div>
          {/* Pen */}
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-0.5 bg-black transform rotate-45"></div>
        </div>
      ),
      label: "Students",
      description: "College students and recent graduates seeking career guidance and skill development."
    },
    {
      icon: (
        <img 
          src="/professionals-icon.png" 
          alt="Working Professionals Icon" 
          className="w-24 h-24 object-cover rounded-full"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
      ),
      fallbackIcon: (
        <div className="relative w-16 h-16">
          {/* Presentation board */}
          <div className="w-12 h-8 bg-white border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
            <div className="w-8 h-5 bg-gray-200 rounded"></div>
          </div>
          {/* Three people */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
          </div>
        </div>
      ),
      label: "Working Professionals",
      description: "Early and mid-career professionals looking to advance their skills and career."
    },
    {
      icon: (
        <img 
          src="/entrepreneurs-icon.png" 
          alt="Entrepreneurs Icon" 
          className="w-24 h-24 object-cover rounded-full"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
      ),
      fallbackIcon: (
        <div className="relative w-16 h-16">
          {/* Speech bubble */}
          <div className="w-12 h-8 bg-orange-200 border-2 border-dashed border-orange-400 rounded-lg flex items-center justify-center">
            <div className="w-6 h-4 bg-orange-300 rounded-t-lg relative">
              <div className="absolute -bottom-0.5 left-1 w-1 h-1 bg-orange-200 transform rotate-45"></div>
            </div>
          </div>
          {/* Person with microphone */}
          <div className="absolute -top-0.5 right-0.5">
            <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
            <div className="w-1.5 h-2 bg-teal-500 rounded-full mx-auto mt-0.5"></div>
            <div className="w-0.5 h-1.5 bg-teal-500 rounded-full mx-auto mt-0.5"></div>
          </div>
        </div>
      ),
      label: "Entrepreneurs, Freelancers, Women Returnees",
      description: "Entrepreneurs, freelancers, and women returning to the workforce."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          <span className="text-primary">Who We</span>{" "}
          <span className="text-accent">Work With?</span>
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-lg text-center mb-12 max-w-4xl mx-auto leading-relaxed">
          Our programs are designed for individuals aged 17 and above—including college students, 
          early and mid-career professionals, freelancers, entrepreneurs, and anyone seeking to 
          upskill or pivot their career.
        </p>

        {/* Three Sections */}
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div key={index} className="text-center group">
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  {section.icon}
                  <div style={{ display: 'none' }}>
                    {section.fallbackIcon}
                  </div>
                </div>
                {/* Additional decorative elements for each section */}
                {index === 0 && (
                  <>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-200 rounded-full opacity-60"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-200 rounded-full opacity-60"></div>
                  </>
                )}
                {index === 1 && (
                  <>
                    <div className="absolute top-0 right-0 w-8 h-8 bg-blue-200 rounded-lg opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 bg-purple-200 rounded-full opacity-60"></div>
                  </>
                )}
                {index === 2 && (
                  <>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-200 rounded-full opacity-60"></div>
                    <div className="absolute -bottom-1 -left-1 w-7 h-7 bg-green-200 rounded-lg opacity-60"></div>
                  </>
                )}
              </div>

              {/* Label */}
              <h3 className="text-xl font-bold text-accent mb-3">
                {section.label}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith; 