import { useRef, useCallback, useEffect } from 'react';

interface YouTubePlayer {
  destroy(): void;
  playVideo(): void;
  pauseVideo(): void;
  mute(): void;
  unMute(): void;
  getPlayerState(): number;
}

interface YouTubeEvent {
  target: YouTubePlayer;
  data: number;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
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
            onReady: (event: YouTubeEvent) => void;
            onStateChange: (event: YouTubeEvent) => void;
          };
          height?: string | number;
          width?: string | number;
        }
      ) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export function useYouTubePlayer(videoId: string, isMuted: boolean) {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const slideInterval = useRef<NodeJS.Timeout>();

  const cleanupPlayer = useCallback(() => {
    try {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
        
        const playerElement = document.getElementById('youtube-player');
        if (playerElement?.parentNode) {
          playerElement.parentNode.removeChild(playerElement);
        }
      }
    } catch (err) {
      console.error('Error cleaning up YouTube player:', err);
    }
  }, []);

  const initializePlayer = useCallback(() => {
    if (typeof window.YT === 'undefined' || !window.YT.Player) {
      setTimeout(initializePlayer, 100);
      return;
    }

    const origin = window.location.origin;
    
    playerRef.current = new window.YT.Player('youtube-player', {
      videoId,
      playerVars: {
        autoplay: 1,
        mute: isMuted ? 1 : 0,
        controls: 0,
        rel: 0,
        playsinline: 1,
        start: 0,
        enablejsapi: 1,
        origin,
        host: 'https://www.youtube-nocookie.com',
        modestbranding: 1,
        showinfo: 0,
        iv_load_policy: 3,
        widget_referrer: origin
      },
      height: '100%',
      width: '100%'
    });
  }, [videoId, isMuted]);

  useEffect(() => {
    const currentInterval = slideInterval.current;
    return () => {
      cleanupPlayer();
      if (currentInterval) {
        clearTimeout(currentInterval);
      }
    };
  }, [cleanupPlayer]);

  return {
    playerRef,
    initializePlayer,
    cleanupPlayer,
    slideInterval
  };
}
