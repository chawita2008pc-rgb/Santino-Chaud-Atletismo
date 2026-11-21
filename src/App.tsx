import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {MotionConfig} from 'motion/react';
import {useCallback, useEffect, useRef} from 'react';
import {Media} from './components/Media';
import {Navbar} from './components/Navbar';
import {ScrubText} from './components/ScrubText';
import {Sports} from './components/Sports';
import {siteContent} from './content';
import {usePrefersReducedMotion} from './hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function decimalAR(value: number, decimals: number): string {
  return value.toFixed(decimals).replace('.', ',');
}

const formatoGaleria: Record<string, string> = {
  completa: 'col-span-2 row-span-2 lg:col-span-4',
  grande: 'col-span-2 row-span-2',
  alta: 'row-span-2',
  ancha: 'col-span-2',
  normal: '',
};

export default function App() {
  const reduced = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroFrameRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const marcasRef = useRef<HTMLElement>(null);
  const trayRef = useRef<HTMLElement>(null);
  const trayViewportRef = useRef<HTMLDivElement>(null);
  const trayTrackRef = useRef<HTMLDivElement>(null);
  const cierreRef = useRef<HTMLParagraphElement>(null);

  // Scroll suave + sincronización con ScrollTrigger
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced || !mainRef.current) return;

    const ctx = gsap.context(() => {
      // Portada: el cuadro se abre y el nombre sube letra por letra
      const intro = gsap.timeline({defaults: {ease: 'expo.out'}});
      intro
        .from(heroFrameRef.current, {
          clipPath: 'inset(14% 10% 14% 10%)',
          duration: 1.2,
        })
        .from(heroMediaRef.current, {scale: 1.2, duration: 1.4}, 0)
        .from('.hero-char', {yPercent: 105, duration: 0.8, stagger: 0.022}, 0.05)
        .from('.hero-fade', {opacity: 0, y: 10, duration: 0.6, stagger: 0.06}, 0.3);

      // Portada al scrollear: la foto se aleja y el nombre se despega
      gsap.to(heroMediaRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true},
      });
      gsap.to(heroNameRef.current, {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true},
      });

      // Marcas: cuentan desde cero
      gsap.utils.toArray<HTMLElement>('.marca-num').forEach((el) => {
        const target = parseFloat(el.dataset.target ?? '0');
        const decimals = parseInt(el.dataset.decimals ?? '2', 10);
        const proxy = {v: 0};
        gsap.to(proxy, {
          v: target,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {trigger: el, start: 'top 88%', once: true},
          onUpdate: () => {
            el.textContent = decimalAR(proxy.v, decimals);
          },
        });
      });

      // Trayectoria: recorrido horizontal fijado en pantallas grandes
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const section = trayRef.current;
        const viewport = trayViewportRef.current;
        const track = trayTrackRef.current;
        if (!section || !viewport || !track) return;
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        if (distance() <= 0) return;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 0.6,
            start: 'top top',
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });

      // Fotos: se revelan con una cortina al entrar
      gsap.utils.toArray<HTMLElement>('.reveal-media').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(100% 0 0 0)',
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: {trigger: el, start: 'top 90%', once: true},
        });
      });

      // Pantalla completa: el cuadro se abre a sangre al entrar y la imagen se desplaza
      gsap.fromTo(
        '.pantalla-completa',
        {clipPath: 'inset(0% 8% 0% 8%)'},
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {trigger: '.pantalla-completa', start: 'top 95%', end: 'top 20%', scrub: 0.5},
        },
      );
      gsap.fromTo(
        '.pantalla-media',
        {yPercent: -8, scale: 1.12},
        {
          yPercent: 8,
          scale: 1,
          ease: 'none',
          scrollTrigger: {trigger: '.pantalla-completa', start: 'top bottom', end: 'bottom top', scrub: true},
        },
      );

      // Cierre: la frase crece al scrollear
      if (cierreRef.current) {
        gsap.fromTo(
          cierreRef.current,
          {scale: 0.86},
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {trigger: cierreRef.current, start: 'top 95%', end: 'bottom 40%', scrub: 0.5},
          },
        );
      }
    }, mainRef);

    let active = true;
    document.fonts?.ready.then(() => active && ScrollTrigger.refresh());
    return () => {
      active = false;
      ctx.revert();
    };
  }, [reduced]);

  const navigate = useCallback(
    (href: string) => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {offset: href === '#portada' ? 0 : -64, duration: 1.2});
      } else {
        target.scrollIntoView({behavior: reduced ? 'auto' : 'smooth'});
      }
    },
    [reduced],
  );

  const {portada, sobreMi, marcas, trayectoria, superacion, pantallaCompleta, comparativa, objetivos, galeria, queNecesito, cierre} =
    siteContent;
  const [nombre, apellido] = portada.nombre.split(' ');

  return (
    <MotionConfig reducedMotion="user">
      <Navbar onNavigate={navigate} />

      <main ref={mainRef} className="overflow-x-clip">
        {/* PORTADA */}
        <section ref={heroRef} id="portada" className="relative h-[100svh] min-h-[560px] bg-ink">
          <div ref={heroFrameRef} className="absolute inset-0 overflow-hidden" style={{clipPath: 'inset(0% 0% 0% 0%)'}}>
            <div ref={heroMediaRef} className="absolute inset-0 will-change-transform">
              <Media
                tipo={portada.imagen.tipo}
                descripcion={portada.imagen.descripcion}
                alt={portada.imagen.alt}
                src={portada.imagen.src}
                className="h-full"
                etiquetaArriba
                prioridad
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent"
            />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-6 sm:px-10 sm:pb-10">
            <div className="mb-6 sm:mb-8">
              <p className="hero-fade max-w-[26ch] text-base lg:max-w-none font-medium text-paper/90 sm:text-lg">{portada.bajada}</p>
            </div>

            <h1
              ref={heroNameRef}
              aria-label={portada.nombre}
              className="display text-[18vw] text-paper lg:flex lg:justify-between lg:text-[10.4vw] min-[1600px]:text-[166px]"
            >
              {[nombre, apellido].map((palabra) => (
                <span key={palabra} aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
                  {Array.from(palabra).map((c, i) => (
                    <span key={i} className="hero-char inline-block">
                      {c}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          </div>
        </section>

        {/* SOBRE MÍ */}
        <section id="sobre-mi" aria-labelledby="t-sobre-mi" className="bg-paper text-ink">
          <div className="mx-auto grid max-w-[1600px] gap-8 px-5 pt-24 pb-12 sm:px-10 sm:pt-36 sm:pb-16 lg:grid-cols-12 lg:gap-10">
            <h2 id="t-sobre-mi" className="display text-[clamp(2rem,3.4vw,3.25rem)] lg:col-span-3">
              {sobreMi.titulo}
            </h2>
            <ScrubText
              text={sobreMi.texto}
              className="text-[clamp(1.6rem,3.1vw,3.1rem)] leading-[1.18] font-medium tracking-[-0.02em] lg:col-span-9"
            />
          </div>
        </section>

        {/* LOS SPORTS */}
        <Sports />

        {/* MIS MARCAS */}
        <section ref={marcasRef} id="marcas" aria-labelledby="t-marcas" className="bg-celeste text-ink">
          <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 sm:py-28">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-14">
              <h2 id="t-marcas" className="display text-[clamp(3rem,8vw,7.5rem)]">
                {marcas.titulo}
              </h2>
              <p className="text-lg font-semibold text-ink/85 sm:text-2xl">{marcas.aclaracion}</p>
            </div>

            <ul>
              {marcas.items.map((m) => (
                <li
                  key={m.id}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-ink/25 py-4 last:border-b sm:py-5"
                >
                  <span className="text-lg font-semibold sm:text-2xl">{m.prueba}</span>
                  <span className="figures text-[clamp(3.25rem,10vw,9.5rem)] leading-[0.9]">
                    <span className="marca-num" data-target={m.numeroFinal} data-decimals={m.decimales}>
                      {decimalAR(m.numeroFinal, m.decimales)}
                    </span>
                    <span className="ml-2 text-[0.38em] font-semibold tracking-normal text-celeste-deep">{m.unidad}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* TRAYECTORIA */}
        <section
          ref={trayRef}
          id="trayectoria"
          aria-labelledby="t-trayectoria"
          className={`bg-ink text-paper ${reduced ? '' : 'lg:flex lg:h-[100svh] lg:flex-col lg:justify-center'}`}
        >
          <div className={`mx-auto w-full max-w-[1600px] px-5 pt-24 pb-20 sm:px-10 ${reduced ? 'lg:pt-32 lg:pb-32' : 'lg:py-0'}`}>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4 lg:mb-12">
              <h2 id="t-trayectoria" className="display text-[clamp(3rem,8vw,7.5rem)]">
                {trayectoria.titulo}
              </h2>
            </div>

            <div ref={trayViewportRef} className="lg:overflow-visible">
              <div
                ref={trayTrackRef}
                className={
                  reduced
                    ? 'grid gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-[4vw]'
                    : 'flex flex-col gap-14 lg:w-max lg:flex-row lg:gap-[4vw]'
                }
              >
                {trayectoria.hitos.map((hito) => (
                  <article key={hito.fecha} className={reduced ? '' : 'lg:w-[min(30vw,460px)] lg:shrink-0'}>
                    <Media
                      tipo={'tipo' in hito.imagen ? hito.imagen.tipo : 'foto'}
                      ajuste={'ajuste' in hito.imagen ? hito.imagen.ajuste : 'cubrir'}
                      descripcion={hito.imagen.descripcion}
                      alt={hito.imagen.alt}
                      src={hito.imagen.src}
                      className="aspect-[4/3] lg:aspect-[16/11]"
                    />
                    <h3 className="mt-5 text-[clamp(1.6rem,2.2vw,2.15rem)] leading-[1.05] font-bold tracking-[-0.02em] text-celeste">
                      {hito.fecha}
                    </h3>
                    <p className="mt-3 max-w-[40ch] text-lg leading-snug text-paper/85">{hito.descripcion}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LO QUE ME TOCÓ SUPERAR */}
        <section id="superacion" aria-labelledby="t-superacion" className="border-t border-paper/10 bg-ink text-paper">
          <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 sm:py-36">
            <h2
              id="t-superacion"
              className="display max-w-[12ch] text-[clamp(2.75rem,7vw,6.5rem)] [text-wrap:balance]"
            >
              {superacion.titulo}
            </h2>

            <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <Media
                  tipo={superacion.imagen.tipo}
                  descripcion={superacion.imagen.descripcion}
                  alt={superacion.imagen.alt}
                  src={superacion.imagen.src}
                  className="reveal-media aspect-[4/5] lg:sticky lg:top-28"
                />
              </div>
              <div className="lg:col-span-7">
                <ScrubText
                  text={superacion.relato}
                  className="text-[clamp(1.35rem,2.2vw,2.1rem)] leading-[1.32] font-normal tracking-[-0.01em]"
                />
                <p className="display mt-14 text-[clamp(2rem,4vw,3.75rem)] leading-[1.05] text-celeste [text-wrap:balance]">
                  {superacion.hoy}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PANTALLA COMPLETA */}
        <section aria-label={pantallaCompleta.descripcion} className="pantalla-completa relative h-[85svh] min-h-[480px] overflow-hidden bg-ink">
          <div className="pantalla-media absolute inset-0 will-change-transform">
            <Media
              tipo={pantallaCompleta.tipo}
              descripcion={pantallaCompleta.descripcion}
              alt={pantallaCompleta.alt}
              src={pantallaCompleta.src}
              className="h-full"
            />
          </div>
        </section>

        {/* DÓNDE ESTOY HOY */}
        <section id="comparativa" aria-labelledby="t-comparativa" className="bg-paper text-ink">
          <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 sm:py-32">
            <h2 id="t-comparativa" className="display text-[clamp(3rem,8vw,7.5rem)]">
              {comparativa.titulo}
            </h2>
            <p className="mt-5 max-w-[40ch] text-lg text-ink/75 sm:text-xl">{comparativa.bajada}</p>

            <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
              {comparativa.tablas.map((tabla) => (
                <table key={tabla.id} className="w-full border-collapse text-left">
                  <caption className="mb-5 text-left">
                    <span className="display block text-[clamp(1.9rem,3vw,2.75rem)]">{tabla.prueba}</span>
                    <span className="label mt-2 block text-ink/70">{tabla.detalle}</span>
                  </caption>
                  <thead>
                    <tr className="label border-b border-ink text-ink/70">
                      <th scope="col" className="py-2 pr-4 font-medium">
                        Puesto
                      </th>
                      <th scope="col" className="py-2 text-right font-medium">
                        Marca ({tabla.unidad})
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabla.filas.map((fila) => (
                      <tr
                        key={`${tabla.id}-${fila.puesto}`}
                        className={
                          fila.esPropia ? 'bg-celeste' : 'border-b border-ink/15'
                        }
                      >
                        <th
                          scope="row"
                          className={`py-3 pr-4 text-left text-lg ${fila.esPropia ? 'pl-4 font-bold' : 'font-medium'}`}
                        >
                          {fila.esPropia ? `${fila.puesto}, mi marca` : fila.puesto}
                        </th>
                        <td className={`figures py-3 text-right text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none ${fila.esPropia ? 'pr-4' : ''}`}>
                          {fila.marca}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </div>

            <p className="mt-10 max-w-[75ch] text-sm leading-relaxed text-ink/70">{comparativa.nota}</p>
          </div>
        </section>

        {/* OBJETIVOS 2027 */}
        <section id="objetivos" aria-labelledby="t-objetivos" className="bg-ink text-paper">
          <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 sm:py-32">
            <h2 id="t-objetivos" className="display text-[clamp(3rem,8vw,7.5rem)]">
              {objetivos.titulo}
            </h2>
            <ul className="mt-12 sm:mt-16">
              {objetivos.items.map((o) => (
                <li
                  key={o.cifra}
                  className="grid gap-2 border-t border-paper/15 py-6 last:border-b sm:grid-cols-12 sm:items-baseline sm:gap-10 sm:py-8"
                >
                  <span className="display text-[clamp(2.5rem,6vw,5.5rem)] text-celeste sm:col-span-6">{o.cifra}</span>
                  <span className="text-xl leading-snug text-paper/90 sm:col-span-6 sm:text-2xl">{o.texto}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* QUÉ NECESITO */}
        <section id="que-necesito" aria-labelledby="t-necesito" className="bg-celeste text-ink">
          <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 sm:py-36">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
              <h2 id="t-necesito" className="display text-[clamp(3.5rem,10vw,9.5rem)] lg:col-span-7">
                {queNecesito.titulo}
              </h2>
              <div className="lg:col-span-5 lg:pb-3">
                <p className="text-xl leading-snug sm:text-2xl">{queNecesito.entrada}</p>
                <p className="mt-4 text-xl font-bold sm:text-2xl">{queNecesito.remate}</p>
              </div>
            </div>

            <ul className="mt-16 grid sm:mt-20 md:grid-cols-2 md:gap-x-10">
              {queNecesito.items.map((item) => (
                <li key={item.nombre} className="border-t border-ink/25 py-5 sm:py-7">
                  <span className="block text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] font-bold tracking-[-0.025em]">
                    {item.nombre}
                  </span>
                  <span className="mt-2 block text-base text-ink/75 sm:text-lg">{item.detalle}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* GALERÍA */}
        <section id="galeria" aria-labelledby="t-galeria" className="bg-paper text-ink">
          <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 sm:py-32">
            <h2 id="t-galeria" className="sr-only">
              {galeria.titulo}
            </h2>

            <div className="grid grid-flow-dense auto-rows-[44vw] grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[min(19vw,300px)] lg:grid-cols-4">
              {galeria.items.map((item) => (
                <Media
                  key={item.id}
                  tipo={item.tipo}
                  descripcion={item.descripcion}
                  alt={item.alt}
                  src={item.src}
                  tono="claro"
                  className={`reveal-media h-full ${formatoGaleria[item.formato]}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CIERRE */}
        <footer className="bg-ink text-paper">
          <div className="mx-auto max-w-[1600px] px-5 pt-28 pb-8 sm:px-10 sm:pt-40">
            <p
              ref={cierreRef}
              className="display origin-left text-[clamp(3rem,10.5vw,10rem)] [text-wrap:balance]"
            >
              {portada.frase}
            </p>
            <p className="mt-10 text-xl text-paper/85 sm:text-2xl">{cierre.gracias}</p>
            <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6">
              <p className="label text-paper/70">{cierre.pie}</p>
              <a
                href="#portada"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('#portada');
                }}
                className="label text-paper/70 hover:text-paper hover:underline"
              >
                Volver arriba
              </a>
            </div>
          </div>
        </footer>
      </main>
    </MotionConfig>
  );
}
