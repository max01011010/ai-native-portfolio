"use client";

import React, { forwardRef, useImperativeHandle, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';

interface AppCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  isComingSoon?: boolean;
}

const appData: AppCardProps[] = [
  {
    id: "1",
    title: "Bit - AI Powered Habits",
    description: "An AI-powered habit tracker designed to help you build and maintain positive habits effortlessly.",
    imageUrl: "/Placeholder1Zoomed.png",
    link: "https://bits-eta.vercel.app/",
  },
  {
    id: "4",
    title: "JobRewrite",
    description: "AI powered tool to rewrite resume entries to be ATS-compliant and results-oriented.",
    imageUrl: "/JobRewrite.png",
    link: "https://jobrewrite.vercel.app/",
    isComingSoon: false,
  },
  {
    id: "2",
    title: "Shelter Connect",
    description: "A map showing real-time shelter availability. Launching in September!",
    imageUrl: "/mappreview.png",
    link: "#",
    isComingSoon: true,
  },
  {
    id: "3",
    title: "Practicum",
    description: "AI supported and adaptive language learning app. Under development.",
    imageUrl: "/placeholder.svg",
    link: "#",
    isComingSoon: true,
  },
];

// Define the interface for the ref exposed by AppCardGrid
export interface AppCardGridRef {
  getEmblaApi: () => EmblaCarouselType | undefined;
}

const AppCardGrid = forwardRef<AppCardGridRef, {}>((props, ref) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
  });

  // Expose the Embla API through the ref
  useImperativeHandle(ref, () => ({
    getEmblaApi: () => emblaApi,
  }));

  // Optional: Add some basic Embla event listeners if needed for internal component state
  useEffect(() => {
    if (!emblaApi) return;
    // For example, to log current slide:
    // emblaApi.on('select', () => console.log('Current slide:', emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section id="projects" className="py-12 bg-gray-50 dark:bg-gray-900 h-full flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100 opacity-0 animate-fade-in-up">My Projects</h2>
      </div>
      <div className="embla flex-grow overflow-hidden relative">
        <div className="embla__viewport h-full" ref={emblaRef}>
          <div className="embla__container flex h-full items-center">
            {appData.map((app, index) => (
              <div key={app.id} className="embla__slide flex-shrink-0 w-[80vw] sm:w-[45vw] lg:w-[30vw] xl:w-[22vw] px-3">
                <Card
                  className="flex flex-col h-[90%] opacity-0 animate-fade-in-up transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <CardHeader>
                    <img src={app.imageUrl} alt={app.title} className="w-full h-48 object-cover rounded-md mb-4" />
                    <CardTitle>{app.title}</CardTitle>
                    <CardDescription>{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow"></CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" disabled={app.isComingSoon}>
                      {app.isComingSoon ? (
                        <span>Coming Soon!</span>
                      ) : (
                        <a href={app.link} target="_blank" rel="noopener noreferrer">
                          View Project <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default AppCardGrid;