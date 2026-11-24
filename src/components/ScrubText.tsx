import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useEffect, useRef} from 'react';
import {usePrefersReducedMotion} from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface ScrubTextProps {
  text: string;
  className?: string;
  as?: 'p' | 'blockquote';
  /** Versión un poco más marcada: arranca más apagado, con leve subida y desenfoque. */
  intense?: boolean;
}

/** Texto que se "enciende" palabra por palabra a medida que se scrollea. */
export function ScrubText({text, className = '', as: Tag = 'p', intense = false}: ScrubTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.scrub-word',
        intense ? {opacity: 0.06, y: '0.3em', filter: 'blur(4px)'} : {opacity: 0.16},
        {
          opacity: 1,
          ...(intense ? {y: 0, filter: 'blur(0px)'} : {}),
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: intense ? 'top 88%' : 'top 82%',
            end: intense ? 'bottom 60%' : 'bottom 72%',
            scrub: intense ? 0.6 : 0.4,
            // Recalcular después de las secciones fijadas (pin) que están más arriba
            refreshPriority: -1,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [reduced, intense]);

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span className={intense ? 'scrub-word inline-block' : 'scrub-word'}>{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
