"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import ConstellationBackground from "./ConstellationBackground"; // Import the new component

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative w-full h-full bg-gradient-to-br from-blue-700 to-purple-800 text-white flex items-center justify-center text-center overflow-hidden"
    >
      {/* Constellation Background */}
      <ConstellationBackground />
      
      {/* Content of the Hero Section */}
      <div className="container mx-auto px-4 relative z-20">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 opacity-0 animate-fade-in-up">
          Hi, I'm Max.
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          I build free cool stuff with AI tools and builders.
        </p>
        <div className="flex justify-center space-x-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
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