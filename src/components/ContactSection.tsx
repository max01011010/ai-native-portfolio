"use client";

import React from "react";
import { Link } from "react-router-dom";

const ContactSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 h-full flex flex-col justify-between items-center overflow-y-auto">
      <div className="container mx-auto px-4 text-center flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 opacity-0 animate-fade-in-up">Get in Touch</h2>
        <p className="text-lg mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Have a project idea or just want to say hello? Feel free to reach out!
        </p>
        <a
          href="mailto:contact@maxabardo.work"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg opacity-0 animate-fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          Email Me
        </a>
      </div>

      {/* This area is now clear for your asteroids game background */}
      <div className="flex-grow w-full flex items-center justify-center">
        {/* Asteroids game background will go here */}
      </div>

      <div className="container mx-auto px-4 text-center mt-auto"> {/* mt-auto pushes this div to the bottom */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
          <a
            href="https://www.dyad.sh/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Made with Dyad
          </a>
          <span className="hidden md:inline-block">|</span>
          <Link
            to="/terms-and-conditions"
            className="text-sm hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Terms and Conditions
          </Link>
          <span className="hidden md:inline-block">|</span>
          <Link
            to="/privacy-policy"
            className="text-sm hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
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