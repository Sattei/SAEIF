import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ 
    name: "", 
    surname: "", 
    email: "", 
    mobile: "", 
    message: "" 
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("Message sent successfully!");
        setForm({ name: "", surname: "", email: "", mobile: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch {
      setStatus("Failed to send message.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white font-poppins">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent">
          <img
            src="/demo-banner.jpg"
            alt="Contact Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div className="text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                We'd love to hear from{" "}
                <span className="text-accent">you!!!</span>
              </h1>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-primary rounded-3xl p-8 md:p-10 shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Contact <span className="text-accent">Us</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      name="surname"
                      value={form.surname}
                      onChange={handleChange}
                      placeholder="Enter Surname"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                
                <div>
                  <input
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Enter your Number"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Send us a message"
                    required
                    rows="4"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
                
                {status && (
                  <div className="text-center text-green-400 font-medium">
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Get in <span className="text-accent">Touch</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Reach out to us through any of these channels. We're here to help and answer your questions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Address Card */}
            <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-150 ease-out transform hover:-translate-y-1 border border-gray-100">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-150 ease-out shadow-lg">
                  <FaMapMarkerAlt className="text-white text-xl sm:text-2xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3 text-center">Our Location</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                Ashok Vihar, Delhi, 110052
              </p>
            </div>

            {/* Email Card */}
            <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-150 ease-out transform hover:-translate-y-1 border border-gray-100">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-150 ease-out shadow-lg">
                  <FaEnvelope className="text-white text-xl sm:text-2xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3 text-center">Email Us</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed break-words">
                skillaidempowerindia@gmail.com
              </p>
            </div>

            {/* Phone Card */}
            <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-150 ease-out transform hover:-translate-y-1 border border-gray-100 sm:col-span-2 lg:col-span-1">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-primary/80 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-150 ease-out shadow-lg">
                  <FaPhone className="text-white text-xl sm:text-2xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3 text-center">Call Us</h3>
              <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                +91 971 170 6032
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49747.80263705773!2d77.12244358253184!3d28.686554632979423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0214d7f5bea1%3A0x4704b7ef4b09ac43!2sAshok%20Vihar%2C%20Delhi!5e0!3m2!1sen!2sin!4v1753906326444!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SAEIF Location - Ashok Vihar, Delhi"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 