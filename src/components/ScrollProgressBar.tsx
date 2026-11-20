import {motion, useReducedMotion, useScroll, useSpring} from 'motion/react';

export function ScrollProgressBar() {
  const prefersReducedMotion = useReducedMotion();
  const {scrollYProgress} = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 z-[60] h-[3px] bg-white/10 pointer-events-none"
    >
      <motion.div
        style={{scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress}}
        className="h-full origin-left bg-gradient-to-r from-[#C2412D] to-[#1F5FD1]"
      />
    </div>
  );
}
