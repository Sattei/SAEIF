import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHeart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import logo from "../logom.svg";

const staticNavLinks = [
  { name: "Home", to: "/" },
  { name: "Blog", to: "/blog" },
  { name: "Media", to: "/media" },
  { name: "About", to: "/about" },
  { name: "Contact Us", to: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userId");
    setIsOpen(false);
    navigate("/login");
  };

  const renderNavLink = (link) => (
    <NavLink
      key={link.to}
      to={link.to}
      onClick={() => setIsOpen(false)}
      className={({ isActive }) =>
        `px-2 py-1 rounded font-medium text-base transition-colors duration-300 ${
          isActive ? "text-accent" : "text-primary hover:text-accent"
        }`
      }
    >
      {link.name}
    </NavLink>
  );

  const getDynamicLinks = () => {
    const links = [...staticNavLinks];

    if (isLoggedIn && role === "member") {
      links.splice(1, 0, { name: "Dashboard", to: "/user" });
    }
    if (isLoggedIn && role === "admin") {
      links.splice(1, 0, { name: "Admin Panel", to: "/admin" });
    }

    return links.map(renderNavLink);
  };

  const getDynamicButtons = () => (
    <>
      <Link
        to="/donate"
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-2 px-7 py-2 rounded-xl font-medium text-base shadow-sm transition-all duration-300 border border-accent text-primary bg-white hover:bg-accent hover:text-white"
      >
        <FaHeart className="text-lg" /> Donate
      </Link>

      {!isLoggedIn ? (
        <Link
          to="/login"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 px-7 py-2 rounded-xl font-medium text-base shadow-sm transition-all duration-300 bg-accent text-white hover:bg-primary"
        >
          <FaUser className="text-lg" /> Login
        </Link>
      ) : (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-7 py-2 rounded-xl font-medium text-base shadow-sm transition-all duration-300 bg-red-500 text-white hover:bg-red-600"
        >
          <FaUser className="text-lg" /> Logout
        </button>
      )}
    </>
  );

  return (
    <nav
      className={`sticky top-0 z-50 font-poppins transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg"
          : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* --- LOGO SECTION UPDATED --- */}
        <Link to="/" className="flex items-center gap-3 min-w-[220px]">
          <img
            src={logo}
            alt="SAEIF Logo"
            className="w-14 h-14 object-contain"
          />
          <div className="leading-tight">
            <div className="font-medium text-base text-primary transition-colors duration-300">
              SKILL AID EMPOWER
            </div>
            <div className="font-medium text-base text-primary transition-colors duration-300">
              INDIA FOUNDATION
            </div>
          </div>
        </Link>

        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex gap-8 items-center">{getDynamicLinks()}</div>
        </div>

        <div className="hidden md:flex gap-4 items-center min-w-[220px] justify-end">
          {getDynamicButtons()}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-t border-gray-200">
          <div className="flex flex-col gap-4 items-center">
            {getDynamicLinks()}
            <div className="flex flex-col gap-4 w-full max-w-xs pt-4">
              {getDynamicButtons()}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
