"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import AsciiFish from "./AsciiFish"; // Import the new component

interface Ripple {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

interface FishData {
  id: number;
  x: number;
  y: number;
  direction: 'left' | 'right';
  speed: number;
  art: string;
}

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [fish, setFish] = useState<FishData[]>([]);
  const rippleIdCounter = useRef(0);
  const fishIdCounter = useRef(0);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  // Update container dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (sectionRef.current) {
        setContainerDimensions({
          width: sectionRef.current.offsetWidth,
          height: sectionRef.current.offsetHeight,
        });
      }
    };
    updateDimensions(); // Initial set
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple: Ripple = {
        id: rippleIdCounter.current++,
        x,
        y,
        opacity: 1,
        scale: 0,
      };

      setRipples((prevRipples) => {
        const updatedRipples = [...prevRipples, newRipple];
        return updatedRipples.slice(-10); // Keep last 10 ripples for performance
      });

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
        }, 700); // Match CSS transition duration
      }, 50); // Small delay to allow initial render before animation starts
    }
  };

  const removeFish = useCallback((id: number) => {
    setFish(prevFish => prevFish.filter(f => f.id !== id));
  }, []);

  useEffect(() => {
    if (containerDimensions.width === 0 || containerDimensions.height === 0) return;

    const addFishInterval = setInterval(() => {
      if (fish.length < 3) { // Limit number of fish to 3
        const direction = Math.random() > 0.5 ? 'right' : 'left';
        const art = direction === 'right' ? "><>" : "<><"; // Simple ASCII fish art
        const newFish: FishData = {
          id: fishIdCounter.current++,
          x: direction === 'right' ? -50 : containerDimensions.width + 50, // Start off-screen
          y: Math.random() * containerDimensions.height,
          direction,
          speed: Math.random() * 1.5 + 0.5, // Increased speed range (0.5 to 2.0 pixels/frame)
          art,
        };
        setFish(prevFish => [...prevFish, newFish]);
      }
    }, 15000); // Add a new fish every 15 seconds

    return () => clearInterval(addFishInterval);
  }, [fish.length, containerDimensions]);

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
          className="absolute bg-white rounded-full opacity-0 transition-all duration-700 ease-out"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '20px', // Initial size
            height: '20px',
            transform: `translate(-50%, -50%) scale(${ripple.scale})`,
            opacity: ripple.opacity,
          }}
        />
      ))}

      {/* Fish */}
      {fish.map((f) => (
        <AsciiFish
          key={f.id}
          {...f}
          containerWidth={containerDimensions.width}
          containerHeight={containerDimensions.height}
          onRemove={removeFish}
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