import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function Image({ src, alt, className = '' }: ImageProps) {
  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover ${className}`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/placeholder.jpg';
        }}
      />
    </div>
  );
}