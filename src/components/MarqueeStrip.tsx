import gsap from 'gsap';
import {useEffect, useRef} from 'react';
import {usePrefersReducedMotion} from '../hooks/usePrefersReducedMotion';

interface MarqueeStripProps {
  text: string;
}

export function MarqueeStrip({text}: MarqueeStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!trackRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 24,
        ease: 'none',
      });
    }, trackRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const items = Array.from({length: 6}, (_, i) => i);

  if (prefersReducedMotion) {
    return (
      <div
        aria-label={text}
        className="w-full bg-[#C2412D] text-white border-y border-white/15 py-4 px-5 overflow-hidden"
      >
        <p className="font-display-condensed uppercase text-2xl sm:text-3xl tracking-wider text-center">
          {text}
        </p>
      </div>
    );
  }

  return (
    <div
      aria-label={text}
      className="w-full bg-[#C2412D] text-white border-y border-white/15 py-4 overflow-hidden select-none"
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div className="flex items-center shrink-0">
          {items.map((idx) => (
            <span
              key={`a-${idx}`}
              className="font-display-condensed uppercase text-2xl sm:text-4xl tracking-wider px-6 whitespace-nowrap"
            >
              {text}
            </span>
          ))}
        </div>
        <div aria-hidden="true" className="flex items-center shrink-0">
          {items.map((idx) => (
            <span
              key={`b-${idx}`}
              className="font-display-condensed uppercase text-2xl sm:text-4xl tracking-wider px-6 whitespace-nowrap"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
