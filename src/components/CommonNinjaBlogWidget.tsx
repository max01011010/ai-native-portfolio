"use client";

import React, { useEffect } from "react";

const CommonNinjaBlogWidget: React.FC = () => {
  useEffect(() => {
    const scriptId = "commonninja-sdk";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initializeWidget = () => {
      // Check if CommonNinja global object exists and has an init/refresh method
      if (window.CommonNinja && typeof window.CommonNinja.init === 'function') {
        window.CommonNinja.init(); // Or CommonNinja.refresh() if init is only for first load
      } else if (window.CommonNinja && typeof window.CommonNinja.refresh === 'function') {
        window.CommonNinja.refresh();
      }
      // Fallback: if no specific init/refresh, assume it auto-detects the div
      // and simply ensure the div is present.
    };

    if (!script) {
      script = document.createElement("script");
      script.src = "https://cdn.commoninja.com/sdk/latest/commonninja.js";
      script.defer = true;
      script.id = scriptId;
      script.onload = initializeWidget; // Initialize once script is loaded
      document.body.appendChild(script);
    } else {
      // If script already exists (e.g., during hot reload or component re-mount),
      // try to initialize the widget immediately.
      initializeWidget();
    }

    // Add type definition for CommonNinja to window object
    declare global {
      interface Window {
        CommonNinja?: {
          init?: () => void;
          refresh?: () => void;
          // Add other methods if known
        };
      }
    }

  }, []); // Empty dependency array means it runs once on mount

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