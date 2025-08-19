interface Window {
  kofiWidgetOverlay?: {
    draw: (username: string, options: object) => void;
  };
  // CommonNinja type removed as it's no longer used
}