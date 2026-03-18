"use client";

import { useEffect, useMemo, useState } from "react";

export type HeroClip = {
  src: string;
  poster: string;
  label: string;
};

type HeroReelProps = {
  clips: HeroClip[];
  intervalMs?: number;
};

export function HeroReel({ clips, intervalMs = 7000 }: HeroReelProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const updateReduce = (): void => setReducedMotion(reduceQuery.matches);
    const updateMobile = (): void => setMobile(mobileQuery.matches);

    updateReduce();
    updateMobile();

    reduceQuery.addEventListener("change", updateReduce);
    mobileQuery.addEventListener("change", updateMobile);

    return () => {
      reduceQuery.removeEventListener("change", updateReduce);
      mobileQuery.removeEventListener("change", updateMobile);
    };
  }, []);

  const reelEnabled = useMemo(() => clips.length > 1 && !reducedMotion && !mobile, [clips.length, reducedMotion, mobile]);

  useEffect(() => {
    if (!reelEnabled || paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % clips.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [clips.length, intervalMs, paused, reelEnabled]);

  const active = clips[index] ?? clips[0];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {reelEnabled ? (
        clips.map((clip, clipIndex) => (
          <video
            key={clip.src}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out"
            style={{ opacity: clipIndex === index ? 1 : 0 }}
            autoPlay={clipIndex === index && !paused}
            muted
            playsInline
            preload={clipIndex <= 1 ? "auto" : "metadata"}
            loop
            poster={clip.poster}
          >
            <source src={clip.src} type="video/mp4" />
          </video>
        ))
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${active.poster})` }}
          aria-hidden="true"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_560px_at_20%_12%,rgba(109,40,217,0.22),transparent_58%),radial-gradient(760px_460px_at_80%_72%,rgba(242,179,95,0.16),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.46)_46%,rgba(251,250,255,0.72)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_34%,rgba(11,16,32,0.22)_100%)]" />

      {reelEnabled ? (
        <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="m-btn-glass min-h-0 px-3 py-2 text-[10px]"
          >
            {paused ? "Play" : "Pause"}
          </button>
          <button
            type="button"
            onClick={() => setIndex((value) => (value + 1) % clips.length)}
            className="m-btn-glass min-h-0 px-3 py-2 text-[10px]"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
