"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import AppCardGrid, { AppCardGridRef } from "@/components/AppCardGrid";
import CommonNinjaBlogWidget from "@/components/CommonNinjaBlogWidget"; // Import CommonNinjaBlogWidget
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
  const appCardGridRef = useRef<AppCardGridRef>(null);
  const blogSectionRef = useRef<HTMLElement>(null); // Ref for the blog section
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

    const currentSectionId = sections[currentSectionIndex].id;
    let newIndex = currentSectionIndex;
    let shouldPreventDefault = false;

    if (currentSectionId === "projects" && appCardGridRef.current) {
      const carouselApi = appCardGridRef.current.getEmblaApi();
      if (carouselApi) {
        if (event.deltaY > 0) { // Scrolling down
          if (carouselApi.canScrollNext()) {
            carouselApi.scrollNext();
            shouldPreventDefault = true;
          } else {
            newIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
            shouldPreventDefault = true;
          }
        } else if (event.deltaY < 0) { // Scrolling up
          if (carouselApi.canScrollPrev()) {
            carouselApi.scrollPrev();
            shouldPreventDefault = true;
          } else {
            newIndex = Math.max(0, currentSectionIndex - 1);
            shouldPreventDefault = true;
          }
        }
      }
    } else if (currentSectionId === "blog" && blogSectionRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = blogSectionRef.current;
      if (event.deltaY > 0) { // Scrolling down
        if (scrollTop + clientHeight >= scrollHeight) {
          newIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
          shouldPreventDefault = true;
        } else {
          shouldPreventDefault = false; // Allow internal scroll
        }
      } else if (event.deltaY < 0) { // Scrolling up
        if (scrollTop === 0) {
          newIndex = Math.max(0, currentSectionIndex - 1);
          shouldPreventDefault = true;
        } else {
          shouldPreventDefault = false; // Allow internal scroll
        }
      }
    } else {
      // Standard vertical scroll handling for other sections (Hero, Contact)
      const currentSectionElement = containerRef.current?.children[currentSectionIndex] as HTMLElement;
      if (!currentSectionElement) return;

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;

      if (event.deltaY > 0) { // Scrolling down
        if (scrollTop + clientHeight >= scrollHeight) {
          newIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
          shouldPreventDefault = true;
        } else {
          shouldPreventDefault = false;
        }
      } else if (event.deltaY < 0) { // Scrolling up
        if (scrollTop === 0) {
          newIndex = Math.max(0, currentSectionIndex - 1);
          shouldPreventDefault = true;
        } else {
          shouldPreventDefault = false;
        }
      }
    }

    if (shouldPreventDefault) {
      event.preventDefault();
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
    let handled = false;
    const currentSectionId = sections[currentSectionIndex].id;

    if (currentSectionId === "projects" && appCardGridRef.current) {
      const carouselApi = appCardGridRef.current.getEmblaApi();
      if (carouselApi) {
        if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "PageDown") {
          if (carouselApi.canScrollNext()) {
            carouselApi.scrollNext();
            handled = true;
          } else {
            newIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
            handled = true;
          }
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "PageUp") {
          if (carouselApi.canScrollPrev()) {
            carouselApi.scrollPrev();
            handled = true;
          } else {
            newIndex = Math.max(0, currentSectionIndex - 1);
            handled = true;
          }
        }
      }
    } else if (currentSectionId === "blog" && blogSectionRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = blogSectionRef.current;
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        if (scrollTop + clientHeight >= scrollHeight) {
          newIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
          handled = true;
        } else {
          // Allow internal scroll
        }
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        if (scrollTop === 0) {
          newIndex = Math.max(0, currentSectionIndex - 1);
          handled = true;
        } else {
          // Allow internal scroll
        }
      }
    } else {
      // Standard section transition for other sections
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        newIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
        handled = true;
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        newIndex = Math.max(0, currentSectionIndex - 1);
        handled = true;
      }
    }

    if (handled) {
      event.preventDefault();
      if (newIndex !== currentSectionIndex) {
        scrollToSection(newIndex);
      }
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
            className={`flex-shrink-0 w-screen h-screen ${section.id !== "projects" ? "overflow-y-auto" : ""}`}
          >
            {section.id === "projects" ? (
              <section.component ref={appCardGridRef} />
            ) : section.id === "blog" ? (
              <section.component ref={blogSectionRef} />
            ) : (
              <section.component />
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 right-24 flex flex-row space-x-2 z-50">
        {currentSectionIndex > 0 && (
          <Button
            onClick={() => scrollToSection(currentSectionIndex - 1)}
            className="p-2 rounded-full bg-[#794bc4] hover:bg-[#6a3ea8] text-white"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}
        {currentSectionIndex < sections.length - 1 && (
          <Button
            onClick={() => scrollToSection(currentSectionIndex + 1)}
            className="p-2 rounded-full bg-[#794bc4] hover:bg-[#6a3ea8] text-white"
            aria-label="Scroll Right"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;