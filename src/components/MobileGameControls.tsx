"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowLeft, ArrowRight, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileGameControlsProps {
  onThrustStart: () => void;
  onThrustEnd: () => void;
  onRotateLeftStart: () => void;
  onRotateLeftEnd: () => void;
  onRotateRightStart: () => void;
  onRotateRightEnd: () => void;
  onShoot: () => void;
  isGameOver: boolean;
  onRestart: () => void;
  className?: string; // Add className prop
}

const MobileGameControls: React.FC<MobileGameControlsProps> = ({
  onThrustStart,
  onThrustEnd,
  onRotateLeftStart,
  onRotateLeftEnd,
  onRotateRightStart,
  onRotateRightEnd,
  onShoot,
  isGameOver,
  onRestart,
  className, // Destructure className
}) => {
  if (isGameOver) {
    return (
      <div className={cn("absolute left-1/2 -translate-x-1/2 z-30 flex flex-col items-center space-y-2", className)}>
        <Button
          onClick={onRestart}
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Restart Game
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("absolute left-4 right-4 z-30 flex justify-between items-end", className)}>
      {/* Left Controls (Rotation) */}
      <div className="flex flex-col space-y-2">
        <Button
          onTouchStart={onRotateLeftStart}
          onTouchEnd={onRotateLeftEnd}
          onMouseDown={onRotateLeftStart}
          onMouseUp={onRotateLeftEnd}
          onMouseLeave={onRotateLeftEnd} // Important for desktop mouse users
          className="p-4 rounded-full bg-gray-700/70 hover:bg-gray-600/70 text-white shadow-lg touch-manipulation"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          onTouchStart={onRotateRightStart}
          onTouchEnd={onRotateRightEnd}
          onMouseDown={onRotateRightStart}
          onMouseUp={onRotateRightEnd}
          onMouseLeave={onRotateRightEnd}
          className="p-4 rounded-full bg-gray-700/70 hover:bg-gray-600/70 text-white shadow-lg touch-manipulation"
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Right Controls (Thrust and Shoot) */}
      <div className="flex flex-col items-end space-y-2">
        <Button
          onTouchStart={onThrustStart}
          onTouchEnd={onThrustEnd}
          onMouseDown={onThrustStart}
          onMouseUp={onThrustEnd}
          onMouseLeave={onThrustEnd}
          className="p-4 rounded-full bg-gray-700/70 hover:bg-gray-600/70 text-white shadow-lg touch-manipulation"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
        <Button
          onTouchStart={onShoot}
          onMouseDown={onShoot}
          className="p-4 rounded-full bg-red-600/70 hover:bg-red-700/70 text-white shadow-lg touch-manipulation"
        >
          <Target className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default MobileGameControls;