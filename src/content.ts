export interface MarcaItem {
  id: string;
  prueba: string;
  numeroFinal: number;
  decimales: number;
  unidad: string;
}

export interface MediaAsset {
  descripcion: string;
  alt: string;
  /** Ruta de la foto o video (ej: "/media/portada.jpg"). Vacío = espacio reservado. */
  src: string;
  tipo?: 'foto' | 'video';
  /** 'contener' muestra la imagen entera sin recortar (capturas con texto) */
  ajuste?: 'cubrir' | 'contener';
}

export interface TrayectoriaHito {
  fecha: string;
  descripcion: string;
  imagen: MediaAsset;
}

export interface FilaTablero {
  puesto: string;
  marca: string;
  esPropia?: boolean;
}

export interface TablaComparativa {
  id: string;
  prueba: string;
  detalle: string;
  unidad: string;
  filas: FilaTablero[];
}

export interface ObjetivoItem {
  cifra: string;
  texto: string;
}

export interface GaleriaItem extends MediaAsset {
  id: string;
  tipo: 'foto' | 'video';
  /** Segunda foto que aparece al pasar el mouse o tocar en celular */
  srcSecundaria?: string;
  /** Cómo se ubica en la grilla en pantallas grandes */
  formato: 'completa' | 'grande' | 'alta' | 'ancha' | 'normal';
}

export const siteContent = {
  navegacion: {
    marca: 'Santino Chaud',
    enlaces: [
      {label: 'Marcas', href: '#marcas'},
      {label: 'Trayectoria', href: '#trayectoria'},
      {label: 'Objetivos', href: '#objetivos'},
      {label: 'Qué necesito', href: '#que-necesito'},
    ],
    menuCompleto: [
      {label: 'Inicio', href: '#portada'},
      {label: 'Sobre mí', href: '#sobre-mi'},
      {label: 'Los sports', href: '#sports'},
      {label: 'Mis marcas', href: '#marcas'},
      {label: 'Trayectoria', href: '#trayectoria'},
      {label: 'Lo que me tocó superar', href: '#superacion'},
      {label: 'Dónde estoy hoy', href: '#comparativa'},
      {label: 'Objetivos 2027', href: '#objetivos'},
      {label: 'Qué necesito', href: '#que-necesito'},
      {label: 'Galería', href: '#galeria'},
    ],
  },

  portada: {
    nombre: 'Santino Chaud',
    bajada: 'Velocista y saltador · 18\u00a0años · Pilar, Buenos\u00a0Aires',
    frase: 'Esfuerzo, pasión, superación.',
    imagen: {
      tipo: 'video',
      descripcion: 'Foto principal compitiendo en pista',
      alt: 'Video de Santino corriendo en la pista de atletismo',
      src: '/media/portada.mp4',
    } satisfies MediaAsset,
  },

  sobreMi: {
    titulo: 'Sobre mí',
    texto:
      'Tengo 18 años y vivo en Pilar. Hace 3 años empecé a ir al gimnasio. En los últimos 2 años me empezó a ir muy bien en atletismo del colegio, y en 2026 decidí dedicarme de lleno: empecé a entrenar y competir afuera.',
  },

  sports: {
    titulo: 'Los sports',
    bajada: 'De dónde vengo: un colegio y una camada que compiten en todo.',
    texto:
      'Los sports son la fecha más importante del año en mi colegio, y mi camada es la más competitiva de la historia del colegio. En 2026 ganamos el ADE, el torneo intercolegial, y a donde vamos somos competitivos. Competir con un equipo así me empujó a ser bueno en todo: en los últimos tres años gané 24 medallas en 9 disciplinas.',
    numeros: [
      {id: 'medallas', valor: 24, etiqueta: 'medallas'},
      {id: 'disciplinas', valor: 9, etiqueta: 'disciplinas'},
    ],
    numerosAclaracion: 'En los últimos 3 años',
    disciplinas: [
      {grupo: 'Velocidad', pruebas: ['100 m', '200 m', 'Postas']},
      {grupo: 'Saltos', pruebas: ['Largo', 'Triple', 'Alto']},
      {grupo: 'Lanzamientos', pruebas: ['Jabalina', 'Disco', 'Bala']},
    ],
    imagen: {
      descripcion: 'Trofeo de la champion',
      alt: 'Los trofeos y las medallas que gané en los sports',
      src: '/media/sports-trofeos.jpg',
    } satisfies MediaAsset,
  },

  marcas: {
    titulo: 'Mis marcas',
    aclaracion: 'Cronometraje electrónico',
    items: [
      {id: '60m', prueba: '60 m', numeroFinal: 6.99, decimales: 2, unidad: 's'},
      {id: '100m', prueba: '100 m', numeroFinal: 11.1, decimales: 1, unidad: 's'},
      {id: '200m', prueba: '200 m', numeroFinal: 22.8, decimales: 1, unidad: 's'},
      {id: 'largo', prueba: 'Salto en largo', numeroFinal: 6.42, decimales: 2, unidad: 'm'},
      {id: 'triple', prueba: 'Salto triple', numeroFinal: 13.3, decimales: 2, unidad: 'm'},
    ] satisfies MarcaItem[],
  },

  trayectoria: {
    titulo: 'Trayectoria',
    hitos: [
      {
        fecha: '2023',
        descripcion: 'Empiezo el gimnasio.',
        imagen: {
          descripcion: '2023 · Gimnasio',
          alt: 'Santino en 2023, cuando empezó a ir al gimnasio',
          src: '/media/trayectoria-2023-gimnasio.jpg',
        },
      },
      {
        fecha: 'Últimos 2 años',
        descripcion: 'Me destaco en el colegio. Récord intercolegial ADE de 200 m (22,8 s).',
        imagen: {
          descripcion: 'Récord intercolegial ADE 200 m',
          alt: 'Publicación del colegio con los resultados del torneo intercolegial ADE',
          src: '/media/trayectoria-record-ade.jpg',
          ajuste: 'contener',
        },
      },
      {
        fecha: 'La champion, 3 años seguidos',
        descripcion:
          '“Es el trofeo para quien suma más puntos en el día, en todas las disciplinas. Para ganarlo hay que ser bueno en todo.”',
        imagen: {
          descripcion: 'Trofeo de la champion',
          alt: 'Video de los sports del colegio',
          src: '/media/trayectoria-champion.mp4',
          tipo: 'video',
        },
      },
      {
        fecha: '2026',
        descripcion:
          'Entreno en Tigre y compito en torneos metropolitanos (11,1 en 100 m · 22,8 en 200 m · 6,42 m en largo).',
        imagen: {
          descripcion: '2026 · Torneos metropolitanos',
          alt: 'Santino en el podio de un torneo metropolitano en 2026',
          src: '/media/trayectoria-2026-podio.jpg',
        },
      },
      {
        fecha: 'Junio 2026',
        descripcion: '6,99 en 60 m y, en el mismo torneo, lesión de rodilla. 3 meses sin entrenar.',
        imagen: {
          descripcion: 'Junio 2026 · 60 m',
          alt: 'Video de una largada en la pista',
          src: '/media/trayectoria-junio-2026.mp4',
          tipo: 'video',
        },
      },
      {
        fecha: 'Vuelta a competir',
        descripcion:
          'Después de la lesión y 3 meses sin entrenar, 2.º en salto en largo en los Juegos Bonaerenses, a un paso de clasificar a Mar del Plata.',
        imagen: {
          descripcion: 'Juegos Bonaerenses · Salto en largo',
          alt: 'Video de Santino corriendo en la pista',
          src: '/media/trayectoria-vuelta.mp4',
          tipo: 'video',
        },
      },
      {
        fecha: 'Octubre 2026',
        descripcion: 'Champion ganada lesionado y enfermo.',
        imagen: {
          descripcion: 'Octubre 2026 · Champion',
          alt: 'Video de una carrera en los sports del colegio',
          src: '/media/trayectoria-octubre-2026.mp4',
          tipo: 'video',
        },
      },
    ] satisfies TrayectoriaHito[],
  },

  superacion: {
    titulo: 'Lo que me tocó superar',
    imagen: {
      descripcion: 'Vuelta a las pistas',
      alt: 'Video de Santino abrazado con sus compañeros en los sports del colegio',
      src: '/media/superacion.mp4',
      tipo: 'video',
    } satisfies MediaAsset,
    relato:
      'En junio, en un torneo metropolitano, corrí los 60 metros en 6,99. Ese mismo día, en salto en largo, me abrí la rodilla contra el cajón y estuve 3 meses sin entrenar. Cuando volví, salí 2.º en salto en largo en los Juegos Bonaerenses y quedé a un paso de clasificar a Mar del Plata. En octubre, en las últimas pruebas de los sports del colegio, me desgarré la pierna. Hacía mucho frío y estaba con fiebre, otitis y antibióticos. Igual gané la champion por tercer año seguido, gracias a los puntos que había sumado antes en el día.',
    hoy: 'Hoy estoy recuperado de las dos lesiones y listo para dar el siguiente paso.',
  },

  /** Video o foto a pantalla completa entre "Lo que me tocó superar" y "Dónde estoy hoy" */
  pantallaCompleta: {
    tipo: 'foto',
    descripcion: 'Foto a pantalla completa · un salto',
    alt: 'Santino en el foso de salto',
    src: '/media/pantalla-completa.jpg',
  } satisfies MediaAsset,

  comparativa: {
    titulo: 'Dónde estoy hoy',
    bajada: 'Mis marcas al lado de las finales del Campeonato Argentino U20 2026.',
    tablas: [
      {
        id: '100m',
        prueba: '100 m',
        detalle: 'Final A, Campeonato Argentino U20 2026',
        unidad: 's',
        filas: [
          {puesto: '1.º', marca: '10,69'},
          {puesto: '2.º', marca: '10,83'},
          {puesto: '3.º', marca: '11,07'},
          {puesto: 'Yo', marca: '11,1', esPropia: true},
          {puesto: '4.º', marca: '11,14'},
          {puesto: '5.º', marca: '11,18'},
        ],
      },
      {
        id: 'largo',
        prueba: 'Salto en largo',
        detalle: 'Final, Campeonato Argentino U20 2026',
        unidad: 'm',
        filas: [
          {puesto: '1.º', marca: '7,19'},
          {puesto: '2.º', marca: '6,63'},
          {puesto: '3.º', marca: '6,49'},
          {puesto: 'Yo', marca: '6,42', esPropia: true},
          {puesto: '4.º', marca: '6,41'},
        ],
      },
    ] satisfies TablaComparativa[],
    nota: 'Fuente: World Athletics, Campeonato Argentino U20, Rosario, mayo de 2026. Mis marcas son de otras competencias y se muestran como referencia.',
  },

  objetivos: {
    titulo: 'Objetivos 2027',
    items: [
      {cifra: '10,7 s', texto: 'Llegar a los 10,7 segundos en 100 m.'},
      {cifra: '6,80 m', texto: 'Pasar los 6,80 m en salto en largo.'},
      {cifra: 'Nacionales', texto: 'Competir en los Nacionales.'},
      {cifra: 'Club nuevo', texto: 'Entrenar con un profesor profesional en un nuevo club.'},
    ] satisfies ObjetivoItem[],
  },

  galeria: {
    titulo: 'Galería',
    items: [
      {id: 'galeria-1', tipo: 'video', formato: 'completa', descripcion: 'Sports del colegio', alt: 'Video de los sports del colegio', src: '/media/galeria-1.mp4'},
      {id: 'galeria-2', tipo: 'video', formato: 'alta', descripcion: 'Sports del colegio', alt: 'Video vertical de una prueba en los sports', src: '/media/galeria-2.mp4'},
      {id: 'galeria-3', tipo: 'video', formato: 'grande', descripcion: 'Sports del colegio', alt: 'Video de la pista de los sports', src: '/media/galeria-3.mp4'},
      {id: 'galeria-4', tipo: 'video', formato: 'alta', descripcion: 'Sports del colegio', alt: 'Video vertical de una carrera en los sports', src: '/media/galeria-4.mp4'},
    ] satisfies GaleriaItem[],
  },

  queNecesito: {
    titulo: 'Qué necesito',
    entrada:
      'Todo esto lo logré sin un equipo profesional: sin un plan de entrenamiento específico, sin seguimiento de nutrición y sin recuperación.',
    remate: 'Ahora quiero hacerlo en serio.',
    items: [
      {nombre: 'Entrenador', detalle: 'Un plan pensado para velocidad y salto.'},
      {nombre: 'Kinesiología', detalle: 'Prevenir lesiones como las de este año.'},
      {nombre: 'Nutrición', detalle: 'Comer para rendir y recuperar.'},
      {nombre: 'Psicóloga deportiva', detalle: 'La cabeza también compite.'},
      {nombre: 'Indumentaria', detalle: 'Ropa y calzado para entrenar y competir.'},
      {nombre: 'Traslados', detalle: 'Llegar a entrenar y a competir.'},
    ],
  },

  cierre: {
    gracias: 'Gracias por llegar hasta acá.',
    pie: 'Santino Chaud · Pilar, Buenos Aires · 2026',
  },
} as const;
