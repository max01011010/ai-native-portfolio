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
  const isTransitioningRef = useRef(false); // To prevent rapid horizontal transitions during animation

  const scrollToSection = useCallback((index: number) => {
    if (containerRef.current) {
      const newTransform = `translateX(-${index * 100}vw)`;
      containerRef.current.style.transform = newTransform;
      setCurrentSectionIndex(index);
    }
  }, []);

  const handleScroll = useCallback((event: WheelEvent) => {
    if (isTransitioningRef.current) {
      event.preventDefault(); // Prevent any scrolling during horizontal transition
      return;
    }

    const currentSectionElement = containerRef.current?.children[currentSectionIndex] as HTMLElement;
    if (!currentSectionElement) return;

    const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
    const deltaY = event.deltaY;

    // Define a small buffer for detecting scroll edges
    const scrollEdgeBuffer = 5; // Pixels from the edge to consider "at the edge"

    // Check if the current section has vertical scrollable content
    const canScrollVertically = scrollHeight > clientHeight + scrollEdgeBuffer;

    let shouldTransitionHorizontally = false;
    let targetSectionIndex = currentSectionIndex;

    if (deltaY > 0) { // Scrolling down
      if (canScrollVertically && scrollTop + clientHeight < scrollHeight - scrollEdgeBuffer) {
        // Still content to scroll down vertically, allow default scroll
        return;
      }
      // If we are here, it means we are at the bottom or cannot scroll vertically.
      // Attempt horizontal transition if possible.
      if (currentSectionIndex < sections.length - 1) {
        shouldTransitionHorizontally = true;
        targetSectionIndex = currentSectionIndex + 1;
      }
    } else if (deltaY < 0) { // Scrolling up
      if (canScrollVertically && scrollTop > scrollEdgeBuffer) {
        // Still content to scroll up vertically, allow default scroll
        return;
      }
      // If we are here, it means we are at the top or cannot scroll vertically.
      // Attempt horizontal transition if possible.
      if (currentSectionIndex > 0) {
        shouldTransitionHorizontally = true;
        targetSectionIndex = currentSectionIndex - 1;
      }
    }

    if (shouldTransitionHorizontally) {
      event.preventDefault(); // Prevent default vertical scroll ONLY if a horizontal transition is intended

      // Transition immediately (removed delay logic)
      if (!isTransitioningRef.current) {
        isTransitioningRef.current = true;
        scrollToSection(targetSectionIndex);
        setTimeout(() => {
          isTransitioningRef.current = false;
        }, 700); // Match CSS transition duration
      }
    }
    // If shouldTransitionHorizontally is false, we do NOT call event.preventDefault(),
    // allowing the browser to handle the natural vertical scroll.
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