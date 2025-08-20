"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import AppCardGrid, { AppCardGridRef } from "@/components/AppCardGrid";
import RssAppBlogWidget from "@/components/RssAppBlogWidget";
import ContactSection from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile"; // Import useIsMobile

type SectionComponent = React.ComponentType<any> & {
  ref?: React.Ref<any>;
};

const sections: { id: string; component: SectionComponent }[] = [
  { id: "hero", component: HeroSection },
  { id: "projects", component: AppCardGrid },
  { id: "blog", component: RssAppBlogWidget },
  { id: "contact", component: ContactSection },
];

const Index = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const appCardGridRef = useRef<AppCardGridRef>(null);
  const blogSectionRef = useRef<HTMLElement>(null);
  const isThrottled = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile(); // Determine if on mobile

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Ref to hold the latest currentSectionIndex for stable callbacks
  const currentSectionIndexRef = useRef(currentSectionIndex);
  useEffect(() => {
    currentSectionIndexRef.current = currentSectionIndex;
  }, [currentSectionIndex]);

  const scrollToSection = useCallback((index: number) => {
    if (containerRef.current) {
      const newTransform = `translateX(-${index * 100}vw)`;
      containerRef.current.style.transform = newTransform;
      setCurrentSectionIndex(index);
      // Use navigate to update the URL hash, ensuring React Router tracks it
      navigate(`#${sections[index].id}`, { replace: true });
    }
  }, [navigate]);

  // Effect to synchronize currentSectionIndex with URL hash
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    const sectionIndex = sections.findIndex(section => section.id === hash);

    if (hash && sectionIndex !== -1 && sectionIndex !== currentSectionIndexRef.current) {
      // Only update if hash exists, section is found, and it's different from current state
      scrollToSection(sectionIndex);
    } else if (!hash && currentSectionIndexRef.current !== 0) {
      // If hash is empty (e.g., navigating to base URL), go to hero section
      scrollToSection(0);
    }
  }, [location.hash, scrollToSection]);

  const handleScroll = useCallback((event: WheelEvent) => {
    if (isThrottled.current) return;

    const latestIndex = currentSectionIndexRef.current;
    const currentSectionId = sections[latestIndex].id;
    let newIndex = latestIndex;
    let shouldPreventDefault = false;

    if (currentSectionId === "projects" && appCardGridRef.current) {
      const carouselApi = appCardGridRef.current.getEmblaApi();
      if (carouselApi) {
        if (event.deltaY > 0) { // Scrolling down
          if (carouselApi.canScrollNext()) {
            carouselApi.scrollNext();
            shouldPreventDefault = true;
          } else {
            newIndex = Math.min(sections.length - 1, latestIndex + 1);
            shouldPreventDefault = true;
          }
        } else if (event.deltaY < 0) { // Scrolling up
          if (carouselApi.canScrollPrev()) {
            carouselApi.scrollPrev();
            shouldPreventDefault = true;
          } else {
            newIndex = Math.max(0, latestIndex - 1);
            shouldPreventDefault = true;
          }
        }
      }
    } else if (currentSectionId === "blog" && blogSectionRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = blogSectionRef.current;
      if (event.deltaY > 0) { // Scrolling down
        if (scrollTop + clientHeight >= scrollHeight) {
          newIndex = Math.min(sections.length - 1, latestIndex + 1);
          shouldPreventDefault = true;
        } else {
          shouldPreventDefault = false; // Allow internal scroll
        }
      } else if (event.deltaY < 0) { // Scrolling up
        if (scrollTop === 0) {
          newIndex = Math.max(0, latestIndex - 1);
          shouldPreventDefault = true;
        } else {
          shouldPreventDefault = false; // Allow internal scroll
        }
      }
    } else {
      // Standard vertical scroll handling for other sections (Hero, Contact)
      const currentSectionElement = containerRef.current?.children[latestIndex] as HTMLElement;
      if (!currentSectionElement) return;

      const { scrollTop, scrollHeight, clientHeight } = currentSectionElement;

      if (event.deltaY > 0) { // Scrolling down
        if (scrollTop + clientHeight >= scrollHeight) {
          newIndex = Math.min(sections.length - 1, latestIndex + 1);
          shouldPreventDefault = true;
        } else {
          shouldPreventDefault = false;
        }
      } else if (event.deltaY < 0) { // Scrolling up
        if (scrollTop === 0) {
          newIndex = Math.max(0, latestIndex - 1);
          shouldPreventDefault = true;
        } else {
          shouldPreventDefault = false;
        }
      }
    }

    if (shouldPreventDefault) {
      event.preventDefault();
    }

    if (newIndex !== latestIndex) {
      scrollToSection(newIndex);
      isThrottled.current = true;
      setTimeout(() => {
        isThrottled.current = false;
      }, 800); // Throttle for 800ms to prevent rapid scrolling
    }
  }, [scrollToSection]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isThrottled.current) return;

    const latestIndex = currentSectionIndexRef.current;
    let newIndex = latestIndex;
    let handled = false;
    const currentSectionId = sections[latestIndex].id;

    if (currentSectionId === "projects" && appCardGridRef.current) {
      const carouselApi = appCardGridRef.current.getEmblaApi();
      if (carouselApi) {
        if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "PageDown") {
          if (carouselApi.canScrollNext()) {
            carouselApi.scrollNext();
            handled = true;
          } else {
            newIndex = Math.min(sections.length - 1, latestIndex + 1);
            handled = true;
          }
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "PageUp") {
          if (carouselApi.canScrollPrev()) {
            carouselApi.scrollPrev();
            handled = true;
          } else {
            newIndex = Math.max(0, latestIndex - 1);
            handled = true;
          }
        }
      }
    } else if (currentSectionId === "blog" && blogSectionRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = blogSectionRef.current;
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        if (scrollTop + clientHeight >= scrollHeight) {
          newIndex = Math.min(sections.length - 1, latestIndex + 1);
          handled = true;
        } else {
          // Allow internal scroll
        }
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        if (scrollTop === 0) {
          newIndex = Math.max(0, latestIndex - 1);
          handled = true;
        } else {
          // Allow internal scroll
        }
      }
    } else {
      // Standard section transition for other sections
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        newIndex = Math.min(sections.length - 1, latestIndex + 1);
        handled = true;
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        newIndex = Math.max(0, latestIndex - 1);
        handled = true;
      }
    }

    if (handled) {
      event.preventDefault();
      if (newIndex !== latestIndex) {
        scrollToSection(newIndex);
      }
      isThrottled.current = true;
      setTimeout(() => {
        isThrottled.current = false;
      }, 800);
    }
  }, [scrollToSection]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX; // Initialize touchEndX
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX; // Update touchEndX as finger moves
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (isThrottled.current) return;

    const swipeThreshold = 50; // Minimum swipe distance to trigger navigation
    const deltaX = touchEndX.current - touchStartX.current;

    if (Math.abs(deltaX) > swipeThreshold) {
      const latestIndex = currentSectionIndexRef.current;
      let newIndex = latestIndex;
      let shouldNavigate = false;

      if (deltaX < 0) { // Swiped left (move to next section)
        if (latestIndex < sections.length - 1) {
          newIndex = latestIndex + 1;
          shouldNavigate = true;
        }
      } else { // Swiped right (move to previous section)
        if (latestIndex > 0) {
          newIndex = latestIndex - 1;
          shouldNavigate = true;
        }
      }

      if (shouldNavigate && newIndex !== latestIndex) {
        scrollToSection(newIndex);
        isThrottled.current = true;
        setTimeout(() => {
          isThrottled.current = false;
        }, 800); // Throttle for 800ms
      }
    }
    // Reset touch coordinates for the next swipe
    touchStartX.current = 0;
    touchEndX.current = 0;
  }, [scrollToSection]);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    const containerElement = containerRef.current;
    if (isMobile && containerElement) {
      containerElement.addEventListener("touchstart", handleTouchStart);
      containerElement.addEventListener("touchmove", handleTouchMove);
      containerElement.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      if (isMobile && containerElement) {
        containerElement.removeEventListener("touchstart", handleTouchStart);
        containerElement.removeEventListener("touchmove", handleTouchMove);
        containerElement.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [handleScroll, handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd, isMobile]);

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
      <div className="absolute bottom-4 right-8 flex flex-row space-x-2 z-50">
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