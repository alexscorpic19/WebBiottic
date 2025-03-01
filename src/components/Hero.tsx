import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Image } from './Image';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const VIDEO_DURATION = 30000; // 30 segundos
const IMAGE_DURATION = 5000;  // 5 segundos

interface Slide {
  type: 'image' | 'video';
  image?: string;  // Make image optional since video slides won't need it
  videoId?: string; // Add videoId property
  title: string;
  description: string;
}

interface State {
  currentSlide: number;
  isPlaying: boolean;
  isMuted: boolean;
  error: string | null;
}

export function Hero() {
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

  const [state, setState] = useState<State>({
    currentSlide: 0,
    isPlaying: true,
    isMuted: true,
    error: null,
  });

  const { currentSlide, isPlaying, isMuted, error } = state;

  const setCurrentSlide = (value: number | ((prev: number) => number)) => {
    setState(prev => ({
      ...prev,
      currentSlide: typeof value === 'function' ? value(prev.currentSlide) : value,
    }));
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

  const playerRef = React.useRef<any>(null);
  const slideInterval = React.useRef<NodeJS.Timeout | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Requerido mínimo de distancia entre touchStart y touchEnd para considerar un swipe
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  }, [touchStart, touchEnd, minSwipeDistance]);

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
      console.error('Error resetting video:', err);
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
  //     console.error('Error in handleSlideClick:', err);
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
              videoId: slides[0].videoId,
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
                onStateChange: (event: any) => {
                  if (!playerRef.current) return;
                  setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
                  if (event.data === window.YT.PlayerState.ENDED) {
                    resetVideo();
                  }
                },
                onError: (event: any) => {
                  if (![101, 150].includes(event.data) && 
                      !event.data?.toString().includes('postMessage')) {
                    setError('Error al cargar el video');
                    console.error('YouTube player error:', event.data);
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
        console.error('Error in slide change:', err);
      }
    } else {
      // Para slides que no son video
      if (playerRef.current) {
        try {
          playerRef.current.pauseVideo();
        } catch (err) {
          console.error('Error pausing video:', err);
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
      console.error('Error cleaning up YouTube player:', err);
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
          videoId: slides[0].videoId,
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
            onStateChange: (event: any) => {
              if (!playerRef.current) return;
              setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
              if (event.data === window.YT.PlayerState.ENDED) {
                resetVideo();
              }
            },
            onError: (event: any) => {
              // Ignore ad-related errors (101, 150) and postMessage errors
              if (![101, 150].includes(event.data) && 
                  !event.data?.toString().includes('postMessage')) {
                setError('Error al cargar el video');
                console.error('YouTube player error:', event.data);
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
      console.error('Error initializing YouTube player:', err);
    }

    return () => {
      console.error = originalError;
    };
  }, []);

  const nextSlide = () => {
    try {
      if (slideInterval.current) {
        clearTimeout(slideInterval.current);
      }
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } catch (err) {
      setError('Error al cambiar al siguiente slide');
      console.error('Error in nextSlide:', err);
    }
  };

  const prevSlide = () => {
    try {
      if (slideInterval.current) {
        clearTimeout(slideInterval.current);
      }
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    } catch (err) {
      setError('Error al cambiar al slide anterior');
      console.error('Error in prevSlide:', err);
    }
  };

  const togglePlay = () => {
    try {
      if (playerRef.current) {
        if (isPlaying) {
          playerRef.current.pauseVideo();
        } else {
          playerRef.current.playVideo();
        }
        setIsPlaying(!isPlaying);
      }
    } catch (err) {
      setError('Error al reproducir/pausar el video');
      console.error('Error toggling play:', err);
    }
  };

  const toggleMute = () => {
    try {
      if (playerRef.current) {
        if (isMuted) {
          playerRef.current.unMute();
          playerRef.current.setVolume(100);
        } else {
          playerRef.current.mute();
        }
        setIsMuted(!isMuted);
      }
    } catch (err) {
      setError('Error al cambiar el estado del audio');
      console.error('Error toggling mute:', err);
    }
  };

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
      className="relative h-[60vh] md:h-[80vh] lg:h-[90vh] overflow-hidden"
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
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={slides[currentSlide].image as string}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )}
      </div>

      <div className="absolute z-10 inset-0 flex items-center justify-between p-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            e.preventDefault();
            prevSlide();
          }}
          className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors active:bg-black/60 touch-manipulation"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        {currentSlide === 0 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                togglePlay();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                e.preventDefault();
                togglePlay();
              }}
              className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors active:bg-black/60 touch-manipulation"
              aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleMute();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleMute();
              }}
              className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors active:bg-black/60 touch-manipulation"
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>
        )}
        
        <button
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            e.preventDefault();
            nextSlide();
          }}
          className="p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors active:bg-black/60 touch-manipulation"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 lg:p-12">
        <div className="text-center text-white z-10 max-w-4xl">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-sm md:text-base lg:text-lg">
            {slides[currentSlide].description}
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => {
              try {
                if (slideInterval.current) {
                  clearTimeout(slideInterval.current);
                }
                setCurrentSlide(index);
              } catch (err) {
                setError('Error al cambiar de slide');
                console.error('Error in slide navigation:', err);
              }
            }}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
