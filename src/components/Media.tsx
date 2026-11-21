import {Play} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import {usePrefersReducedMotion} from '../hooks/usePrefersReducedMotion';

interface MediaProps {
  tipo?: 'foto' | 'video';
  descripcion: string;
  alt: string;
  src?: string;
  srcSecundaria?: string;
  /** "contener" muestra la imagen entera sin recortar (para capturas con texto) */
  ajuste?: 'cubrir' | 'contener';
  /** Tono del espacio vacío según el fondo de la sección */
  tono?: 'oscuro' | 'claro';
  className?: string;
  /** Muestra el pie de foto debajo */
  pie?: boolean;
  /** Dónde va la descripción del espacio vacío */
  etiquetaArriba?: boolean;
  /** Carga y reproduce el video apenas abre la página (solo para la portada) */
  prioridad?: boolean;
}

/** Video silencioso en loop que solo se reproduce mientras está en pantalla. */
function VideoEnPantalla({src, alt, encaje, prioridad}: {src: string; alt: string; encaje: string; prioridad: boolean}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {rootMargin: '200px 0px'},
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      src={src}
      aria-label={alt}
      className={`absolute inset-0 h-full w-full ${encaje}`}
      muted
      loop
      playsInline
      preload={prioridad ? 'auto' : 'metadata'}
      controls={reduced}
    />
  );
}

/**
 * Foto o video. Mientras no haya archivo, muestra un espacio reservado
 * con la descripción de qué foto va ahí.
 */
export function Media({
  tipo = 'foto',
  descripcion,
  alt,
  src,
  srcSecundaria,
  ajuste = 'cubrir',
  tono = 'oscuro',
  className = '',
  pie = false,
  etiquetaArriba = false,
  prioridad = false,
}: MediaProps) {
  const [segunda, setSegunda] = useState(false);
  const tieneSegunda = tipo === 'foto' && Boolean(srcSecundaria);
  const encaje = ajuste === 'contener' ? 'object-contain' : 'object-cover';

  const vacio = tono === 'oscuro' ? 'bg-ink-2 text-mist' : 'bg-paper-2 text-ink/75';

  const reservado = (
    <div
      role="img"
      aria-label={alt}
      className={`absolute inset-0 flex justify-between gap-3 p-4 sm:p-5 ${etiquetaArriba ? 'items-start pt-20 sm:pt-24' : 'items-end'} ${vacio}`}
    >
      <span className="label">{descripcion}</span>
      <span className="label inline-flex items-center gap-1.5">
        {tipo === 'video' && <Play className="h-3.5 w-3.5" aria-hidden="true" />}
        {tipo === 'video' ? 'Video' : 'Foto'}
      </span>
    </div>
  );

  let contenido;
  if (!src) {
    contenido = reservado;
  } else if (tipo === 'video') {
    contenido = <VideoEnPantalla src={src} alt={alt} encaje={encaje} prioridad={prioridad} />;
  } else {
    contenido = (
      <>
        <img
          src={src}
          alt={alt}
          loading={prioridad ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full ${encaje}`}
        />
        {tieneSegunda && (
          <img
            src={srcSecundaria}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className={`absolute inset-0 h-full w-full ${encaje} transition-opacity duration-500 ease-out group-hover:opacity-100 ${
              segunda ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </>
    );
  }

  const fondo = src ? (tono === 'oscuro' ? 'bg-ink-2' : 'bg-paper-2') : '';

  return (
    <figure className={`flex flex-col ${className}`}>
      {tieneSegunda && src ? (
        <button
          type="button"
          onClick={() => setSegunda((v) => !v)}
          aria-pressed={segunda}
          aria-label={`${alt}. Tocá para ver otra foto`}
          className={`group relative block w-full flex-1 overflow-hidden ${fondo}`}
        >
          {contenido}
        </button>
      ) : (
        <div className={`relative w-full flex-1 overflow-hidden ${fondo}`}>{contenido}</div>
      )}
      {pie && <figcaption className="label mt-3 opacity-75">{descripcion}</figcaption>}
    </figure>
  );
}
