import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useEffect, useRef} from 'react';
import {usePrefersReducedMotion} from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface SplitRevealTextProps {
  paragraphs: readonly string[];
  className?: string;
  paragraphClassName?: string;
}

const KEYWORD_REGEX = /^(esfuerzo|lesi[oó]n(?:es)?|volv[ií]|champion)[.,;:!?]*$/i;

export function SplitRevealText({
  paragraphs,
  className = '',
  paragraphClassName = 'text-lg sm:text-xl lg:text-2xl leading-relaxed text-white',
}: SplitRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.split-word', containerRef.current);
      if (words.length > 0) {
        gsap.fromTo(
          words,
          {opacity: 0, y: 14},
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.015,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 82%',
              once: true,
            },
          },
        );
      }

      const keywords = gsap.utils.toArray<HTMLElement>(
        '.split-keyword',
        containerRef.current,
      );
      keywords.forEach((word) => {
        gsap.fromTo(
          word,
          {opacity: 0.38},
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: word,
              start: 'top 66%',
              end: 'top 48%',
              scrub: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {paragraphs.map((paragraph, pIdx) => {
        const tokens = paragraph.split(/\s+/).filter(Boolean);
        return (
          <p key={pIdx} className={paragraphClassName}>
            {tokens.map((token, tIdx) => {
              const isKeyword = KEYWORD_REGEX.test(token);
              return (
                <span
                  key={`${pIdx}-${tIdx}`}
                  className="split-word inline-block mr-[0.28em]"
                >
                  {isKeyword ? (
                    <span
                      className={`split-keyword font-semibold text-white ${
                        prefersReducedMotion ? 'opacity-100' : 'opacity-40'
                      }`}
                    >
                      {token}
                    </span>
                  ) : (
                    token
                  )}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
