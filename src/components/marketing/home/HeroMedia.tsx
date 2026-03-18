"use client";

import { useEffect, useState } from "react";

export type HeroMediaClip = {
  src: string;
  poster: string;
};

type HeroMediaProps = {
  clips: HeroMediaClip[];
  intervalMs?: number;
};

export function HeroMedia({ clips, intervalMs = 7000 }: HeroMediaProps) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const update = (): void => {
      setReducedMotion(reduceQuery.matches);
      setMobile(mobileQuery.matches);
    };

    update();
    reduceQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);

    return () => {
      reduceQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (clips.length <= 1 || reducedMotion || mobile) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % clips.length);
      setReady(false);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [clips.length, intervalMs, reducedMotion, mobile]);

  const active = clips[index] ?? clips[0];

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('" + active.poster + "')" }} />

      {!reducedMotion ? (
        <video
          key={active.src}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={active.poster}
          onCanPlay={() => setReady(true)}
        >
          <source src={active.src} type="video/mp4" />
        </video>
      ) : null}

      <div className="home-media-vignette absolute inset-0" />
    </div>
  );
}
