"use client";

import React, { useEffect } from "react";

const CommonNinjaBlogWidget: React.FC = () => {
  useEffect(() => {
    const scriptId = "commonninja-sdk";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.src = "https://cdn.commoninja.com/sdk/latest/commonninja.js";
      script.defer = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-12 bg-white dark:bg-gray-800 opacity-0 animate-fade-in-up h-full overflow-y-auto"> {/* Added h-full and overflow-y-auto */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Latest Blog Posts</h2>
        <div className="commonninja_component pid-faa886a1-7198-4cd7-be01-d0344d766080"></div>
      </div>
    </section>
  );
};

export default CommonNinjaBlogWidget;