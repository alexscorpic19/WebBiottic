export interface YouTubePlayerRef {
  destroy(): void;
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  getPlayerState(): number;
  seekTo(seconds: number): void;
  setVolume(volume: number): void;
}

export interface YouTubeEvent {
  target: YouTubePlayerRef;
  data: number;
}

export interface YouTubePlayerConfig {
  videoId: string;
  playerVars?: {
    autoplay?: number;
    mute?: number;
    controls?: number;
    rel?: number;
    playsinline?: number;
    start?: number;
    enablejsapi?: number;
    origin?: string;
    host?: string;
    modestbranding?: number;
    showinfo?: number;
    iv_load_policy?: number;
    widget_referrer?: string;
  };
  events?: {
    onReady?: (event: YouTubeEvent) => void;
    onStateChange?: (event: YouTubeEvent) => void;
    onError?: (event: YouTubeEvent) => void;
  };
  height?: string | number;
  width?: string | number;
}

declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, config: YouTubePlayerConfig) => YouTubePlayerRef;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}