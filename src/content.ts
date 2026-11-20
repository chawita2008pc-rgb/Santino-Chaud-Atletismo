export interface MarcaItem {
  id: string;
  prueba: string;
  valor: string;
  numeroFinal: number;
  decimales: number;
  unidad: string;
}

export interface MediaAsset {
  etiqueta: string;
  descripcion: string;
  alt: string;
  src: string;
}

export interface TrayectoriaHito {
  numero: string;
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
  titulo: string;
  unidad: string;
  filas: FilaTablero[];
}

export interface ObjetivoItem {
  numero: string;
  texto: string;
}

export interface GaleriaItem {
  id: string;
  tipo: 'foto' | 'video';
  etiqueta: string;
  descripcion: string;
  alt: string;
  /** Reemplazar por la ruta de la foto o video cuando esté disponible (ej: "/media/foto-1.jpg") */
  src: string;
  /** Segunda foto que aparece al pasar el mouse o tocar en celular */
  srcSecundaria?: string;
  etiquetaSecundaria?: string;
  descripcionSecundaria?: string;
}

export interface CanalContacto {
  id: 'mail' | 'instagram' | 'tiktok';
  etiqueta: string;
  valorVisible: string;
  href: string;
}

export interface MenuEnlaceCompleto {
  label: string;
  href: string;
  previewFoto: MediaAsset;
}

export const siteContent = {
  navegacion: {
    marca: 'Santino Chaud',
    enlaces: [
      {label: 'Marcas', href: '#marcas'},
      {label: 'Trayectoria', href: '#trayectoria'},
      {label: 'Comparativa', href: '#comparativa'},
      {label: 'Objetivos', href: '#objetivos'},
      {label: 'Apoyame', href: '#apoyame'},
    ],
    cta: {
      label: 'Contacto',
      href: '#contacto',
    },
    menuCompleto: [
      {
        label: 'Portada',
        href: '#portada',
        previewFoto: {
          etiqueta: 'Foto',
          descripcion: 'Portada en competencia',
          alt: 'Vista previa de portada',
          src: '',
        },
      },
      {
        label: 'Mis marcas',
        href: '#marcas',
        previewFoto: {
          etiqueta: 'Foto',
          descripcion: 'Marcas en pista',
          alt: 'Vista previa de marcas',
          src: '',
        },
      },
      {
        label: 'Sobre mí',
        href: '#sobre-mi',
        previewFoto: {
          etiqueta: 'Foto',
          descripcion: 'Entrenamiento y gimnasio',
          alt: 'Vista previa sobre mí',
          src: '',
        },
      },
      {
        label: 'Trayectoria',
        href: '#trayectoria',
        previewFoto: {
          etiqueta: 'Foto',
          descripcion: 'Torneos y evolución',
          alt: 'Vista previa trayectoria',
          src: '',
        },
      },
      {
        label: 'Lo que me tocó superar',
        href: '#superacion',
        previewFoto: {
          etiqueta: 'Foto',
          descripcion: 'Vuelta a las pistas',
          alt: 'Vista previa superación',
          src: '',
        },
      },
      {
        label: 'Dónde estoy hoy',
        href: '#comparativa',
        previewFoto: {
          etiqueta: 'Foto',
          descripcion: 'Comparativa U20',
          alt: 'Vista previa comparativa',
          src: '',
        },
      },
      {
        label: 'Objetivos 2027',
        href: '#objetivos',
        previewFoto: {
          etiqueta: 'Foto',
          descripcion: 'Metas temporada 2027',
          alt: 'Vista previa objetivos 2027',
          src: '',
        },
      },
      {
        label: 'Galería',
        href: '#galeria',
        previewFoto: {
          etiqueta: 'Foto',
          descripcion: 'Salidas, saltos y podios',
          alt: 'Vista previa galería',
          src: '',
        },
      },
      {
        label: 'Apoyame',
        href: '#apoyame',
        previewFoto: {
          etiqueta: 'Foto',
          descripcion: 'Alianza con sponsors',
          alt: 'Vista previa apoyame',
          src: '',
        },
      },
      {
        label: 'Contacto',
        href: '#contacto',
        previewFoto: {
          etiqueta: 'Foto',
          descripcion: 'Contacto directo',
          alt: 'Vista previa contacto',
          src: '',
        },
      },
    ] satisfies MenuEnlaceCompleto[],
  },

  cinta: 'ESFUERZO · PASIÓN · SUPERACIÓN',

  portada: {
    nombre: 'Santino Chaud',
    bajada: 'Velocista y saltador · 18 años · Pilar, Buenos Aires',
    frase: 'Esfuerzo, pasión, superación.',
    botonPrimario: {
      label: 'Mi trayectoria',
      href: '#trayectoria',
    },
    botonSecundario: {
      label: 'Contacto',
      href: '#contacto',
    },
    imagen: {
      etiqueta: 'Foto',
      descripcion: 'Foto principal compitiendo en pista',
      alt: 'Espacio reservado para foto principal de Santino Chaud compitiendo',
      /** Completar con la ruta de tu foto principal (ej: "/media/portada.jpg") */
      src: '',
    },
  },

  marcas: {
    titulo: 'Mis marcas',
    aclaracion: 'Cronometraje electrónico',
    items: [
      {id: '60m', prueba: '60 m', valor: '6,99 s', numeroFinal: 6.99, decimales: 2, unidad: 's'},
      {id: '100m', prueba: '100 m', valor: '11,1 s', numeroFinal: 11.1, decimales: 1, unidad: 's'},
      {id: '200m', prueba: '200 m', valor: '22,8 s', numeroFinal: 22.8, decimales: 1, unidad: 's'},
      {
        id: 'largo',
        prueba: 'Salto en largo',
        valor: '6,42 m',
        numeroFinal: 6.42,
        decimales: 2,
        unidad: 'm',
      },
      {
        id: 'triple',
        prueba: 'Salto triple',
        valor: '13,30 m',
        numeroFinal: 13.3,
        decimales: 2,
        unidad: 'm',
      },
    ] satisfies MarcaItem[],
  },

  sobreMi: {
    titulo: 'Sobre mí',
    texto:
      'Tengo 18 años y vivo en Pilar. Hace 3 años empecé a ir al gimnasio y ahí cambió todo. En los últimos 2 años me empezó a ir muy bien en el atletismo del colegio, y en 2026 decidí dedicarme de lleno: empecé a entrenar y competir afuera. En 2027 empiezo Administración de Empresas en la UBA.',
  },

  trayectoria: {
    titulo: 'Trayectoria',
    hitos: [
      {
        numero: '01',
        fecha: '2023',
        descripcion: 'Empiezo el gimnasio.',
        imagen: {
          etiqueta: 'Foto',
          descripcion: '2023 · Gimnasio',
          alt: 'Espacio para foto de entrenamiento en gimnasio 2023',
          src: '',
        },
      },
      {
        numero: '02',
        fecha: 'Últimos 2 años',
        descripcion: 'Me destaco en el colegio. Récord intercolegial ADE de 200 m (22,8 s).',
        imagen: {
          etiqueta: 'Foto',
          descripcion: 'Récord intercolegial ADE 200 m',
          alt: 'Espacio para foto del récord intercolegial ADE de 200 m',
          src: '',
        },
      },
      {
        numero: '03',
        fecha: 'La champion, 3 años seguidos',
        descripcion:
          '"Es el trofeo para quien suma más puntos en el día, en todas las disciplinas. Para ganarlo hay que ser bueno en todo."',
        imagen: {
          etiqueta: 'Foto',
          descripcion: 'Trofeo de la champion',
          alt: 'Espacio para foto con el trofeo de la champion',
          src: '',
        },
      },
      {
        numero: '04',
        fecha: '2026',
        descripcion:
          'Entreno en Tigre y compito en torneos metropolitanos (11,1 en 100 m · 22,8 en 200 m · 6,42 m en largo).',
        imagen: {
          etiqueta: 'Foto',
          descripcion: '2026 · Torneos metropolitanos',
          alt: 'Espacio para foto compitiendo en torneos metropolitanos 2026',
          src: '',
        },
      },
      {
        numero: '05',
        fecha: 'Junio 2026',
        descripcion:
          '6,99 en 60 m y, en el mismo torneo, lesión de rodilla. 3 meses sin entrenar.',
        imagen: {
          etiqueta: 'Foto',
          descripcion: 'Junio 2026 · 60 m',
          alt: 'Espacio para foto de torneo de junio 2026',
          src: '',
        },
      },
      {
        numero: '06',
        fecha: 'Vuelta a competir',
        descripcion:
          '2.º en salto en largo en los Juegos Bonaerenses, a un paso de clasificar a Mar del Plata.',
        imagen: {
          etiqueta: 'Foto',
          descripcion: 'Juegos Bonaerenses · Salto en largo',
          alt: 'Espacio para foto en los Juegos Bonaerenses',
          src: '',
        },
      },
      {
        numero: '07',
        fecha: 'Octubre 2026',
        descripcion: 'Champion ganada lesionado y enfermo.',
        imagen: {
          etiqueta: 'Foto',
          descripcion: 'Octubre 2026 · Champion',
          alt: 'Espacio para foto de la champion de octubre 2026',
          src: '',
        },
      },
    ] satisfies TrayectoriaHito[],
  },

  superacion: {
    titulo: 'Lo que me tocó superar',
    parrafos: [
      'En junio, en un torneo metropolitano, corrí los 60 metros en 6,99. Ese mismo día, en el salto en largo, me abrí la rodilla contra el cajón y estuve 3 meses sin entrenar. Cuando volví, salí 2.º en salto en largo en los Juegos Bonaerenses y quedé a un paso de clasificar a Mar del Plata. En octubre, en las últimas pruebas de los sports del colegio, me desgarré la pierna. Hacía mucho frío y estaba con fiebre, otitis y antibióticos. Igual gané la champion por tercer año seguido, gracias a los puntos que había sumado antes.',
      'Hoy estoy recuperado de las dos lesiones y listo para dar el siguiente paso.',
    ],
  },

  comparativa: {
    titulo: 'Dónde estoy hoy',
    tablas: [
      {
        id: '100m',
        titulo: '100 m, final A del Campeonato Argentino U20 2026',
        unidad: 's',
        filas: [
          {puesto: '1.º', marca: '10,69'},
          {puesto: '2.º', marca: '10,83'},
          {puesto: '3.º', marca: '11,07'},
          {puesto: 'YO', marca: '11,1', esPropia: true},
          {puesto: '4.º', marca: '11,14'},
          {puesto: '5.º', marca: '11,18'},
        ],
      },
      {
        id: 'largo',
        titulo: 'Salto en largo, final del Campeonato Argentino U20 2026',
        unidad: 'm',
        filas: [
          {puesto: '1.º', marca: '7,19'},
          {puesto: '2.º', marca: '6,63'},
          {puesto: '3.º', marca: '6,49'},
          {puesto: 'YO', marca: '6,42', esPropia: true},
          {puesto: '4.º', marca: '6,41'},
        ],
      },
    ] satisfies TablaComparativa[],
    nota: 'Fuente: World Athletics, Campeonato Argentino U20, Rosario, mayo de 2026. Mis marcas son de otras competencias y se muestran como referencia.',
    cierre:
      'Todo esto lo logré sin un equipo profesional: sin un plan de entrenamiento específico, sin seguimiento de nutrición y sin recuperación. Ahora quiero hacerlo en serio.',
  },

  objetivos: {
    titulo: 'Objetivos 2027',
    items: [
      {numero: '01', texto: 'Bajar de 11 segundos en 100 m.'},
      {numero: '02', texto: 'Pasar los 6,80 m en salto en largo.'},
      {numero: '03', texto: 'Competir en los Nacionales.'},
      {numero: '04', texto: 'Entrenar con un profesor profesional en un nuevo club.'},
    ] satisfies ObjetivoItem[],
  },

  galeria: {
    titulo: 'Galería',
    subtitulo: 'Salidas, saltos, podios y trofeo de la champion.',
    items: [
      {
        id: 'foto-1',
        tipo: 'foto',
        etiqueta: 'Foto',
        descripcion: 'Salidas',
        alt: 'Espacio para foto de salidas en pista',
        src: '',
        srcSecundaria: '',
        etiquetaSecundaria: 'Foto 2',
        descripcionSecundaria: 'Salidas · segunda toma',
      },
      {
        id: 'foto-2',
        tipo: 'foto',
        etiqueta: 'Foto',
        descripcion: 'Saltos',
        alt: 'Espacio para foto de salto en largo o triple',
        src: '',
        srcSecundaria: '',
        etiquetaSecundaria: 'Foto 2',
        descripcionSecundaria: 'Saltos · segunda toma',
      },
      {
        id: 'foto-3',
        tipo: 'foto',
        etiqueta: 'Foto',
        descripcion: 'Podios',
        alt: 'Espacio para foto de podio en torneo',
        src: '',
        srcSecundaria: '',
        etiquetaSecundaria: 'Foto 2',
        descripcionSecundaria: 'Podios · segunda toma',
      },
      {
        id: 'foto-4',
        tipo: 'foto',
        etiqueta: 'Foto',
        descripcion: 'Trofeo de la champion',
        alt: 'Espacio para foto del trofeo de la champion',
        src: '',
        srcSecundaria: '',
        etiquetaSecundaria: 'Foto 2',
        descripcionSecundaria: 'Trofeo de la champion · segunda toma',
      },
      {
        id: 'foto-5',
        tipo: 'foto',
        etiqueta: 'Foto',
        descripcion: 'Competencia',
        alt: 'Espacio para foto de competencia en pista',
        src: '',
        srcSecundaria: '',
        etiquetaSecundaria: 'Foto 2',
        descripcionSecundaria: 'Competencia · segunda toma',
      },
      {
        id: 'foto-6',
        tipo: 'foto',
        etiqueta: 'Foto',
        descripcion: 'Entrenamiento',
        alt: 'Espacio para foto de entrenamiento en pista',
        src: '',
        srcSecundaria: '',
        etiquetaSecundaria: 'Foto 2',
        descripcionSecundaria: 'Entrenamiento · segunda toma',
      },
      {
        id: 'video-1',
        tipo: 'video',
        etiqueta: 'Video',
        descripcion: 'Video de carrera',
        alt: 'Espacio para video de carrera en pista',
        src: '',
      },
      {
        id: 'video-2',
        tipo: 'video',
        etiqueta: 'Video',
        descripcion: 'Video de salto',
        alt: 'Espacio para video de salto en competencia',
        src: '',
      },
    ] satisfies GaleriaItem[],
  },

  apoyame: {
    titulo: 'Apoyame',
    necesitoTitulo: 'Qué necesito',
    necesito: [
      'Entrenador',
      'Kinesiología',
      'Nutrición',
      'Psicóloga deportiva',
      'Masajes de recuperación',
      'Indumentaria',
      'Traslados',
    ],
    ofrezcoTitulo: 'Qué ofrezco',
    ofrezco: [
      'El logo de la marca en mi indumentaria',
      'Contenido en Instagram y TikTok',
      'Charlas',
      'Reportes de resultados',
    ],
    boton: {
      label: 'Quiero apoyarte',
      href: '#contacto',
    },
  },

  contacto: {
    titulo: 'Contacto',
    mail: 'correo@ejemplo.com',
    canales: [
      {
        id: 'mail',
        etiqueta: 'Mail',
        valorVisible: 'correo@ejemplo.com',
        href: 'mailto:correo@ejemplo.com',
      },
      {
        id: 'instagram',
        etiqueta: 'Instagram',
        valorVisible: '@instagram',
        href: 'https://instagram.com/',
      },
      {
        id: 'tiktok',
        etiqueta: 'TikTok',
        valorVisible: '@tiktok',
        href: 'https://tiktok.com/',
      },
    ] satisfies CanalContacto[],
    copiarMailLabel: 'Copiar mail',
    mailCopiadoLabel: 'Mail copiado',
    cierre: 'Gracias por llegar hasta acá.',
    pie: 'Santino Chaud · Pilar, Buenos Aires · 2026',
  },
} as const;
