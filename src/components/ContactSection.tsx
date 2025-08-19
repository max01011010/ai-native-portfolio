"use client";

import React from "react";
import { Link } from "react-router-dom";
import AsteroidsGame from "./AsteroidsGame"; // Import the new AsteroidsGame component

const ContactSection: React.FC = () => {
  return (
    <section className="relative py-12 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 h-full flex flex-col justify-between items-center overflow-hidden">
      {/* Asteroids game background */}
      <AsteroidsGame />

      {/* Overlay to make text readable over the game */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Content of the Contact Section */}
      <div className="container mx-auto px-4 text-center flex flex-col items-center relative z-20 text-white">
        <h2 className="text-3xl font-bold mb-8 text-gray-100 opacity-0 animate-fade-in-up">Get in Touch</h2>
        <p className="text-lg mb-8 max-w-xl opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Have a project idea or just want to say hello? Feel free to reach out!
          <br />
          <span className="text-sm text-gray-300">(You can play a mini-game while you're here!)</span>
        </p>
        <a
          href="mailto:contact@maxabardo.work"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg opacity-0 animate-fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          Email Me
        </a>
      </div>

      <div className="container mx-auto px-4 text-center mt-auto relative z-20 text-white">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
          <a
            href="https://www.dyad.sh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-gray-300 transition-colors"
          >
            Made with Dyad
          </a>
          <span className="hidden md:inline-block">|</span>
          <Link
            to="/terms-and-conditions"
            className="text-sm hover:text-gray-300 transition-colors"
          >
            Terms and Conditions
          </Link>
          <span className="hidden md:inline-block">|</span>
          <Link
            to="/privacy-policy"
            className="text-sm hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
        <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} Max's Dev Portfolio. All rights reserved.</p>
      </div>
    </section>
  );
};

export default ContactSection;