"use client";

import React, { useEffect, useRef } from "react";

const CommonNinjaBlogWidget: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    const scriptId = "commonninja-sdk";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initializeWidget = () => {
      if (window.CommonNinja) {
        // Give the DOM a moment to ensure the widget container is fully rendered and visible
        setTimeout(() => {
          if (window.CommonNinja && typeof window.CommonNinja.init === 'function') {
            window.CommonNinja.init();
          } else if (window.CommonNinja && typeof window.CommonNinja.refresh === 'function') {
            window.CommonNinja.refresh();
          }
        }, 100); // Small delay to ensure DOM is ready
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.src = "https://cdn.commoninja.com/sdk/latest/commonninja.js";
      script.defer = true;
      script.id = scriptId;
      script.onload = () => {
        scriptLoaded.current = true;
        if (isActive) { // Only initialize if this section is active
          initializeWidget();
        }
      };
      document.body.appendChild(script);
    } else {
      scriptLoaded.current = true; // Script is already in DOM
      if (isActive) { // If already active, try to initialize
        initializeWidget();
      }
    }

    // Add type definition for CommonNinja to window object
    declare global {
      interface Window {
        CommonNinja?: {
          init?: () => void;
          refresh?: () => void;
        };
      }
    }

  }, []); // Run once on mount to load script

  useEffect(() => {
    // This effect runs when isActive changes
    if (isActive && scriptLoaded.current) {
      // If this section becomes active and script is loaded, initialize
      const initializeWidget = () => {
        if (window.CommonNinja) {
          setTimeout(() => {
            if (window.CommonNinja && typeof window.CommonNinja.init === 'function') {
              window.CommonNinja.init();
            } else if (window.CommonNinja && typeof window.CommonNinja.refresh === 'function') {
              window.CommonNinja.refresh();
            }
          }, 100);
        }
      };
      initializeWidget();
    }
  }, [isActive]); // Re-run when isActive changes

  return (
    <section className="py-12 bg-white dark:bg-gray-800 opacity-0 animate-fade-in-up h-full overflow-y-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Latest Blog Posts</h2>
        <div className="commonninja_component pid-faa886a1-7198-4cd7-be01-d0344d766080"></div>
      </div>
    </section>
  );
};

export default CommonNinjaBlogWidget;