import {useState} from 'react';

interface MediaPlaceholderProps {
  tipo?: 'foto' | 'video';
  etiqueta: string;
  descripcion: string;
  alt: string;
  src?: string;
  srcSecundaria?: string;
  etiquetaSecundaria?: string;
  descripcionSecundaria?: string;
  aspectClass?: string;
  roundedClass?: string;
  showCaption?: boolean;
}

export function MediaPlaceholder({
  tipo = 'foto',
  etiqueta,
  descripcion,
  alt,
  src,
  srcSecundaria,
  etiquetaSecundaria,
  descripcionSecundaria,
  aspectClass = 'aspect-[4/3]',
  roundedClass = 'rounded-2xl',
  showCaption = true,
}: MediaPlaceholderProps) {
  const [toggled, setToggled] = useState(false);
  const hasSecondary = tipo === 'foto' && Boolean(etiquetaSecundaria || srcSecundaria);

  if (tipo === 'video') {
    return (
      <figure className="flex flex-col h-full">
        {src ? (
          <div className={`relative w-full overflow-hidden bg-[#2E2A2B] ${roundedClass} ${aspectClass}`}>
            <video
              src={src}
              controls
              preload="metadata"
              aria-label={alt}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div
            role="img"
            aria-label={alt}
            className={`relative w-full ${aspectClass} ${roundedClass} bg-[#2E2A2B] text-white flex flex-col items-center justify-center border border-white/15 select-none overflow-hidden`}
          >
            <div
              aria-hidden="true"
              className="absolute inset-3 rounded-xl border border-white/12 pointer-events-none"
            />
            <span className="font-display-condensed text-2xl sm:text-3xl tracking-wide uppercase text-white">
              {etiqueta}
            </span>
            <span className="mt-1 text-xs font-semibold text-white/75 px-4 text-center">
              {descripcion}
            </span>
          </div>
        )}
        {showCaption && (
          <figcaption className="mt-3 text-sm font-normal text-white/85">
            {descripcion}
          </figcaption>
        )}
      </figure>
    );
  }

  if (hasSecondary) {
    return (
      <figure className="flex flex-col h-full">
        <button
          type="button"
          onClick={() => setToggled((prev) => !prev)}
          aria-pressed={toggled}
          aria-label={`${alt}. Tocá o pasá el mouse para ver la segunda imagen`}
          className={`group relative w-full text-left ${aspectClass} ${roundedClass} overflow-hidden border border-white/15 bg-[#2E2A2B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer`}
        >
          {/* Imagen 1 */}
          <div className="absolute inset-0 w-full h-full">
            {src ? (
              <img
                src={src}
                alt={alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#2E2A2B] text-white flex flex-col items-center justify-center select-none relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-3 rounded-xl border border-white/12 pointer-events-none"
                />
                <span className="font-display-condensed text-2xl sm:text-3xl tracking-wide uppercase text-white">
                  {etiqueta}
                </span>
                <span className="mt-1 text-xs font-semibold text-white/75 px-4 text-center">
                  {descripcion}
                </span>
              </div>
            )}
          </div>

          {/* Imagen 2 (fundido al pasar el mouse o tocar en celular) */}
          <div
            aria-hidden={!toggled}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 ${
              toggled ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {srcSecundaria ? (
              <img
                src={srcSecundaria}
                alt={descripcionSecundaria ?? alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#3E373A] text-white flex flex-col items-center justify-center select-none relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-3 rounded-xl border border-white/20 pointer-events-none"
                />
                <span className="font-display-condensed text-2xl sm:text-3xl tracking-wide uppercase text-white">
                  {etiquetaSecundaria ?? 'Foto 2'}
                </span>
                <span className="mt-1 text-xs font-semibold text-white/80 px-4 text-center">
                  {descripcionSecundaria ?? descripcion}
                </span>
              </div>
            )}
          </div>
        </button>
        {showCaption && (
          <figcaption className="mt-3 text-sm font-normal text-white/85 flex items-center justify-between gap-2">
            <span>{descripcion}</span>
            <span className="text-xs font-semibold text-white/60 lg:hidden">
              {toggled ? '2 / 2' : '1 / 2'}
            </span>
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="flex flex-col h-full">
      {src ? (
        <div className={`relative w-full overflow-hidden bg-[#2E2A2B] ${roundedClass} ${aspectClass}`}>
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={`relative w-full ${aspectClass} ${roundedClass} bg-[#2E2A2B] text-white flex flex-col items-center justify-center border border-white/15 select-none overflow-hidden`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-3 rounded-xl border border-white/12 pointer-events-none"
          />
          <span className="font-display-condensed text-2xl sm:text-3xl tracking-wide uppercase text-white">
            {etiqueta}
          </span>
          <span className="mt-1 text-xs font-semibold text-white/75 px-4 text-center">
            {descripcion}
          </span>
        </div>
      )}
      {showCaption && (
        <figcaption className="mt-3 text-sm font-normal text-white/85">
          {descripcion}
        </figcaption>
      )}
    </figure>
  );
}
