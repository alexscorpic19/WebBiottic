import React, { useState, useCallback, useEffect, memo, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Image } from './Image';
import { YouTubePlayerRef, YouTubeEvent } from '../types/youtube';
import Logger from '../utils/logger';

const VIDEO_DURATION = 30000; // 30 segundos
const IMAGE_DURATION = 5000;  // 5 segundos

interface BaseSlide {
  title: string;
  description: string;
}

interface VideoSlide extends BaseSlide {
  type: 'video';
  videoId: string;
  image?: never;
}

interface ImageSlide extends BaseSlide {
  type: 'image';
  image: string;
  videoId?: never;
}

type Slide = VideoSlide | ImageSlide;

interface State {
  currentSlide: number;
  isPlaying: boolean;
  isMuted: boolean;
  error: string | null;
}

// Remove unused interfaces and functions
// Removed: VideoError, PlayerEvent, handleError

// Mover la lógica de supresión de errores a un hook personalizado
const useSuppressAdBlockerErrors = () => {
  useEffect(() => {
    const originalError = console.error;
    const suppressedErrors = [
      'ERR_BLOCKED_BY_CLIENT',
      'doubleclick',
      'googleads',
      'postMessage'
    ];

    console.error = (...args: unknown[]) => {
      const firstArg = args[0];
      if (typeof firstArg === 'string') {
        if (suppressedErrors.some(err => firstArg.includes(err))) return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);
};

// Mover el componente Controls fuera del componente Hero
const Controls = memo(({ 
  isPlaying, 
  isMuted, 
  onPlayPause, 
  onMuteToggle 
}: {
  isPlaying: boolean;
  isMuted: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
}) => {
  const handlePlayPause = useCallback(() => {
    onPlayPause();
  }, [onPlayPause]);

  const handleMuteToggle = useCallback(() => {
    onMuteToggle();
  }, [onMuteToggle]);

  return (
    <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
      <button
        onClick={handlePlayPause}
        className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
        aria-label={isPlaying ? "Pausar" : "Reproducir"}
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </button>
      <button
        onClick={handleMuteToggle}
        className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>
    </div>
  );
});

Controls.displayName = 'Controls';

export function Hero() {
  useSuppressAdBlockerErrors();
  const slides: Slide[] = [
    {
      type: 'video',
      videoId: '2aogxVYGX_I',
      title: "Nuestra Tecnología en Acción",
      description: "Vea cómo nuestras soluciones transforman la agricultura moderna"
    },
    {
      type: 'image',
      image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=2000",
      title: "Sistemas de Control Automatizados",
      description: "Optimice sus operaciones agrícolas con nuestra tecnología de punta"
    },
    {
      type: 'image',
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=2000",
      title: "Riego Inteligente",
      description: "Maximice la eficiencia del agua con nuestros sistemas de riego inteligente"
    },
    {
      type: 'image',
      image: "https://images.unsplash.com/photo-1585504198199-20277593b94f?auto=format&fit=crop&w=2000",
      title: "Monitoreo en Tiempo Real",
      description: "Tome decisiones informadas con datos en tiempo real de sus cultivos"
    }
  ];

  // State declarations with proper destructuring
  const [{ currentSlide, isPlaying, isMuted, error }, setState] = useState<State>({
    currentSlide: 0,
    isPlaying: true,
    isMuted: true,
    error: null,
  });

  // Individual state setters
  const setCurrentSlide = (value: number | ((prev: number) => number)) => {
    setState(prev => ({ ...prev, currentSlide: typeof value === 'function' ? value(prev.currentSlide) : value }));
  };

  const setIsPlaying = (value: boolean) => {
    setState(prev => ({ ...prev, isPlaying: value }));
  };

  const setIsMuted = (value: boolean) => {
    setState(prev => ({ ...prev, isMuted: value }));
  };

  const setError = (value: string | null) => {
    setState(prev => ({ ...prev, error: value }));
  };

  // Refs
  const playerRef = useRef<YouTubePlayerRef | null>(null);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const minSwipeDistance = 50;

  // Function type declarations
  type SlideFunction = () => void;
  const nextSlide: SlideFunction = useCallback(() => {
    try {
      if (slideInterval.current) {
        clearTimeout(slideInterval.current);
      }
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } catch (err) {
      setError('Error al cambiar al siguiente slide');
      Logger.error('Error in nextSlide:', err);
    }
  }, [slides.length]);

  const prevSlide: SlideFunction = useCallback(() => {
    try {
      if (slideInterval.current) {
        clearTimeout(slideInterval.current);
      }
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    } catch (err) {
      setError('Error al cambiar al slide anterior');
      Logger.error('Error in prevSlide:', err);
    }
  }, [slides.length]);

  // Touch handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return;
    
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  }, [nextSlide, prevSlide]);

  const resetVideo = () => {
    try {
      if (playerRef.current?.getPlayerState !== undefined) {
        playerRef.current.seekTo(0);
        playerRef.current.playVideo();
        setIsPlaying(true);
        if (isMuted) {
          playerRef.current.mute();
        } else {
          playerRef.current.unMute();
          playerRef.current.setVolume(100);
        }
      }
    } catch (err) {
      setError('Error al reiniciar el video');
      Logger.error('Error resetting video:', err);
    }
  };

  // const handleSlideClick = (index: number) => {
  //   try {
  //     if (slideInterval.current) {
  //       clearTimeout(slideInterval.current);
  //     }
  //     setCurrentSlide(index);
  //   } catch (err) {
  //     setError('Error al cambiar de slide');
  //     Logger.error('Error in handleSlideClick:', err);
  //   }
  // };

  useEffect(() => {
    if (slideInterval.current) {
      clearTimeout(slideInterval.current);
    }

    // Si estamos en el slide del video (índice 0)
    if (currentSlide === 0) {
      try {
        // Limpiar el player existente
        cleanupPlayer();
        
        const initializePlayer = () => {
          // Verificar si la API de YouTube está disponible
          if (typeof window.YT === 'undefined' || !window.YT.Player) {
            // Si la API no está disponible, esperar 100ms y reintentar
            setTimeout(initializePlayer, 100);
            return;
          }

          const origin = window.location.origin;
          
          // Crear nuevo contenedor para el player
          const playerContainer = document.createElement('div');
          playerContainer.id = 'youtube-player';
          const youtubeContainer = document.getElementById('youtube-container');
          if (youtubeContainer) {
            youtubeContainer.innerHTML = ''; // Limpiar contenedor existente
            youtubeContainer.appendChild(playerContainer);

            playerRef.current = new window.YT.Player('youtube-player', {
              videoId: slides[0].videoId || '',
              playerVars: {
                autoplay: 1,
                mute: isMuted ? 1 : 0,
                controls: 0,
                rel: 0,
                playsinline: 1,
                start: 0,
                enablejsapi: 1,
                origin: origin,
                host: 'https://www.youtube-nocookie.com',
                modestbranding: 1,
                showinfo: 0,
                iv_load_policy: 3,
                widget_referrer: origin
              },
              height: '100%',
              width: '100%',
              events: {
                onReady: (event: any) => {
                  event.target.playVideo();
                  if (isMuted) {
                    event.target.mute();
                  } else {
                    event.target.unMute();
                    event.target.setVolume(100);
                  }
                  // Configurar el temporizador para el video
                  slideInterval.current = setTimeout(() => {
                    setCurrentSlide((prev) => (prev + 1) % slides.length);
                  }, VIDEO_DURATION);
                },
                onStateChange: (event: YouTubeEvent) => {
                  if (!playerRef.current) return;
                  setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
                  if (event.data === window.YT.PlayerState.ENDED) {
                    resetVideo();
                  }
                },
                onError: (event: YouTubeEvent) => {
                  if (![101, 150].includes(event.data) && 
                      !event.data?.toString().includes('postMessage')) {
                    setError('Error al cargar el video');
                    Logger.error('YouTube player error:', event.data);
                  }
                }
              },
            });
          }
        };

        // Intentar inicializar el player
        initializePlayer();
      } catch (err) {
        setError('Error al cambiar de slide');
        Logger.error('Error in slide change:', err);
      }
    } else {
      // Para slides que no son video
      if (playerRef.current) {
        try {
          playerRef.current.pauseVideo();
        } catch (err) {
          Logger.error('Error pausing video:', err);
        }
      }
      
      slideInterval.current = setTimeout(() => {
        setCurrentSlide((prev) => {
          // Si el siguiente slide sería el video (0), mantener el slide actual
          if ((prev + 1) % slides.length === 0) {
            return prev;
          }
          return (prev + 1) % slides.length;
        });
      }, IMAGE_DURATION);
    }

    return () => {
      if (slideInterval.current) {
        clearTimeout(slideInterval.current);
      }
    };
  }, [currentSlide, isMuted]);

  const cleanupPlayer = () => {
    try {
      if (playerRef.current) {
        // First destroy the player
        playerRef.current.destroy();
        playerRef.current = null;
        
        // Then safely remove the element if it exists
        const playerElement = document.getElementById('youtube-player');
        if (playerElement) {
          // Check if element is still in the DOM
          if (document.body.contains(playerElement)) {
            playerElement.remove();
          }
        }
      }
    } catch (err) {
      Logger.error('Error cleaning up YouTube player:', err);
    }
  };

  useEffect(() => {
    // Suppress ad-blocker related console errors
    const originalError = console.error;
    console.error = (...args) => {
      if (
        args[0]?.includes?.('ERR_BLOCKED_BY_CLIENT') ||
        args[0]?.includes?.('doubleclick') ||
        args[0]?.includes?.('googleads') ||
        args[0]?.includes?.('postMessage')
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    try {
      // Create a new div for the player
      const playerContainer = document.createElement('div');
      playerContainer.id = 'youtube-player';
      document.getElementById('youtube-container')?.appendChild(playerContainer);

      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        const origin = window.location.origin;
        
        playerRef.current = new window.YT.Player('youtube-player', {
          videoId: slides[0].videoId || '',
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            rel: 0,
            playsinline: 1,
            start: 0,
            enablejsapi: 1,
            origin: origin,
            host: 'https://www.youtube-nocookie.com',
            modestbranding: 1,
            showinfo: 0,
            iv_load_policy: 3,
            widget_referrer: origin
          },
          height: '100%',
          width: '100%',
          events: {
            onReady: (event: any) => {
              event.target.playVideo();
              event.target.mute();
            },
            onStateChange: (event: YouTubeEvent) => {
              if (!playerRef.current) return;
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
              if (event.data === window.YT.PlayerState.ENDED) {
                resetVideo();
              }
            },
            onError: (event: YouTubeEvent) => {
              // Ignore ad-related errors (101, 150) and postMessage errors
              if (![101, 150].includes(event.data) && 
                  !event.data?.toString().includes('postMessage')) {
                setError('Error al cargar el video');
                Logger.error('YouTube player error:', event.data);
              }
            }
          },
        });
      };

      return () => {
        cleanupPlayer();
      };
    } catch (err) {
      setError('Error al inicializar el reproductor de YouTube');
      Logger.error('Error initializing YouTube player:', err);
    }

    return () => {
      console.error = originalError;
    };
  }, []);

  const togglePlay = useCallback(() => {
    try {
      if (!playerRef.current) return;
      
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    } catch (err) {
      Logger.error('Error toggling play:', err);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    try {
      if (!playerRef.current) return;
      
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    } catch (err) {
      Logger.error('Error toggling mute:', err);
    }
  }, [isMuted]);

  if (error) {
    return (
      <div className="relative h-[60vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <section 
      className="relative h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden bg-white dark:bg-dark-900"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0">
        {slides[currentSlide].type === 'video' ? (
          <div className="relative w-full h-full">
            <div id="youtube-container" className="relative w-full h-full">
              {/* YouTube player will be inserted here */}
            </div>
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
            {currentSlide === 0 && (
              <Controls
                isPlaying={isPlaying}
                isMuted={isMuted}
                onPlayPause={togglePlay}
                onMuteToggle={toggleMute}
              />
            )}
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={slides[currentSlide].image as string}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
          </div>
        )}
      </div>

      <div className="absolute z-10 inset-0 flex items-center justify-between p-4">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 dark:hover:bg-black/70 transition-colors"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 dark:hover:bg-black/70 transition-colors"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 text-center text-white z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{slides[currentSlide].title}</h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">{slides[currentSlide].description}</p>
      </div>
    </section>
  );
}
