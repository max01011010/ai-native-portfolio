"use client";

import React from "react";
import { Button } from "@/components/ui/button"; // Import Button component

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-blue-700 to-purple-800 text-white flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div> {/* Subtle overlay */}
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 opacity-0 animate-fade-in-up">
          Hi, I'm Max.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-up animation-delay-200">
          I build free cool stuff with AI tools and builders.
        </p>
        <div className="flex justify-center space-x-4 opacity-0 animate-fade-in-up animation-delay-400">
          <Button asChild className="px-6 py-3 bg-white text-blue-700 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            <a href="#projects">
              View Projects
            </a>
          </Button>
          <Button asChild className="px-6 py-3 bg-white text-blue-700 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            <a href="#blog">
              Read Blog
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;