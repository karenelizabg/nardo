/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  AMORE · Configuración de la invitación
 * ─────────────────────────────────────────────────────────────────────────────
 *  Este es el ÚNICO archivo que hay que editar para reutilizar la invitación
 *  con otra pareja. Los componentes no contienen textos, fechas ni colores.
 *
 *  ⚠️  TODOS LOS VALORES DE ESTE ARCHIVO SON DATOS DE DEMOSTRACIÓN.
 *      Nombres, fecha, lugares, enlaces y textos son ficticios.
 *      `rsvp.whatsapp` está vacío a propósito: no se inventa ningún teléfono.
 *
 *  Para otra boda:
 *   1. Cambia los textos y datos de abajo.
 *   2. Reemplaza las imágenes de /public/images y apunta a ellas en `locations[].photo`.
 *   3. (Opcional) Ajusta `design.colors` y `design.fonts`.
 *   4. Activa o desactiva secciones en `sections`.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Las rutas a /public llevan la base del sitio (p. ej. /nardo/ en GitHub Pages).
const weddingConfig = {
  /* ── Metadatos de la página ─────────────────────────────────────────────── */
  meta: {
    lang: 'es',
    title: 'Sarahi & Manuel · Invitación de boda',
    description: 'Invitación de boda — datos de demostración.',
  },

  /* ── Pareja ─────────────────────────────────────────────────────────────── */
  couple: {
    // Se muestran apiladas en la portada, en tipografía caligráfica.
    names: ['Sarahi', 'Manuel'],
    // Símbolo visual entre los nombres (portada y cierre).
    ampersand: '&',
    // Frase sobre los nombres en la portada.
    tagline: '¡NOS CASAMOS!',
    // Palabra que une los nombres en textos, lectores de pantalla y calendario.
    connector: 'y',
    // Monograma usado en el cierre.
    initials: ['S', 'M'],
  },

  /* ── Evento ─────────────────────────────────────────────────────────────── */
  event: {
    // Fuente única de la fecha y hora de la boda (ISO 8601 con zona horaria).
    // Alimenta portada, calendario, cuenta regresiva, archivo .ics y WhatsApp.
    dateTime: '2027-09-25T17:00:00-06:00', // DEMO
    // Zona horaria del lugar de la boda: así todos ven el mismo día y hora.
    timeZone: 'America/Mexico_City',
    locale: 'es-MX',
    durationHours: 8, // Para el evento de calendario.
    calendarTitle: 'Boda de {couple}', // {couple} se reemplaza automáticamente.
    calendarDescription: 'Invitación de boda (datos de demostración).',
  },

  /* ── Lugares ────────────────────────────────────────────────────────────── */
  // Cada lugar es un panel con su foto (`photo`, siempre .webp en /public/images)
  // y una nube con el texto. `time: 'event'` toma la hora de `event.dateTime`;
  // también acepta un texto "HH:mm" (24 h) para otro horario.
  locations: [
    {
      id: 'ceremonia',
      label: 'Ceremonia',
      name: 'Parroquia de San Cristóbal',
      address: 'Gómez Farías 4, Centro, 49500 Mazamitla, Jal.',
      time: 'event',
      photo: `${import.meta.env.BASE_URL}images/iglesia.webp`,
      mapsUrl: 'https://www.google.com/maps/place/Parroquia+de+San+Cristóbal,+Mazamitla/data=!4m2!3m1!1s0x842f08e910b60a59:0xe70f5c5f0c52aee4',
    },
    {
      id: 'celebracion',
      label: 'Celebración',
      name: 'Hacienda La Bendita',
      address: 'Camino al Montecito y Alcatraces s/n, La Cofradía, 49500 Mazamitla, Jal.',
      time: '18:30', // DEMO
      photo: `${import.meta.env.BASE_URL}images/hacienda.webp`,
      mapsUrl: 'https://www.google.com/maps/place/Hacienda+la+Bendita+Eventos/@19.925462,-103.0424761,17z/data=!4m10!1m2!2m1!1shacienda+la+bendita+mazamitla!3m6!1s0x842f09a6f1310663:0xa281a77f540a3db2!8m2!3d19.9250588!4d-103.0391345',
    },
  ],

  /* ── Textos de las secciones ────────────────────────────────────────────── */
  content: {
    welcome: {
      // "\n" crea un salto de línea. La primera letra se dibuja en caligráfica.
      title: 'Queridos familiares\ny amigos',
      text:'Con mucha ilusión, queremos compartir con ustedes el comienzo de una nueva etapa llena de amor y sueños por cumplir.',    },
    date: {
      eyebrow: 'Nuestra boda',

    },
    location: {
      title: 'Ubicación',
      lead: 'Los esperamos en:',
      hint: 'Encuéntranos aquí',
      button: 'Ver en el mapa',
    },
    closing: {
      title: 'Gracias',
      text: 'Gracias por acompañarnos en este día tan especial. Su presencia es el mejor regalo.',
      countdownLabel: 'Faltan',
      countdownUnits: { days: 'días', hours: 'horas', minutes: 'min', seconds: 'seg' },
      countdownDone: '¡Hoy es el gran día!',
    },
  },

  /* ── Itinerario ─────────────────────────────────────────────────────────── */
  itinerary: {
    title: 'Itinerario',
    suffix: 'HRS', // Se muestra después de la hora: "17:00 HRS".
    items: [
      { time: '17:00', title: 'Ceremonia' }, // DEMO
      { time: '18:30', title: 'Cóctel' },
      { time: '20:00', title: 'Banquete' },
      { time: '22:00', title: 'Baile' },
    ],
  },

  /* ── Código de vestimenta ───────────────────────────────────────────────── */
  dressCode: {
    title: 'Dress code',
    text: 'Será muy lindo que nos acompañen en la gama de colores de la celebración.',
    // Cada color es editable: `hex` es el valor y `name` el texto accesible.
    palette: [
      { name: 'Café', hex: '#6B5446' },
      { name: 'Taupe', hex: '#A38F85' },
      { name: 'Verde oliva', hex: '#55583D' },
      { name: 'Verde salvia', hex: '#A9B28F' },
      { name: 'Blanco', hex: '#FFFFFF' },
    ],
  },

  /* ── Galería ────────────────────────────────────────────────────────────── */
  // Cada foto: { src, alt }. Guárdalas en /public/images (siempre .webp) y usa la
  // base del sitio, p. ej. `${import.meta.env.BASE_URL}images/foto-1.webp`.
  gallery: {
    title: 'Galería',
    photos: [
      { src: `${import.meta.env.BASE_URL}images/galeria-1.webp`, alt: 'Sarahi y Manuel abrazados frente a un muro de piedra' },
      { src: `${import.meta.env.BASE_URL}images/galeria-2.webp`, alt: 'Manuel levanta a Sarahi entre columnas' },
      { src: `${import.meta.env.BASE_URL}images/galeria-3.webp`, alt: 'Manuel carga a Sarahi frente a un templo de columnas' },
      { src: `${import.meta.env.BASE_URL}images/galeria-4.webp`, alt: 'Sarahi y Manuel a punto de besarse' },
    ],
  },

  /* ── Confirmación de asistencia ─────────────────────────────────────────── */
  rsvp: {
    title: 'Confirma tu asistencia',
    message:
      'Queremos que este día sea inolvidable, por eso te pedimos confirmar tu presencia',
    // Se muestra como "…antes del {fecha}". Formato AAAA-MM-DD.
    deadline: '2027-08-25', // DEMO
    deadlineLead: 'antes del',
    button: 'Confirmar asistencia',
    // Número en formato internacional, solo dígitos (ej. "521234567890").
    // VACÍO A PROPÓSITO: no se inventa ningún teléfono. Mientras esté vacío el
    // botón queda inactivo, salvo que definas `formUrl`.
    whatsapp: '',
    // Alternativa: enlace a un formulario (Google Forms, Typeform…).
    formUrl: '',
    // Variables: {couple}, {date}, {time}
    whatsappMessage:
      'Hola, confirmo mi asistencia a la boda de {couple} el {date}. Mi nombre completo y número de acompañantes: ',
  },

  /* ── Deseos / mesa de regalos ───────────────────────────────────────────── */
  gifts: {
    title: 'Deseos',
    message:
      'Lo mejor para nosotros es tu presencia y tus buenas palabras.\n\nNo queremos abrumarte con un regalo, así que agradeceremos tu aporte al presupuesto de nuestra nueva familia.',
    details: 'Si deseas obsequiarnos algo, estas son las opciones:',
    // Enlaces externos (opcionales). Deja la lista vacía para ocultarlos.
    links: [
      { label: 'Mesa de regalos', url: 'https://example.com/mesa-de-regalos' }, // DEMO
    ],
  },

  /* ── Música ─────────────────────────────────────────────────────────────── */
  // Nunca suena sola: inicia por un toque del invitado (botón o apertura).
  music: {
    enabled: false,
    src: '', // Ej. '/audio/cancion.mp3' (archivo propio en /public/audio).
    volume: 0.5,
    loop: true,
    labelOn: 'Música: sí',
    labelOff: 'Música: no',
  },

  /* ── Diseño ─────────────────────────────────────────────────────────────── */
  design: {
    // Se aplican como variables CSS (--olive, --ivory…) al cargar la página.
    colors: {
      olive: '#55583D',
      oliveDeep: '#464A31',
      sage: '#B9BCA6',
      mist: '#D8DCCB',
      ivory: '#FAF7EE', // Texto y trazos claros sobre fondos oscuros.
      surface: '#f5efe7', // Fondo de las secciones claras, encaje, botones y lazo.
      beige: '#DDD7C7',
      brown: '#78634F',
      ink: '#37372D',
      outer: '#22261B', // Fondo sólido fuera de la columna en escritorio.
    },
    // Para usar otras fuentes: instala su paquete @fontsource, impórtalo en
    // src/main.jsx y cambia el nombre aquí.
    fonts: {
      // Nombres de la pareja (portada y monograma del cierre). Si no carga, se
      // usa `script`. Archivo propio: /public/fonts, declarado en global.css.
      names: 'Parfumerie Script',
      // Letras ornamentales de los títulos (paquete @fontsource importado en main.jsx).
      script: 'Pinyon Script',
      serif: 'Forum',
    },
    // Ancho máximo de la columna (px). Equivale a un celular grande.
    columnMaxWidth: 430,
  },

  /* ── Secciones ──────────────────────────────────────────────────────────── */
  // Pon `false` para ocultar una sección. La portada siempre se muestra.
  sections: {
    opening: true, // Sobre de pantalla completa que se abre antes de la invitación.
    welcome: true,
    date: true,
    itinerary: true,
    location: true,
    dressCode: true,
    gallery: true,
    rsvp: true,
    gifts: true,
    closing: true,
  },

  // Apertura (solo si `sections.opening` es true).
  opening: {
    button: 'Toca para abrir',
  },
};

export default weddingConfig;
