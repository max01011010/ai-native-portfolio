"use client";

import React, { useState, useEffect, useRef } from "react";

interface AsciiFishProps {
  id: number;
  initialX: number;
  initialY: number;
  direction: 'left' | 'right';
  speed: number;
  art: string;
  containerWidth: number;
  containerHeight: number;
  onRemove: (id: number) => void;
}

const AsciiFish: React.FC<AsciiFishProps> = ({
  id,
  initialX,
  initialY,
  direction,
  speed,
  art,
  containerWidth,
  containerHeight,
  onRemove,
}) => {
  const [currentX, setCurrentX] = useState(initialX);
  const [currentY, setCurrentY] = useState(initialY);
  const animationRef = useRef<number>();
  const fishRef = useRef<HTMLPreElement>(null);

  const animate = () => {
    setCurrentX((prevX) => {
      let newX = prevX + (direction === 'right' ? speed : -speed);
      const fishWidth = fishRef.current?.offsetWidth || 50; // Estimate fish width

      // If fish goes completely off-screen, remove it
      if (direction === 'right' && newX > containerWidth + fishWidth) {
        onRemove(id);
        return newX;
      } else if (direction === 'left' && newX < -fishWidth) {
        onRemove(id);
        return newX;
      }
      return newX;
    });
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [direction, speed, containerWidth, onRemove, id]);

  return (
    <pre
      ref={fishRef}
      className="absolute text-white text-sm md:text-base lg:text-lg pointer-events-none whitespace-pre z-20" // Added z-20
      style={{
        left: `${currentX}px`,
        top: `${currentY}px`,
        transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
        transition: 'none', // Important for requestAnimationFrame animations
      }}
    >
      {art}
    </pre>
  );
};

export default AsciiFish;