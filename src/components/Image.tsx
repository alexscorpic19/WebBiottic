
import { memo } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export const Image = memo(function Image({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy' 
}: ImageProps) {
  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`w-full h-full object-cover ${className}`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/placeholder.jpg';
        }}
        decoding="async"
      />
    </div>
  );
}
)

