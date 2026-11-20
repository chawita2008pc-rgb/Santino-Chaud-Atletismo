import gsap from 'gsap';
import {Menu, X} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import {siteContent} from '../content';
import {usePrefersReducedMotion} from '../hooks/usePrefersReducedMotion';
import {MediaPlaceholder} from './MediaPlaceholder';

interface NavbarProps {
  onNavigate: (href: string) => void;
}

export function Navbar({onNavigate}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const {marca, enlaces, cta, menuCompleto} = siteContent.navegacion;

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen || !overlayRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        {opacity: 0},
        {opacity: 1, duration: 0.4, ease: 'power2.out'},
      );
      gsap.fromTo(
        '.fullscreen-menu-link',
        {opacity: 0, y: 24},
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.045,
          ease: 'power3.out',
          delay: 0.08,
        },
      );
    }, overlayRef);

    return () => ctx.revert();
  }, [menuOpen, prefersReducedMotion]);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(href);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 pt-[3px] bg-[#1A1416]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#portada"
            onClick={(e) => handleLinkClick(e, '#portada')}
            className="font-display-condensed text-2xl tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2412D]"
          >
            {marca}
          </a>

          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-6"
          >
            {enlaces.map((enlace) => (
              <a
                key={enlace.href}
                href={enlace.href}
                onClick={(e) => handleLinkClick(e, enlace.href)}
                className="min-h-[44px] inline-flex items-center text-sm font-semibold text-white/80 hover:text-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2412D]"
              >
                {enlace.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={cta.href}
              onClick={(e) => handleLinkClick(e, cta.href)}
              className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-[#C2412D] text-white text-sm font-semibold hover:bg-[#C2412D]/90 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {cta.label}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="fullscreen-nav-menu"
              aria-label="Abrir menú completo"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-full border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
              <span className="hidden sm:inline">Menú</span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="fullscreen-nav-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="fixed inset-0 z-[70] bg-[#C2412D] text-white overflow-y-auto"
        >
          <div className="hidden lg:block fixed inset-0 pointer-events-none">
            {menuCompleto.map((item, idx) => (
              <div
                key={item.href}
                className={`absolute inset-y-0 right-0 w-1/2 p-12 flex items-center justify-center transition-opacity duration-500 ease-out ${
                  activeIndex === idx ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="w-full max-w-lg h-[72vh] opacity-90">
                  <MediaPlaceholder
                    tipo="foto"
                    etiqueta={item.previewFoto.etiqueta}
                    descripcion={item.previewFoto.descripcion}
                    alt={item.previewFoto.alt}
                    src={item.previewFoto.src}
                    aspectClass="h-full"
                    roundedClass="rounded-3xl"
                    showCaption={false}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 min-h-full max-w-6xl mx-auto px-5 sm:px-8 py-5 flex flex-col justify-between">
            <div className="flex items-center justify-between h-14">
              <span className="font-display-condensed text-2xl tracking-tight text-white">
                {marca}
              </span>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full bg-[#1A1416] text-white text-sm font-semibold hover:bg-[#1A1416]/85 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X className="w-5 h-5" aria-hidden="true" />
                <span>Cerrar</span>
              </button>
            </div>

            <nav aria-label="Secciones de la página" className="my-8 lg:w-1/2">
              <ul className="space-y-1 sm:space-y-2">
                {menuCompleto.map((item, idx) => (
                  <li key={item.href} className="overflow-hidden">
                    <a
                      href={item.href}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onFocus={() => setActiveIndex(idx)}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="fullscreen-menu-link inline-flex items-baseline gap-4 min-h-[44px] py-1 font-display-condensed text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight tracking-tight text-white/85 hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      <span className="tabular-figures text-lg sm:text-xl text-white/65">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="pt-4 border-t border-white/25 text-sm text-white/90">
              {siteContent.contacto.pie}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
