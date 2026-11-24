import {Fragment} from 'react';
import {siteContent} from '../content';
import {Media} from './Media';

/** Sección "Los sports": el colegio, la camada, las medallas y las disciplinas. */
export function Sports() {
  const {titulo, bajada, texto, numeros, numerosAclaracion, disciplinas, imagen} = siteContent.sports;

  return (
    <section id="sports" aria-labelledby="t-sports" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-5 py-24 sm:px-10 sm:py-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4 sm:mb-16">
          <h2 id="t-sports" className="display text-[clamp(3rem,8vw,7.5rem)]">
            {/* En Archivo expandida la "r" pisa a la "t": se separa solo ese par */}
            {titulo.split('rt').map((parte, i) => (
              <Fragment key={i}>
                {i > 0 && <span className="tracking-[0.03em]">r</span>}
                {i > 0 ? `t${parte}` : parte}
              </Fragment>
            ))}
          </h2>
          <p className="max-w-[34ch] text-lg text-ink/75">{bajada}</p>
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="max-w-[58ch] text-xl leading-[1.45] sm:text-2xl">{texto}</p>

            <div className="mt-14 border-t border-ink/25 pt-6 sm:mt-16">
              <p className="label text-ink/75">{numerosAclaracion}</p>
              <dl className="mt-2 grid grid-cols-2 gap-6">
                {numeros.map((n) => (
                  <div key={n.id} className="flex flex-col-reverse">
                    <dt className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">{n.etiqueta}</dt>
                    <dd className="figures text-[clamp(6rem,17vw,13rem)] leading-[0.85]">
                      <span className="marca-num" data-target={n.valor} data-decimals={0}>
                        {n.valor}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-14 grid gap-8 sm:grid-cols-3 sm:gap-6">
              {disciplinas.map((d) => (
                <div key={d.grupo}>
                  <h3 className="label border-b border-ink pb-2 text-ink/75">{d.grupo}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {d.pruebas.map((prueba) => (
                      <li
                        key={prueba}
                        className="border border-ink/25 px-3 py-1.5 text-base font-semibold"
                      >
                        {prueba}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Media
              descripcion={imagen.descripcion}
              alt={imagen.alt}
              src={imagen.src}
              tono="claro"
              className="reveal-media aspect-[4/5] lg:sticky lg:top-28"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
