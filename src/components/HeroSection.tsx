"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface Ripple {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

const MIN_RIPPLE_DISTANCE = 10; // Minimum distance in pixels between ripples
const RIPPLE_CREATION_INTERVAL = 50; // milliseconds between each new ripple (can be adjusted)

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdCounter = useRef(0);
  const lastRipplePosition = useRef<{ x: number; y: number } | null>(null);
  const lastRippleTime = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();

    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Check time interval to prevent too many ripples on very fast movements
      if (now - lastRippleTime.current < RIPPLE_CREATION_INTERVAL) {
        return;
      }

      // Check distance from last created ripple
      if (lastRipplePosition.current) {
        const dx = mouseX - lastRipplePosition.current.x;
        const dy = mouseY - lastRipplePosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < MIN_RIPPLE_DISTANCE) {
          return;
        }
      }

      const newRipple: Ripple = {
        id: rippleIdCounter.current++,
        x: mouseX,
        y: mouseY,
        opacity: 1,
        scale: 0,
      };

      setRipples((prevRipples) => {
        const updatedRipples = [...prevRipples, newRipple];
        return updatedRipples.slice(-6); // Keep only the last 6 ripples
      });

      lastRipplePosition.current = { x: mouseX, y: mouseY };
      lastRippleTime.current = now;

      // Animate and remove ripple
      setTimeout(() => {
        setRipples((prevRipples) =>
          prevRipples.map((r) =>
            r.id === newRipple.id ? { ...r, opacity: 0, scale: 1 } : r
          )
        );
        setTimeout(() => {
          setRipples((prevRipples) =>
            prevRipples.filter((r) => r.id !== newRipple.id)
          );
        }, 25000); // Match CSS transition duration (25s)
      }, 50); // Small delay to allow initial render before animation starts
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-blue-700 to-purple-800 text-white flex items-center justify-center text-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div> {/* Subtle overlay */}
      
      {/* Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute bg-white rounded-full opacity-0 transition-all duration-[25000ms] ease-out" // Duration is 25 seconds
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '40px', // Initial size
            height: '40px',
            transform: `translate(-50%, -50%) scale(${ripple.scale})`,
            opacity: ripple.opacity,
          }}
        />
      ))}

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