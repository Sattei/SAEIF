import React, { useState, useEffect } from "react";
import { FaHeart, FaQrcode, FaUniversity, FaCreditCard, FaCopy, FaFileAlt, FaShieldAlt, FaEye } from "react-icons/fa";

const Donate = () => {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    amount: "", 
    method: "qr" 
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "DREAMS";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("http://localhost:5000/api/donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      });
      if (res.ok) {
        setStatus("Donation successful! Thank you.");
        setForm({ name: "", email: "", amount: "", method: "qr" });
      } else {
        setStatus("Failed to process donation.");
      }
    } catch {
      setStatus("Failed to process donation.");
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const scrollToDonateSection = () => {
    const donateSection = document.getElementById('donate-section');
    if (donateSection) {
      donateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white font-poppins">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0">
          <img
            src="/demo-banner.jpg"
            alt="Empower Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/60 via-red-500/40 to-blue-900/70"></div>
        </div>
        
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* Top Center Button */}
          <div className="flex justify-center p-8 pt-16">
            <button 
              onClick={scrollToDonateSection}
              className="bg-white text-gray-800 px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
            >
              <FaHeart className="text-pink-500 text-lg" />
              Make a Difference Today
            </button>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center items-center px-4">
            {/* Main Heading with Typewriter Effect */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 text-center">
              Empower<br />
              <span className="text-yellow-400">
                {displayText}
                <span className="animate-pulse text-yellow-400">|</span>
              </span>
            </h1>
            
            {/* Mission Statement */}
            <p className="text-xl md:text-2xl text-white max-w-4xl leading-relaxed mb-16 text-left">
              Your contribution helps us bridge the skill gap in India, transforming lives and building a stronger workforce. Every donation, no matter the size, creates ripples of positive change across communities.
            </p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl w-full">
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-white border border-white/20">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-center mb-2">2,500+</div>
                <div className="text-sm text-center">Lives Transformed</div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-white border border-white/20">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 border-2 border-white rounded-full"></div>
                </div>
                <div className="text-3xl font-bold text-center mb-2">150+</div>
                <div className="text-sm text-center">Programs Completed</div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-white border border-white/20">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </div>
                <div className="text-3xl font-bold text-center mb-2">95%</div>
                <div className="text-sm text-center">Success Rate</div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 text-white border border-white/20">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FaHeart className="text-white text-xl" />
                </div>
                <div className="text-3xl font-bold text-center mb-2">50+</div>
                <div className="text-sm text-center">Corporate Partners</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Choose Your Donation Method Section */}
      <section id="donate-section" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Choose Your <span className="text-accent">Donation Method</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Support our mission through secure and convenient payment options. Every contribution helps us create more opportunities for skill development across India.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* QR Code Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <FaQrcode className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">Quick Pay with QR Code</h3>
                  <p className="text-gray-600">Scan and pay instantly using any UPI app.</p>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-6 mb-6 flex justify-center">
                <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-300 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">QR Code</span>
                    </div>
                    <p className="text-sm text-gray-600">UPI ID: saieif@idfcbank</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 justify-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Google Pay</button>
                <button className="bg-purple-500 text-white px-4 py-2 rounded-lg text-sm">PhonePe</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Paytm</button>
              </div>
            </div>

            {/* Bank Transfer Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <FaUniversity className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">Bank Transfer</h3>
                  <p className="text-gray-600">Direct bank transfer for larger donations.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Account Name:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Skill Aid Empower India Foundation</span>
                    <button onClick={() => copyToClipboard("Skill Aid Empower India Foundation")} className="text-accent hover:text-accent/80">
                      <FaCopy />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">101841316426</span>
                    <button onClick={() => copyToClipboard("101841316426")} className="text-accent hover:text-accent/80">
                      <FaCopy />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">IFSC Code:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">IDFB0020187</span>
                    <button onClick={() => copyToClipboard("IDFB0020187")} className="text-accent hover:text-accent/80">
                      <FaCopy />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Bank Name:</span>
                  <span className="font-medium">IDFC FIRST</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Branch:</span>
                  <span className="font-medium">NEW DELHI - JASOLA BRANCH</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Account Type:</span>
                  <span className="font-medium">Current Account</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Please include "SAEIF Donation" in the transfer description and send transaction details for email confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* Secure Online Payment Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <FaCreditCard className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary">Secure Online Payment</h3>
                <p className="text-gray-600">Pay securely with your credit/debit card or net banking through our secure payment gateway.</p>
              </div>
            </div>
            
            <div className="text-center">
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                Donate Now - ₹1000
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Get Your Tax Receipt Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaFileAlt className="text-accent text-3xl" />
              <h2 className="text-4xl font-bold text-primary">
                Get Your <span className="text-accent">Tax Receipt</span>
              </h2>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Generate your official donation receipt for tax deduction under Section 80G. All donations to SAEIF are eligible for tax benefits.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Personal Details */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-6">Personal Details</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                  />
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                  />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                  />
                  <textarea
                    placeholder="Enter your complete address"
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                  />
                  <input
                    type="text"
                    placeholder="ABCD1234F (Optional)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-4">Receipts for donations above ₹2,000.</p>
              </div>

              {/* Donation Details */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-6">Donation Details</h3>
                <div className="space-y-4">
                  <input
                    type="number"
                    placeholder="₹ 1000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                  />
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent">
                    <option>UPI/Payment Gateway</option>
                    <option>Bank Transfer</option>
                    <option>QR Code</option>
          </select>
                  <input
                    type="text"
                    placeholder="Transaction ID"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                  />
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                  />
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Tax Benefits</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• 80G tax deduction under Section 80G</li>
                      <li>• Valid for current financial year</li>
                      <li>• Keep this receipt for tax filing</li>
                    </ul>
                  </div>
                  
                  <button className="w-full bg-accent hover:bg-accent/90 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                    Generate & Download Receipt
                  </button>
                  
                  <p className="text-sm text-gray-600 text-center">
                    Receipt will be downloaded as a pdf file. You can also request an email copy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Trust, Our Responsibility Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Your Trust, Our <span className="text-accent">Responsibility</span>
            </h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">
              We maintain the highest standards of transparency and accountability in all our operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-white font-bold mb-2">80G Certified</h3>
              <p className="text-gray-300 text-sm">Registered under Section 80G for tax deductions</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-white font-bold mb-2">12A Registered</h3>
              <p className="text-gray-300 text-sm">Income tax exemption under Section 12A</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEye className="text-white text-2xl" />
              </div>
              <h3 className="text-white font-bold mb-2">Transparent Operations</h3>
              <p className="text-gray-300 text-sm">Regular audits and public disclosure of funds</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h3 className="text-white font-bold mb-2">FCRA Compliant</h3>
              <p className="text-gray-300 text-sm">Foreign Contribution Regulation Act compliant</p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Financial Transparency</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">85%</div>
                <div className="text-white">Program Expenses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">10%</div>
                <div className="text-white">Administrative Costs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">5%</div>
                <div className="text-white">Fundraising Expenses</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate; 