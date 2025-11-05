import React from "react";
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import logo from "../logom.svg";

const Footer = () => (
  <footer className="bg-gradient-to-r from-[#3a4b9c] to-[#1a237e] text-white font-poppins pt-10 pb-4 px-2 md:px-0">
    <div className="max-w-7xl mx-auto rounded-[48px] bg-[#16254a] p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-0">
      {/* Left: Logo and Contact */}
      <div className="flex-1 flex items-center gap-6">
        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-lg">
          <img
            src={logo}
            alt="SAEIF Logo"
            className="w-24 h-24 object-contain"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg">
            <MdLocationOn className="text-accent text-2xl" />
            <span>Delhi, India</span>
          </div>
          <div className="flex items-center gap-2 text-lg">
            <MdEmail className="text-accent text-2xl" />
            <span>skillaidempowerindia@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 text-lg">
            <MdPhone className="text-accent text-2xl" />
            <span>+91 971 170 6032</span>
          </div>
        </div>
      </div>

      {/* Right: Socials */}
      <div className="flex flex-col flex-[0.8] gap-6">
        <div className="rounded-2xl bg-[#1e335c] p-6 flex flex-col items-center mb-2">
          <div className="font-semibold text-lg mb-2 tracking-wide">
            WELLBEING BHARAT
          </div>
          <div className="flex gap-8 text-4xl">
            <a
              href="https://www.instagram.com/skillaidempowerindiafoundation"
              aria-label="Instagram"
              className="hover:text-accent transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@SkillAidEmpowerIndiaFoundation"
              aria-label="YouTube"
              className="hover:text-accent transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-[#1e335c] p-6 flex flex-col items-center">
          <div className="font-semibold text-lg mb-2 text-center tracking-wide">
            SKILL AID EMPOWER INDIA FOUNDATION
          </div>
          <div className="flex gap-8 text-4xl">
            <a
              href="https://www.instagram.com/skillaidempowerindiafoundation"
              aria-label="Instagram"
              className="hover:text-accent transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/skillaidempowerindia"
              aria-label="Facebook"
              className="hover:text-accent transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/company/skill-aid-empower-india-foundation/"
              aria-label="LinkedIn"
              className="hover:text-accent transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.youtube.com/@SkillAidEmpowerIndiaFoundation"
              aria-label="YouTube"
              className="hover:text-accent transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto mt-6 rounded-[24px] bg-[#16254a] text-center text-base py-3 tracking-wide">
      SAEIF © Copyright 2025
    </div>
  </footer>
);

export default Footer;
