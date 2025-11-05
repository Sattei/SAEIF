import React from "react";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();

  // This function will run when a user clicks "Select Plan"
  const handlePlanSelection = (planType) => {
    // It will navigate to the payment page with the selected plan in the URL
    navigate(`/payment?plan=${planType}`);
  };

  return (
    <div className="bg-white">
      {/* Membership Plans Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome!</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect plan that matches your learning goals and
              unlock exclusive access to our premium resources and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 6-Month Plan */}
            <div className="relative">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 h-full hover:border-accent transition-all duration-300 hover:shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    6-Month Plan
                  </h3>
                  <p className="text-gray-600 mb-4">valid for 6 months</p>
                  <div className="text-4xl font-bold text-accent mb-6">
                    ₹6,000
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {/* ... (list items for 6-month plan) ... */}
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">
                      Access to our Communication Skills Course (Foundational to
                      Intermediate)
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">
                      Dedicated Mentorship and Guidance
                    </span>
                  </li>
                  {/* Add all other list items here */}
                </ul>
                <button
                  onClick={() => handlePlanSelection("6-month")}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                >
                  Select Plan
                </button>
              </div>
            </div>

            {/* 1-Year Plan - Most Popular */}
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 h-full hover:border-purple-300 transition-all duration-300 hover:shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👑</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    1-Year Plan
                  </h3>
                  <p className="text-gray-600 mb-4">valid for 12 months</p>
                  <div className="text-4xl font-bold text-accent mb-6">
                    ₹11,000
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {/* ... (list items for 1-year plan) ... */}
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm font-medium">
                      Includes Everything in the 6-Month Plan, Plus:
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">
                      Year-long access to exclusive events hosted by government
                      and private bodies
                    </span>
                  </li>
                  {/* Add all other list items here */}
                </ul>
                <button
                  onClick={() => handlePlanSelection("1-year")}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Select Plan
                </button>
              </div>
            </div>

            {/* Lifetime Plan */}
            <div className="relative">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 h-full hover:border-accent transition-all duration-300 hover:shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Lifetime Plan
                  </h3>
                  <p className="text-gray-600 mb-4">One time payment</p>
                  <div className="text-4xl font-bold text-accent mb-6">
                    ₹1,10,000
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {/* ... (list items for lifetime plan) ... */}
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm font-medium">
                      Includes Everything in the Yearly Plan, Plus:
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">
                      Lifetime access to all current and future courses
                    </span>
                  </li>
                  {/* Add all other list items here */}
                </ul>
                <button
                  onClick={() => handlePlanSelection("lifetime")}
                  className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                >
                  Select Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserPage;
