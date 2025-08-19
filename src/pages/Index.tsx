"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import AppCardGrid from "@/components/AppCardGrid";
import CommonNinjaBlogWidget from "@/components/CommonNinjaBlogWidget";
import ContactSection from "@/components/ContactSection"; // New component for footer content
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const sections = [
  { id: "hero", component: HeroSection },
  { id: "projects", component: AppCardGrid },
  { id: "blog", component: CommonNinjaBlogWidget },
  { id: "contact", component: ContactSection }, // New section for contact/footer
];

const Index = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isThrottled = useRef(false);

  const scrollToSection = useCallback((index: number) => {
    if (containerRef.current) {
      const newTransform = `translateX(-${index * 100}vw)`;
      containerRef.current.style.transform = newTransform;
      setCurrentSectionIndex(index);
    }
  }, []);

  const handleScroll = useCallback((event: WheelEvent) => {
    if (isThrottled.current) return;

    const currentSectionElement = containerRef.current?.children[currentSectionIndex] as HTMLElement;
    if (!currentSectionElement) return;

    const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;
    const deltaY = event.deltaY;

    let newIndex = currentSectionIndex;
    let shouldPreventDefault = false;

    if (deltaY > 0) { // Scrolling down
      if (scrollTop + clientHeight >= scrollHeight) {
        // At the bottom of the current section, transition to next horizontal section
        newIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
        shouldPreventDefault = true;
      } else {
        // Not at the bottom, allow internal vertical scroll
        shouldPreventDefault = false;
      }
    } else if (deltaY < 0) { // Scrolling up
      if (scrollTop === 0) {
        // At the top of the current section, transition to previous horizontal section
        newIndex = Math.max(0, currentSectionIndex - 1);
        shouldPreventDefault = true;
      } else {
        // Not at the top, allow internal vertical scroll
        shouldPreventDefault = false;
      }
    }

    if (shouldPreventDefault) {
      event.preventDefault(); // Only prevent default if we are transitioning horizontally
    }

    if (newIndex !== currentSectionIndex) {
      scrollToSection(newIndex);
      isThrottled.current = true;
      setTimeout(() => {
        isThrottled.current = false;
      }, 800); // Throttle for 800ms to prevent rapid scrolling
    }
  }, [currentSectionIndex, scrollToSection]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isThrottled.current) return;

    let newIndex = currentSectionIndex;
    if (event.key === "ArrowDown" || event.key === "PageDown") {
      newIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
    } else if (event.key === "ArrowUp" || event.key === "PageUp") {
      newIndex = Math.max(0, currentSectionIndex - 1);
    }

    if (newIndex !== currentSectionIndex) {
      scrollToSection(newIndex);
      isThrottled.current = true;
      setTimeout(() => {
        isThrottled.current = false;
      }, 800);
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
            {React.createElement(section.component)}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 right-8 flex flex-col space-y-2 z-50">
        {currentSectionIndex < sections.length - 1 && (
          <Button
            onClick={() => scrollToSection(currentSectionIndex + 1)}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            aria-label="Scroll Down"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        )}
        {currentSectionIndex > 0 && (
          <Button
            onClick={() => scrollToSection(currentSectionIndex - 1)}
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            aria-label="Scroll Up"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;