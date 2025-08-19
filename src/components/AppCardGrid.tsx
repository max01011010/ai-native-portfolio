"use client";

import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import useEmblaCarousel, { EmblaCarouselType } from 'embla-carousel-react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog"; // Import Dialog and DialogTrigger
import ProjectsModal from "./ProjectsModal"; // Import the new ProjectsModal

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

export interface AppCardGridRef {
  getEmblaApi: () => EmblaCarouselType | undefined;
}

const AppCardGrid = forwardRef<AppCardGridRef, {}>((props, ref) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    dragFree: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    getEmblaApi: () => emblaApi,
  }));

  useEffect(() => {
    if (!emblaApi) return;
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
              <div key={app.id} className="embla__slide flex-shrink-0 w-[90vw] md:w-[70vw] lg:w-[50vw] px-3">
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
      <div className="text-center mt-8 opacity-0 animate-fade-in-up" style={{ animationDelay: `${appData.length * 100 + 200}ms` }}>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="px-6 py-3 rounded-full font-semibold shadow-lg">
              Load More Projects
            </Button>
          </DialogTrigger>
          <ProjectsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} projects={appData} />
        </Dialog>
      </div>
    </section>
  );
});

export default AppCardGrid;