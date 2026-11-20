import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {ArrowUpRight, Check, Copy} from 'lucide-react';
import {MotionConfig} from 'motion/react';
import {useCallback, useEffect, useRef, useState} from 'react';
import {MarqueeStrip} from './components/MarqueeStrip';
import {MediaPlaceholder} from './components/MediaPlaceholder';
import {Navbar} from './components/Navbar';
import {ScrollProgressBar} from './components/ScrollProgressBar';
import {SplitRevealText} from './components/SplitRevealText';
import {siteContent} from './content';
import {usePrefersReducedMotion} from './hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function formatArgentineDecimal(value: number, decimals: number): string {
  return value.toFixed(decimals).replace('.', ',');
}

export default function App() {
  const [copiedMail, setCopiedMail] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const lenisRef = useRef<Lenis | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const heroLineRef = useRef<SVGLineElement>(null);
  const marcasSectionRef = useRef<HTMLElement>(null);
  const trayectoriaSectionRef = useRef<HTMLElement>(null);
  const trayectoriaWrapperRef = useRef<HTMLDivElement>(null);
  const trayectoriaTrackRef = useRef<HTMLDivElement>(null);
  const cierrePhraseRef = useRef<HTMLParagraphElement>(null);

  // 1. Lenis Smooth Scroll + GSAP ScrollTrigger sync
  useEffect(() => {
    if (prefersReducedMotion) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  // Master GSAP animations (Hero, Counters, Trayectoria Horizontal Pin, Reveals, Closing Scale)
  useEffect(() => {
    if (prefersReducedMotion || !mainRef.current) return;

    const ctx = gsap.context(() => {
      // 2. Portada: letter-by-letter from bottom + SVG track line draw
      gsap.fromTo(
        '.hero-char',
        {yPercent: 115, opacity: 0},
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.028,
          ease: 'power3.out',
        },
      );

      gsap.fromTo(
        '.hero-fade',
        {y: 18, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.25,
          ease: 'power3.out',
        },
      );

      if (heroLineRef.current) {
        const length = heroLineRef.current.getTotalLength();
        gsap.set(heroLineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(heroLineRef.current, {
          strokeDashoffset: 0,
          duration: 0.85,
          delay: 0.2,
          ease: 'power2.out',
        });
      }

      // 3. Mis Marcas: count up from 0 respecting comma decimal
      const numberEls = gsap.utils.toArray<HTMLElement>('.marca-number');
      if (numberEls.length > 0 && marcasSectionRef.current) {
        numberEls.forEach((el) => {
          const target = parseFloat(el.dataset.target ?? '0');
          const decimals = parseInt(el.dataset.decimals ?? '2', 10);
          const proxy = {val: 0};

          gsap.to(proxy, {
            val: target,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: marcasSectionRef.current,
              start: 'top 78%',
              once: true,
            },
            onUpdate: () => {
              el.textContent = formatArgentineDecimal(proxy.val, decimals);
            },
          });
        });
      }

      // 5. Trayectoria: Desktop horizontal pin scrub; Mobile stays vertical
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const section = trayectoriaSectionRef.current;
        const wrapper = trayectoriaWrapperRef.current;
        const track = trayectoriaTrackRef.current;
        if (!section || !wrapper || !track) return;

        const getScrollDistance = () =>
          Math.max(0, track.scrollWidth - wrapper.clientWidth);

        if (getScrollDistance() <= 0) return;

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.75,
            start: 'top top',
            end: () => `+=${getScrollDistance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });

      // Generic clean section card staggers
      gsap.utils.toArray<HTMLElement>('.gsap-stagger-group').forEach((group) => {
        const items = group.querySelectorAll('.gsap-stagger-item');
        if (items.length === 0) return;

        gsap.fromTo(
          items,
          {opacity: 0, y: 20},
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 82%',
              once: true,
            },
          },
        );
      });

      // 9. Cierre: subtle scale up on scroll
      if (cierrePhraseRef.current) {
        gsap.fromTo(
          cierrePhraseRef.current,
          {scale: 0.9, opacity: 0.75},
          {
            scale: 1.07,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: cierrePhraseRef.current,
              start: 'top 90%',
              end: 'bottom 25%',
              scrub: 0.6,
            },
          },
        );
      }

      ScrollTrigger.refresh();
    }, mainRef);

    let active = true;
    document.fonts?.ready.then(() => {
      if (active) {
        ScrollTrigger.refresh();
      }
    });

    return () => {
      active = false;
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  const handleNavigate = useCallback(
    (href: string) => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      if (lenisRef.current && !prefersReducedMotion) {
        lenisRef.current.scrollTo(target, {offset: -64, duration: 0.9});
      } else {
        target.scrollIntoView({behavior: prefersReducedMotion ? 'auto' : 'smooth'});
      }
    },
    [prefersReducedMotion],
  );

  const handleCopyMail = async () => {
    const mail = siteContent.contacto.mail;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(mail);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = mail;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedMail(true);
      window.setTimeout(() => setCopiedMail(false), 2500);
    } catch {
      setCopiedMail(false);
    }
  };

  const heroWords = siteContent.portada.nombre.split(' ');

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#1A1416] text-white overflow-x-hidden">
        <ScrollProgressBar />
        <Navbar onNavigate={handleNavigate} />

        <main ref={mainRef}>
          {/* SECCIÓN 1 · PORTADA */}
          <section
            id="portada"
            className="bg-[#1A1416] text-white pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <p className="hero-fade text-sm sm:text-base font-semibold text-white/75 tracking-wide">
                {siteContent.portada.bajada}
              </p>

              <h1
                aria-label={siteContent.portada.nombre}
                className="mt-3 font-display-condensed text-[clamp(3.6rem,14vw,10.25rem)] leading-[0.88] tracking-tight text-white w-full"
              >
                {heroWords.map((word, wIdx) => (
                  <span
                    key={wIdx}
                    aria-hidden="true"
                    className="inline-block whitespace-nowrap mr-[0.24em] last:mr-0"
                  >
                    {Array.from(word).map((char, cIdx) => (
                      <span
                        key={`${wIdx}-${cIdx}`}
                        className="inline-block overflow-hidden align-bottom"
                      >
                        <span className="hero-char inline-block will-change-transform">
                          {char}
                        </span>
                      </span>
                    ))}
                  </span>
                ))}
              </h1>

              {/* Línea blanca tipo carril de pista (trazo SVG izquierda -> derecha) */}
              <svg
                aria-hidden="true"
                viewBox="0 0 1200 10"
                preserveAspectRatio="none"
                className="w-full h-3 mt-4 mb-10 block"
              >
                <line
                  ref={heroLineRef}
                  x1="0"
                  y1="5"
                  x2="1200"
                  y2="5"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />
              </svg>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
                <div className="hero-fade lg:col-span-6 flex flex-col justify-center">
                  <p className="text-2xl sm:text-3xl font-semibold text-white">
                    {siteContent.portada.frase}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href={siteContent.portada.botonPrimario.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(siteContent.portada.botonPrimario.href);
                      }}
                      className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-full bg-[#C2412D] text-white font-semibold text-base hover:bg-[#C2412D]/90 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {siteContent.portada.botonPrimario.label}
                    </a>
                    <a
                      href={siteContent.portada.botonSecundario.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(siteContent.portada.botonSecundario.href);
                      }}
                      className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-full border border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {siteContent.portada.botonSecundario.label}
                    </a>
                  </div>
                </div>

                <div className="hero-fade lg:col-span-6 flex flex-col">
                  <div className="w-full h-full min-h-[300px] sm:min-h-[360px] lg:min-h-[400px]">
                    <MediaPlaceholder
                      tipo="foto"
                      etiqueta={siteContent.portada.imagen.etiqueta}
                      descripcion={siteContent.portada.imagen.descripcion}
                      alt={siteContent.portada.imagen.alt}
                      src={siteContent.portada.imagen.src}
                      aspectClass="h-full min-h-[300px] sm:min-h-[360px] lg:min-h-[400px]"
                      roundedClass="rounded-3xl"
                      showCaption={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN 2 · MIS MARCAS */}
          <section
            ref={marcasSectionRef}
            id="marcas"
            aria-labelledby="titulo-marcas"
            className="bg-white text-[#1A1416] py-16 sm:py-22"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-10">
                <h2
                  id="titulo-marcas"
                  className="font-display-condensed text-4xl sm:text-5xl tracking-tight text-[#1A1416]"
                >
                  {siteContent.marcas.titulo}
                </h2>
                <p className="text-sm font-semibold text-[#1A1416]/75">
                  {siteContent.marcas.aclaracion}
                </p>
              </div>

              <div className="gsap-stagger-group grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
                {siteContent.marcas.items.map((marca) => (
                  <div
                    key={marca.id}
                    className="gsap-stagger-item rounded-3xl bg-[#1A1416] text-white p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white/75">
                      {marca.prueba}
                    </span>
                    <div className="mt-5 font-display-condensed tabular-figures text-5xl sm:text-[3.5rem] leading-none tracking-tight text-white flex items-baseline gap-1.5">
                      <span
                        className="marca-number"
                        data-target={marca.numeroFinal}
                        data-decimals={marca.decimales}
                      >
                        {formatArgentineDecimal(marca.numeroFinal, marca.decimales)}
                      </span>
                      <span className="text-3xl sm:text-4xl text-[#C2412D]">
                        {marca.unidad}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CINTA DE TEXTO EN MOVIMIENTO */}
          <MarqueeStrip text={siteContent.cinta} />

          {/* SECCIÓN 3 · SOBRE MÍ */}
          <section
            id="sobre-mi"
            aria-labelledby="titulo-sobre-mi"
            className="bg-[#1A1416] text-white py-20 sm:py-28"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-4">
                  <h2
                    id="titulo-sobre-mi"
                    className="font-display-condensed text-4xl sm:text-5xl tracking-tight text-white"
                  >
                    {siteContent.sobreMi.titulo}
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <SplitRevealText
                    paragraphs={[siteContent.sobreMi.texto]}
                    paragraphClassName="text-xl sm:text-2xl lg:text-[1.7rem] leading-[1.5] font-normal text-white/90 max-w-[65ch]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN 4 · TRAYECTORIA (Horizontal Pin en PC, Vertical en Celular) */}
          <section
            ref={trayectoriaSectionRef}
            id="trayectoria"
            aria-labelledby="titulo-trayectoria"
            className="bg-[#C2412D] text-white py-16 sm:py-20 lg:min-h-screen lg:flex lg:flex-col lg:justify-center overflow-hidden"
          >
            <div className="max-w-6xl w-full mx-auto px-5 sm:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-8 sm:mb-10">
                <h2
                  id="titulo-trayectoria"
                  className="font-display-condensed text-4xl sm:text-5xl tracking-tight text-white"
                >
                  {siteContent.trayectoria.titulo}
                </h2>
              </div>

              <div ref={trayectoriaWrapperRef} className="w-full">
                <div
                  ref={trayectoriaTrackRef}
                  className={
                    prefersReducedMotion
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'flex flex-col gap-6 lg:flex-row lg:w-max lg:will-change-transform'
                  }
                >
                  {siteContent.trayectoria.hitos.map((hito) => (
                    <article
                      key={hito.numero}
                      className={`rounded-3xl bg-[#1A1416] text-white p-6 sm:p-7 flex flex-col justify-between gap-5 ${
                        prefersReducedMotion ? 'w-full' : 'w-full lg:w-[400px] xl:w-[430px] shrink-0'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-display-condensed text-3xl sm:text-4xl tracking-tight text-white">
                            {hito.fecha}
                          </h3>
                          <span className="font-display-condensed tabular-figures text-xl text-[#C2412D]">
                            {hito.numero}
                          </span>
                        </div>

                        <p className="mt-3 text-base sm:text-lg leading-relaxed text-white/85">
                          {hito.descripcion}
                        </p>
                      </div>

                      <div className="pt-2">
                        <MediaPlaceholder
                          tipo="foto"
                          etiqueta={hito.imagen.etiqueta}
                          descripcion={hito.imagen.descripcion}
                          alt={hito.imagen.alt}
                          src={hito.imagen.src}
                          aspectClass="aspect-[16/10]"
                          roundedClass="rounded-2xl"
                          showCaption={false}
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN 5 · LO QUE ME TOCÓ SUPERAR */}
          <section
            id="superacion"
            aria-labelledby="titulo-superacion"
            className="bg-[#1A1416] text-white py-24 sm:py-32"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <div className="max-w-4xl">
                <h2
                  id="titulo-superacion"
                  className="font-display-condensed text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white [text-wrap:balance]"
                >
                  {siteContent.superacion.titulo}
                </h2>

                <SplitRevealText
                  paragraphs={siteContent.superacion.parrafos}
                  className="mt-8 sm:mt-10 space-y-6"
                  paragraphClassName="text-xl sm:text-2xl lg:text-[1.65rem] leading-[1.55] font-normal text-white/90 last:pt-6 last:border-t last:border-white/20 last:font-semibold"
                />
              </div>
            </div>
          </section>

          {/* SECCIÓN 6 · DÓNDE ESTOY HOY */}
          <section
            id="comparativa"
            aria-labelledby="titulo-comparativa"
            className="bg-white text-[#1A1416] py-16 sm:py-22"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <h2
                id="titulo-comparativa"
                className="font-display-condensed text-4xl sm:text-5xl tracking-tight text-[#1A1416]"
              >
                {siteContent.comparativa.titulo}
              </h2>

              <div className="gsap-stagger-group mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {siteContent.comparativa.tablas.map((tabla) => (
                  <div
                    key={tabla.id}
                    className="gsap-stagger-item rounded-3xl bg-[#1A1416] text-white overflow-hidden"
                  >
                    <div className="px-6 py-5 border-b border-white/12">
                      <h3 className="font-display-condensed text-2xl sm:text-[1.75rem] tracking-tight text-white">
                        {tabla.titulo}
                      </h3>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/12 text-xs font-semibold text-white/75">
                            <th scope="col" className="py-3.5 px-6">
                              Posición
                            </th>
                            <th scope="col" className="py-3.5 px-6 text-right">
                              Marca ({tabla.unidad})
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {tabla.filas.map((fila) => (
                            <tr
                              key={`${tabla.id}-${fila.puesto}-${fila.marca}`}
                              className={
                                fila.esPropia
                                  ? 'bg-[#C2412D] text-white'
                                  : 'text-white/95'
                              }
                            >
                              <td className="py-3.5 px-6 font-display-condensed tabular-figures text-2xl tracking-wide">
                                {fila.esPropia ? (
                                  <span className="inline-flex items-center gap-2">
                                    <span>{fila.puesto}</span>
                                    <span className="font-sans text-xs font-semibold tracking-normal">
                                      (Mi marca)
                                    </span>
                                  </span>
                                ) : (
                                  fila.puesto
                                )}
                              </td>
                              <td className="py-3.5 px-6 text-right font-display-condensed tabular-figures text-3xl tracking-tight">
                                {fila.marca}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-relaxed text-[#1A1416]/75 max-w-4xl">
                {siteContent.comparativa.nota}
              </p>

              <p className="mt-8 text-lg sm:text-xl lg:text-2xl font-semibold leading-relaxed text-[#1A1416] max-w-3xl">
                {siteContent.comparativa.cierre}
              </p>
            </div>
          </section>

          {/* SECCIÓN 7 · OBJETIVOS 2027 */}
          <section
            id="objetivos"
            aria-labelledby="titulo-objetivos"
            className="bg-white text-[#1A1416] pt-6 pb-16 sm:pb-22 border-t border-[#1A1416]/10"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14">
              <h2
                id="titulo-objetivos"
                className="font-display-condensed text-4xl sm:text-5xl tracking-tight text-[#1F5FD1]"
              >
                {siteContent.objetivos.titulo}
              </h2>

              <div className="gsap-stagger-group mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {siteContent.objetivos.items.map((objetivo) => (
                  <div
                    key={objetivo.numero}
                    className="gsap-stagger-item rounded-3xl p-7 sm:p-8 bg-[#1F5FD1] text-white flex flex-col justify-between gap-6"
                  >
                    <span className="font-display-condensed tabular-figures text-4xl sm:text-5xl leading-none text-white/85">
                      {objetivo.numero}
                    </span>
                    <p className="text-lg sm:text-xl font-semibold leading-snug text-white">
                      {objetivo.texto}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECCIÓN 8 · GALERÍA */}
          <section
            id="galeria"
            aria-labelledby="titulo-galeria"
            className="bg-[#1A1416] text-white py-16 sm:py-22"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-10">
                <h2
                  id="titulo-galeria"
                  className="font-display-condensed text-4xl sm:text-5xl tracking-tight text-white"
                >
                  {siteContent.galeria.titulo}
                </h2>
                <p className="text-sm sm:text-base font-normal text-white/75">
                  {siteContent.galeria.subtitulo}
                </p>
              </div>

              <div className="gsap-stagger-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {siteContent.galeria.items.map((item) => (
                  <div key={item.id} className="gsap-stagger-item">
                    <MediaPlaceholder
                      tipo={item.tipo}
                      etiqueta={item.etiqueta}
                      descripcion={item.descripcion}
                      alt={item.alt}
                      src={item.src}
                      srcSecundaria={item.srcSecundaria}
                      etiquetaSecundaria={item.etiquetaSecundaria}
                      descripcionSecundaria={item.descripcionSecundaria}
                      aspectClass="aspect-[4/3]"
                      roundedClass="rounded-2xl"
                      showCaption
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECCIÓN 9 · APOYAME */}
          <section
            id="apoyame"
            aria-labelledby="titulo-apoyame"
            className="bg-white text-[#1A1416] py-16 sm:py-22"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <h2
                id="titulo-apoyame"
                className="font-display-condensed text-4xl sm:text-5xl tracking-tight text-[#1A1416]"
              >
                {siteContent.apoyame.titulo}
              </h2>

              <div className="gsap-stagger-group mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                <div className="gsap-stagger-item">
                  <h3 className="font-display-condensed text-3xl tracking-tight text-[#C2412D]">
                    {siteContent.apoyame.necesitoTitulo}
                  </h3>
                  <ul className="mt-5 divide-y divide-[#1A1416]/12 border-y border-[#1A1416]/12">
                    {siteContent.apoyame.necesito.map((item) => (
                      <li
                        key={item}
                        className="py-3.5 text-base sm:text-lg font-normal text-[#1A1416]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="gsap-stagger-item">
                  <h3 className="font-display-condensed text-3xl tracking-tight text-[#1A1416]">
                    {siteContent.apoyame.ofrezcoTitulo}
                  </h3>
                  <ul className="mt-5 divide-y divide-[#1A1416]/12 border-y border-[#1A1416]/12">
                    {siteContent.apoyame.ofrezco.map((item) => (
                      <li
                        key={item}
                        className="py-3.5 text-base sm:text-lg font-normal text-[#1A1416]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href={siteContent.apoyame.boton.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(siteContent.apoyame.boton.href);
                  }}
                  className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-[#C2412D] text-white font-semibold text-base hover:bg-[#C2412D]/90 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1416]"
                >
                  {siteContent.apoyame.boton.label}
                </a>
              </div>
            </div>
          </section>

          {/* CIERRE PREVIO AL CONTACTO */}
          <div className="bg-[#1A1416] text-white py-20 sm:py-28 overflow-hidden">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 flex justify-center">
              <p
                ref={cierrePhraseRef}
                className="font-display-condensed text-center text-[clamp(2.75rem,8.5vw,7rem)] leading-[0.95] tracking-tight text-white [text-wrap:balance] will-change-transform"
              >
                {siteContent.portada.frase}
              </p>
            </div>
          </div>

          {/* SECCIÓN 10 · CONTACTO */}
          <section
            id="contacto"
            aria-labelledby="titulo-contacto"
            className="bg-[#C2412D] text-white pt-16 pb-12 sm:pt-20 sm:pb-14"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <h2
                id="titulo-contacto"
                className="font-display-condensed text-4xl sm:text-5xl tracking-tight text-white"
              >
                {siteContent.contacto.titulo}
              </h2>

              <div className="gsap-stagger-group mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {siteContent.contacto.canales.map((canal) => {
                  const isExternal = canal.id !== 'mail';
                  return (
                    <div
                      key={canal.id}
                      className="gsap-stagger-item rounded-3xl bg-[#1A1416]/25 border border-white/25 p-6 flex flex-col justify-between gap-6"
                    >
                      <div>
                        <span className="text-sm font-semibold text-white/90">
                          {canal.etiqueta}
                        </span>
                        <p className="mt-2 font-display-condensed text-2xl sm:text-3xl tracking-tight text-white break-words">
                          {canal.valorVisible}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={canal.href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full bg-white text-[#1A1416] text-sm font-semibold hover:bg-white/90 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          <span>Abrir {canal.etiqueta}</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </a>

                        {canal.id === 'mail' && (
                          <button
                            type="button"
                            onClick={handleCopyMail}
                            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-full border border-white text-white text-sm font-semibold hover:bg-white/15 transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          >
                            {copiedMail ? (
                              <>
                                <Check className="w-4 h-4" aria-hidden="true" />
                                <span>{siteContent.contacto.mailCopiadoLabel}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" aria-hidden="true" />
                                <span>{siteContent.contacto.copiarMailLabel}</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div aria-live="polite" className="sr-only">
                {copiedMail ? siteContent.contacto.mailCopiadoLabel : ''}
              </div>

              <p className="mt-14 font-display-condensed text-3xl sm:text-4xl tracking-tight text-white">
                {siteContent.contacto.cierre}
              </p>

              <footer className="mt-10 pt-6 border-t border-white/25 text-sm font-normal text-white/90">
                {siteContent.contacto.pie}
              </footer>
            </div>
          </section>
        </main>
      </div>
    </MotionConfig>
  );
}
