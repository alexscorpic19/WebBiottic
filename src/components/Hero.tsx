import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function Hero() {
  const slides = [
    {
      type: 'video',
      videoId: '2aogxVYGX_I', // Asegúrate de que este sea tu ID de video
      title: "Nuestra Tecnología en Acción",
      description: "Vea cómo nuestras soluciones transforman la agricultura moderna"
    },
   
    // Agrega aquí más slides según necesites
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

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);
  const playerRef = React.useRef<any>(null);
  const slideInterval = React.useRef<NodeJS.Timeout | null>(null);

  // Función para reiniciar el video
  const resetVideo = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
      setIsPlaying(true);
      if (isMuted) {
        playerRef.current.mute();
      }
    }
  };

  // Efecto para manejar el cambio de slides
  useEffect(() => {
    if (slideInterval.current) {
      clearTimeout(slideInterval.current);
    }

    // Si el slide actual es el video, reiniciarlo
    if (currentSlide === 0 && playerRef.current) {
      resetVideo();
      
      // Configurar el temporizador de 30 segundos
      slideInterval.current = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 30000);
    }

    return () => {
      if (slideInterval.current) {
        clearTimeout(slideInterval.current);
      }
    };
  }, [currentSlide, isMuted]);

  // Inicialización del reproductor de YouTube
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: slides[0].videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          playsinline: 1,
          start: 0,
          enablejsapi: 1
        },
        height: '100%',
        width: '100%',
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
            event.target.mute();
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            if (event.data === window.YT.PlayerState.ENDED) {
              resetVideo();
            }
          },
        },
      });
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const nextSlide = () => {
    if (slideInterval.current) {
      clearTimeout(slideInterval.current);
    }
    const nextIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(nextIndex);
  };

  const prevSlide = () => {
    if (slideInterval.current) {
      clearTimeout(slideInterval.current);
    }
    const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(prevIndex);
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(100);
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'
          }`}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          {slide.type === 'video' ? (
            <div className="relative w-full h-full">
              <div id="youtube-player" className="absolute inset-0 w-full h-full" />
              {index === currentSlide && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-4">
                  <button
                    onClick={togglePlay}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white" />
                    )}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6 text-white" />
                    ) : (
                      <Volume2 className="w-6 h-6 text-white" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl">{slide.description}</p>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}