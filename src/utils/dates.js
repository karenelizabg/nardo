/**
 * Utilidades de fecha. Todo se calcula a partir de `config.event`
 * (dateTime + timeZone + locale), que es la única fuente de la fecha.
 */

export const fill = (template, vars) =>
  String(template).replace(/\{(\w+)\}/g, (_, key) => (key in vars ? vars[key] : `{${key}}`));

export const coupleLabel = (couple) => couple.names.join(` ${couple.connector} `);

const eventDate = (event) => new Date(event.dateTime);

const format = (event, options, date = eventDate(event)) =>
  new Intl.DateTimeFormat(event.locale, { timeZone: event.timeZone, ...options }).format(date);

/** Año, mes y día del evento en la zona horaria del lugar. */
const eventYMD = (event) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: event.timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(eventDate(event));
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return { year: get('year'), month: get('month'), day: get('day') };
};

export const formatLongDate = (event) =>
  format(event, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export const formatShortDate = (event) =>
  format(event, { day: 'numeric', month: 'long', year: 'numeric' });

/** ["25", "09", "27"]: día, mes y año (2 dígitos) en la zona horaria del lugar. */
export const getNumericDateParts = (event) => {
  const { year, month, day } = eventYMD(event);
  const two = (n) => String(n).padStart(2, '0');
  return [two(day), two(month), two(year % 100)];
};

export const formatMonth = (event) => format(event, { month: 'long' });

export const formatTime = (event) =>
  format(event, { hour: 'numeric', minute: '2-digit', hour12: true });

/** "HH:mm" → hora con el formato del idioma configurado. */
export const formatClock = (event, hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return new Intl.DateTimeFormat(event.locale, {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(Date.UTC(2000, 0, 1, h, m)));
};

/** Hora de un lugar: 'event' usa event.dateTime; si no, un "HH:mm". */
export const locationTime = (event, location) =>
  !location.time || location.time === 'event'
    ? formatTime(event)
    : formatClock(event, location.time);

/** "AAAA-MM-DD" → "25 de agosto de 2027". */
export const formatDeadline = (event, isoDay) => {
  const [y, m, d] = isoDay.split('-').map(Number);
  return new Intl.DateTimeFormat(event.locale, {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(Date.UTC(y, m - 1, d, 12)));
};

/** Semana (lunes a domingo) del evento: [{ label: "LU", day: 20, isEvent }]. */
export const getWeek = (event) => {
  const { year, month, day } = eventYMD(event);
  const offsetToMonday = (new Date(Date.UTC(year, month - 1, day)).getUTCDay() + 6) % 7;
  const weekday = new Intl.DateTimeFormat(event.locale, { timeZone: 'UTC', weekday: 'short' });
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.UTC(year, month - 1, day - offsetToMonday + i));
    return {
      label: weekday.format(date).replace('.', '').slice(0, 2).toUpperCase(),
      day: date.getUTCDate(),
      isEvent: date.getUTCDate() === day && date.getUTCMonth() === month - 1,
    };
  });
};

export const getCountdown = (event, now = Date.now()) => {
  const diff = eventDate(event).getTime() - now;
  if (diff <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const s = Math.floor(diff / 1000);
  return {
    done: false,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
};
