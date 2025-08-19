"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import AppCardGrid from "@/components/AppCardGrid";
import CommonNinjaBlogWidget from "@/components/CommonNinjaBlogWidget";
import ContactSection from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import ChevronLeft and ChevronRight

const sections = [
  { id: "hero", component: HeroSection },
  { id: "projects", component: AppCardGrid },
  { id: "blog", component: CommonNinjaBlogWidget },
  { id: "contact", component: ContactSection },
];

const Index = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastScrollDirectionRef = useRef<'up' | 'down' | null>(null);
  const isTransitioningRef = useRef(false); // To prevent rapid horizontal transitions during animation

  const scrollToSection = useCallback((index: number) => {
    if (containerRef.current) {
      const newTransform = `translateX(-${index * 100}vw)`;
      containerRef.current.style.transform = newTransform;
      setCurrentSectionIndex(index);
    }
  }, []);

  const handleScroll = useCallback((event: WheelEvent) => {
    const currentSectionElement = containerRef.current?.children[currentSectionIndex] as HTMLElement;
    if (!currentSectionElement) return;

    const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
    const deltaY = event.deltaY;

    let potentialNewIndex = currentSectionIndex;
    let atEdge = false;

    if (deltaY > 0) { // Scrolling down
      // Check if at the bottom of the scrollable content (with a small buffer for precision)
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        atEdge = true;
        potentialNewIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
      }
    } else if (deltaY < 0) { // Scrolling up
      // Check if at the top of the scrollable content (with a small buffer for precision)
      if (scrollTop <= 1) {
        atEdge = true;
        potentialNewIndex = Math.max(0, currentSectionIndex - 1);
      }
    }

    if (atEdge && potentialNewIndex !== currentSectionIndex) {
      // We are at a vertical edge and there's a horizontal section to transition to
      event.preventDefault(); // Prevent default vertical scroll

      const currentDirection = deltaY > 0 ? 'down' : 'up';

      // Determine if a delay should be applied for the *current* section
      const shouldApplyDelay = currentSectionIndex === 1 || currentSectionIndex === 2; // Index 1 is Projects, Index 2 is Blog

      if (shouldApplyDelay) {
        // If already waiting for a transition in the same direction, do nothing
        if (scrollTimeoutRef.current && lastScrollDirectionRef.current === currentDirection) {
          return;
        }

        // Clear any existing timeout (e.g., if direction changed or new scroll initiated)
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = null;
        }

        // Start new timeout for horizontal transition
        lastScrollDirectionRef.current = currentDirection;
        scrollTimeoutRef.current = window.setTimeout(() => {
          if (!isTransitioningRef.current) { // Only transition if not already in progress
            isTransitioningRef.current = true;
            scrollToSection(potentialNewIndex);
            // After the transition animation, allow new transitions
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 700); // Match CSS transition duration
          }
          scrollTimeoutRef.current = null; // Clear timeout ID after it fires
          lastScrollDirectionRef.current = null;
        }, 1500); // 1.5 second delay
      } else {
        // No delay for Hero or Contact sections, transition immediately
        if (!isTransitioningRef.current) {
          isTransitioningRef.current = true;
          scrollToSection(potentialNewIndex);
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 700); // Match CSS transition duration
        }
      }
    } else {
      // Not at a vertical edge, or no horizontal section to transition to
      // Allow internal vertical scrolling
      // Clear any pending horizontal transition timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
        lastScrollDirectionRef.current = null;
      }
      // Do not prevent default, let the browser handle vertical scroll
    }
  }, [currentSectionIndex, scrollToSection]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isTransitioningRef.current) return; // Prevent rapid transitions

    let newIndex = currentSectionIndex;
    if (event.key === "ArrowDown" || event.key === "PageDown") {
      newIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
    } else if (event.key === "ArrowUp" || event.key === "PageUp") {
      newIndex = Math.max(0, currentSectionIndex - 1);
    }

    if (newIndex !== currentSectionIndex) {
      scrollToSection(newIndex);
      isTransitioningRef.current = true;
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 700); // Match CSS transition duration
    }
  }, [currentSectionIndex, scrollToSection]);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleScroll, handleKeyDown]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div
        ref={containerRef}
        className="flex flex-row w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSectionIndex * 100}vw)` }}
      >
        {sections.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            className="flex-shrink-0 w-screen h-screen overflow-y-auto" // Each section takes full screen and can scroll internally
          >
            {React.createElement(section.component, { isActive: index === currentSectionIndex })}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 right-8 flex flex-col space-y-2 z-50">
        {currentSectionIndex < sections.length - 1 && (
          <Button
            onClick={() => scrollToSection(currentSectionIndex + 1)}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            aria-label="Scroll Right"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
        {currentSectionIndex > 0 && (
          <Button
            onClick={() => scrollToSection(currentSectionIndex - 1)}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;