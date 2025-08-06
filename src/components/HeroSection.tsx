"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";

// Define Particle interface
interface Particle {
  x: number;
  y: number;
  vx: number; // velocity x
  vy: number; // velocity y
  radius: number;
  color: string;
}

const NUM_PARTICLES = 80; // Number of particles
const PARTICLE_RADIUS = 1.5; // Base radius for particles
const MAX_LINE_DISTANCE = 120; // Max distance for particles to connect
const MOUSE_INTERACTION_RADIUS = 150; // Radius around mouse for interaction
const MOUSE_ATTRACTION_FORCE = 0.005; // How strongly particles are attracted (reduced for subtlety)
const PARTICLE_SPEED = 0.2; // Base speed for particles

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  // Function to initialize particles
  const initParticles = useCallback((width: number, height: number) => {
    particles.current = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * PARTICLE_SPEED, // Random velocity
        vy: (Math.random() - 0.5) * PARTICLE_SPEED,
        radius: PARTICLE_RADIUS,
        color: "rgba(255, 255, 255, 0.8)", // White particles
      });
    }
  }, []);

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for redraw

    // Update and draw particles
    particles.current.forEach((p) => {
      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off walls
      if (p.x + p.radius > canvas.width || p.x - p.radius < 0) {
        p.vx *= -1;
      }
      if (p.y + p.radius > canvas.height || p.y - p.radius < 0) {
        p.vy *= -1;
      }

      // Mouse interaction: attract particles
      if (mouse.current.x !== null && mouse.current.y !== null) {
        const dx = mouse.current.x - p.x; // Distance from particle to mouse
        const dy = mouse.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_INTERACTION_RADIUS) {
          // Normalize direction vector
          const nx = dx / distance;
          const ny = dy / distance;

          // Calculate attraction force strength (stronger closer to mouse)
          const forceStrength = (1 - distance / MOUSE_INTERACTION_RADIUS) * MOUSE_ATTRACTION_FORCE;

          // Apply force to velocity
          p.vx += nx * forceStrength;
          p.vy += ny * forceStrength;

          // Add some damping to prevent excessive speed
          p.vx *= 0.98;
          p.vy *= 0.98;
        }
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    // Draw lines between particles
    for (let i = 0; i < particles.current.length; i++) {
      for (let j = i + 1; j < particles.current.length; j++) {
        const p1 = particles.current[i];
        const p2 = particles.current[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MAX_LINE_DISTANCE) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / MAX_LINE_DISTANCE})`; // Fade lines based on distance
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions to fill its parent
    const setCanvasDimensions = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        initParticles(canvas.width, canvas.height); // Re-initialize particles on resize
      }
    };

    setCanvasDimensions(); // Initial setup

    // Handle window resize
    const handleResize = () => {
      setCanvasDimensions();
    };
    window.addEventListener("resize", handleResize);

    // Mouse move handler for interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Mouse leave handler to stop interaction when mouse is outside
    const handleMouseLeave = () => {
      mouse.current = { x: null, y: null }; // Reset mouse position
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Start animation loop
    animationFrameId.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate, initParticles]); // Dependencies for useEffect

  return (
    <section
      className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-blue-700 to-purple-800 text-white flex items-center justify-center text-center overflow-hidden"
    >
      {/* Canvas for the interactive background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black opacity-20 z-10"></div> 
      
      {/* Content of the Hero Section */}
      <div className="container mx-auto px-4 relative z-20">
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