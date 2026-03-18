"use client";

import { useEffect, useState } from "react";

type PhotoCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function PhotoCard({ children, className = "" }: PhotoCardProps) {
  const [transform, setTransform] = useState("translateY(0) rotateX(0deg) rotateY(0deg)");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (): void => setReducedMotion(mq.matches);

    update();
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>): void => {
    if (reducedMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (x - 0.5) * 2;
    const rotateX = (0.5 - y) * 2;

    setTransform(`translateY(-2px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`);
  };

  const reset = (): void => {
    setTransform("translateY(0) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <div
      className={`photo-card-interactive ${className}`}
      style={{ transform: reducedMotion ? "none" : transform }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </div>
  );
}
