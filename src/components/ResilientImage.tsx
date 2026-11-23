import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EEEEEA] via-[#E5E5DF] to-[#DCDCD5] text-[#55555C] p-6 text-center ${className}`}
      >
        <Sparkles className="w-5 h-5 mb-2 text-[#6B1D2F]" aria-hidden="true" />
        <span className="font-serif text-lg tracking-wide text-[#141416]">
          {fallbackLabel || 'Femelia Beauty Lounge'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
