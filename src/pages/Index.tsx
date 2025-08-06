"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import AppCardCarousel from "@/components/AppCardCarousel";
import CommonNinjaBlogWidget from "@/components/CommonNinjaBlogWidget"; // Import the new component

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-r from-blue-600 to-purple-700 text-white flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
            Hi, I'm a Hobbyist Dev
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-0 animate-fade-in-up animation-delay-200">
            Building cool stuff with AI and code. Explore my projects and latest thoughts.
          </p>
          <div className="flex justify-center space-x-4 opacity-0 animate-fade-in-up animation-delay-400">
            <a href="#projects" className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              View Projects
            </a>
            <a href="#blog" className="px-6 py-3 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors shadow-lg">
              Read Blog
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <div id="projects">
        <AppCardCarousel />
      </div>

      {/* Blog Section */}
      <div id="blog">
        <CommonNinjaBlogWidget /> {/* Use the new component here */}
      </div>

      <MadeWithDyad />
    </div>
  );
};

export default Index;