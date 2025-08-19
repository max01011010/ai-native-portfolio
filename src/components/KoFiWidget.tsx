"use client";

import React, { useEffect } from "react";

const KoFiWidget: React.FC = () => {
  useEffect(() => {
    const scriptId = "ko-fi-overlay-widget-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.src = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";
      script.id = scriptId;
      script.async = true; // Make sure the script loads asynchronously
      document.body.appendChild(script);

      script.onload = () => {
        // Ensure kofiWidgetOverlay is available before drawing
        if (window.kofiWidgetOverlay) {
          window.kofiWidgetOverlay.draw('maxabardo', {
            'type': 'floating-chat',
            'floating-chat.donateButton.text': 'Support me',
            'floating-chat.donateButton.background-color': '#794bc4',
            'floating-chat.donateButton.text-color': '#fff'
          });
        }
      };
    } else {
      // If script already exists (e.g., during hot reload), redraw the widget
      if (window.kofiWidgetOverlay) {
        window.kofiWidgetOverlay.draw('maxabardo', {
          'type': 'floating-chat',
          'floating-chat.donateButton.text': 'Support me',
          'floating-chat.donateButton.background-color': '#794bc4',
          'floating-chat.donateButton.text-color': '#fff'
        });
      }
    }

    return () => {
      // Optional: Clean up the widget if the component unmounts
      // For floating widgets, this might not be strictly necessary as they often persist
      // but it's good practice for dynamic script loading.
      // The Ko-fi widget doesn't provide a direct 'destroy' method,
      // so we'll just remove the script if it was added by this component.
      if (script && script.parentNode) {
        // script.parentNode.removeChild(script); // Uncomment if you want to remove the script on unmount
      }
    };
  }, []);

  return null; // This component doesn't render any visible elements itself
};

export default KoFiWidget;