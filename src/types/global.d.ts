interface Window {
  kofiWidgetOverlay?: {
    draw: (username: string, options: object) => void;
  };
  CommonNinja?: {
    init?: () => void;
    refresh?: () => void;
  };
}