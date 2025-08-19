interface Window {
  kofiWidgetOverlay?: {
    draw: (username: string, options: object) => void;
  };
}

declare namespace JSX {
  interface IntrinsicElements {
    'rssapp-wall': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}