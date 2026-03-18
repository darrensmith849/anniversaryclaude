"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Full-bleed hero image with elegant gradient fallback.
 * When an image file is missing, the gradient takes over seamlessly.
 */
export function HeroImage({
  src,
  alt,
  fallbackGradient,
  priority = false,
}: {
  src: string;
  alt: string;
  fallbackGradient: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <>
      {/* Gradient fallback — always rendered behind image */}
      <div className="absolute inset-0" style={{ background: fallbackGradient }} />

      {/* Actual image — fades gracefully on load */}
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
          onError={() => setFailed(true)}
        />
      )}
    </>
  );
}
