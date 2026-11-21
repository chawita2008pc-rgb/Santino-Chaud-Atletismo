import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useEffect, useRef} from 'react';
import {usePrefersReducedMotion} from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ScrubTextProps {
  text: string;
  className?: string;
  as?: 'p' | 'blockquote';
}

/** Texto que se "enciende" palabra por palabra a medida que se scrollea. */
export function ScrubText({text, className = '', as: Tag = 'p'}: ScrubTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.scrub-word',
        {opacity: 0.16},
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 82%',
            end: 'bottom 72%',
            scrub: 0.4,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {words.map((w, i) => (
        <span key={i} className="scrub-word">
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
