import { useRef, useCallback, useEffect } from 'react';
import { YouTubePlayerRef } from '../types/youtube';

export function useYouTubePlayer(videoId: string, isMuted: boolean) {
  const playerRef = useRef<YouTubePlayerRef | null>(null);
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
      // eslint-disable-next-line no-console
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
