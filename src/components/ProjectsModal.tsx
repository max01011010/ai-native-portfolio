"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

// Re-defining AppCardProps for self-containment in this component
interface AppCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  isComingSoon?: boolean;
}

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: AppCardProps[];
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen, onClose, projects }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>All Projects</DialogTitle>
          <DialogDescription>
            Click on any project below to view more details or launch the application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {projects.map((app) => (
            <Button
              key={app.id}
              variant="outline"
              className="flex flex-col items-start h-auto p-4 text-left transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => {
                if (!app.isComingSoon) {
                  window.open(app.link, "_blank");
                }
              }}
              disabled={app.isComingSoon}
            >
              <h3 className="text-lg font-semibold mb-1">{app.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">
                {app.description}
              </p>
              {!app.isComingSoon && (
                <span className="mt-2 text-blue-600 dark:text-blue-400 flex items-center text-xs">
                  View Project <ExternalLink className="ml-1 h-3 w-3" />
                </span>
              )}
              {app.isComingSoon && (
                <span className="mt-2 text-gray-500 dark:text-gray-500 text-xs">
                  Coming Soon!
                </span>
              )}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectsModal;