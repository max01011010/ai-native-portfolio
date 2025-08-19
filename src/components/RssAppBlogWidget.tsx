"use client";

import React, { useEffect, forwardRef, Ref } from "react";
import ConstellationBackground from "./ConstellationBackground"; // Import the new component

interface RssAppBlogWidgetProps {
  // No specific props needed for now
}

const RssAppBlogWidget = forwardRef<HTMLElement, RssAppBlogWidgetProps>((props, ref) => {
  useEffect(() => {
    const scriptId = "rssapp-wall-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.src = "https://widget.rss.app/v1/wall.js";
      script.type = "text/javascript";
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }

    // If the script is already loaded, or once it loads,
    // the RSS.app widget should automatically render into the div.
    // No explicit initialization function is typically needed for RSS.app widgets.

    return () => {
      // Optional: Clean up the script if the component unmounts
      // For widgets that inject themselves globally, this might not be strictly necessary
      // but it's good practice for dynamic script loading.
      // if (script && script.parentNode) {
      //   script.parentNode.removeChild(script);
      // }
    };
  }, []);

  return (
    <section ref={ref} id="blog" className="relative py-12 bg-white dark:bg-gray-800 opacity-0 animate-fade-in-up h-full overflow-y-auto flex flex-col justify-center">
      {/* Constellation Background for Blog Section */}
      <ConstellationBackground
        particleColor="rgba(0, 0, 0, 0.6)" // Darker particles for light background
        lineColor="rgba(0, 0, 0, " // Darker lines
        overlayColor="bg-white" // White overlay
        overlayOpacity={0.2} // Subtle overlay
      />
      <div className="container mx-auto px-4 relative z-10"> {/* Ensure content is above background */}
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Latest Blog Posts</h2>
        <rssapp-wall id="BFGuOikO2XywaVsv"></rssapp-wall>
      </div>
    </section>
  );
});

export default RssAppBlogWidget;