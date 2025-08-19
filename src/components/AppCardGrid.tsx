"use client";

import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import type { UseEmblaCarouselType } from 'embla-carousel-react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ProjectsModal from "./ProjectsModal";
import { cn } from "@/lib/utils";
import ConstellationBackground from "./ConstellationBackground";

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
  getEmblaApi: () => UseEmblaCarouselType[1] | undefined;
}

const AppCardGrid = forwardRef<AppCardGridRef, {}>((props, ref) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    dragFree: true,
    containScroll: 'trimSnaps', // Keep this for snapping to ends
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useImperativeHandle(ref, () => ({
    getEmblaApi: () => emblaApi,
  }));

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="projects" className="relative py-12 bg-gray-50 dark:bg-gray-900 h-full flex flex-col justify-center overflow-hidden">
      {/* Gradient Overlay for smooth transition from Hero section */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-purple-800/50 to-transparent"></div>

      {/* Constellation Background for Projects Section */}
      <ConstellationBackground 
        particleColor="rgba(0, 0, 0, 0.6)"
        lineColor="rgba(0, 0, 0, "
        overlayColor="bg-white"
        overlayOpacity={0.2}
      />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100 opacity-0 animate-fade-in-up">My Projects</h2>
        <div className="text-center mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: `200ms` }}>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="px-6 py-3 rounded-full font-semibold shadow-lg">
                Load More Projects
              </Button>
            </DialogTrigger>
            <ProjectsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} projects={appData} />
          </Dialog>
        </div>
      </div>
      <div className="embla flex-grow overflow-hidden relative z-10">
        <div className="embla__viewport h-full px-8 md:px-16 lg:px-24" ref={emblaRef}> {/* Added responsive horizontal padding */}
          <div className="embla__container flex h-full items-center"> {/* Reverted to original, removed gap-x-6 */}
            {appData.map((app, index) => (
              <div key={app.id} className="embla__slide flex-shrink-0 w-full px-3 py-4"> {/* Reverted to original w-full px-3 */}
                <Card
                  className={cn(
                    "flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.02] aspect-[3/4] max-w-sm w-full mx-auto", // Added max-w-sm and mx-auto back to Card
                    index === selectedIndex
                      ? "bg-[#794bc4] text-white"
                      : "bg-white dark:bg-gray-950"
                  )}
                  style={{ animationDelay: `${index * 100 + 400}ms` }}
                >
                  {/* Image container with aspect ratio */}
                  <div className="relative w-full aspect-video rounded-t-md overflow-hidden">
                    <img src={app.imageUrl} alt={app.title} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className={cn(index === selectedIndex ? "text-white" : "text-gray-900 dark:text-gray-100")}>{app.title}</CardTitle>
                  </CardHeader>
                  <CardContent className={cn(index === selectedIndex ? "text-purple-100" : "text-gray-600 dark:text-gray-400", "flex-grow text-sm pb-2")}>
                    {app.description}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button asChild className={cn("w-full", index === selectedIndex ? "bg-white text-[#794bc4] hover:bg-gray-100" : "")} disabled={app.isComingSoon}>
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