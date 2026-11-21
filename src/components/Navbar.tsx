import gsap from 'gsap';
import {useEffect, useRef, useState} from 'react';
import {siteContent} from '../content';
import {usePrefersReducedMotion} from '../hooks/usePrefersReducedMotion';

interface NavbarProps {
  onNavigate: (href: string) => void;
}

export function Navbar({onNavigate}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const {marca, enlaces, menuCompleto} = siteContent.navegacion;

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen || !overlayRef.current || prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        {clipPath: 'inset(0 0 100% 0)'},
        {clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'expo.out'},
      );
      gsap.fromTo(
        '.menu-link',
        {yPercent: 100},
        {yPercent: 0, duration: 0.7, stagger: 0.035, ease: 'expo.out', delay: 0.1},
      );
    }, overlayRef);
    return () => ctx.revert();
  }, [menuOpen, prefersReducedMotion]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(href);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-white">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-8 px-5 sm:h-20 sm:px-10">
          <a
            href="#portada"
            onClick={(e) => go(e, '#portada')}
            className="display text-lg sm:text-xl"
            style={{lineHeight: 1}}
          >
            {marca}
          </a>

          <div className="flex items-center gap-8">
            <nav aria-label="Navegación principal" className="hidden items-center gap-7 lg:flex">
              {enlaces.map((enlace) => (
                <a
                  key={enlace.href}
                  href={enlace.href}
                  onClick={(e) => go(e, enlace.href)}
                  className="text-[0.95rem] font-medium hover:underline"
                >
                  {enlace.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="menu-completo"
              className="group inline-flex min-h-11 items-center gap-3 text-[0.95rem] font-medium"
            >
              <span>Menú</span>
              <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
                <span className="h-[2px] w-full bg-current transition-transform duration-300 group-hover:translate-x-1" />
                <span className="h-[2px] w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="menu-completo"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          data-lenis-prevent
          className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-celeste text-ink"
        >
          <div className="mx-auto flex min-h-full max-w-[1600px] flex-col px-5 sm:px-10">
            <div className="flex h-16 items-center justify-between sm:h-20">
              <span className="display text-lg sm:text-xl" style={{lineHeight: 1}}>
                {marca}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-h-11 items-center gap-3 text-[0.95rem] font-medium"
                style={{outlineColor: 'var(--color-ink)'}}
              >
                Cerrar
                <span aria-hidden="true" className="relative block h-6 w-6">
                  <span className="absolute top-1/2 left-0 h-[2px] w-full rotate-45 bg-current" />
                  <span className="absolute top-1/2 left-0 h-[2px] w-full -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <nav aria-label="Secciones" className="flex flex-1 items-center py-10">
              <ul className="w-full">
                {menuCompleto.map((item) => (
                  <li key={item.href} className="overflow-hidden border-b border-ink/15 first:border-t">
                    <a
                      href={item.href}
                      onClick={(e) => go(e, item.href)}
                      className="menu-link display block py-3 text-[clamp(2rem,6vw,4.5rem)] transition-[padding] duration-300 ease-out hover:pl-4"
                      style={{outlineColor: 'var(--color-ink)'}}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="label pb-8 text-ink/75">{siteContent.cierre.pie}</p>
          </div>
        </div>
      )}
    </>
  );
}
