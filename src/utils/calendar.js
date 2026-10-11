import { coupleLabel, fill } from './dates';

const toStamp = (date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

const escapeIcs = (text) =>
  String(text).replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

// RFC 5545: las líneas no deberían superar 75 caracteres.
const fold = (line) => line.match(/.{1,74}/g).join('\r\n ');

const eventFields = (config) => {
  const { event, couple, locations } = config;
  const start = new Date(event.dateTime);
  const end = new Date(start.getTime() + event.durationHours * 3600 * 1000);
  const place = locations[0];
  return {
    start,
    end,
    title: fill(event.calendarTitle, { couple: coupleLabel(couple) }),
    description: event.calendarDescription,
    location: place ? `${place.name}, ${place.address}` : '',
    url: place?.mapsUrl ?? '',
  };
};

export const buildIcs = (config) => {
  const f = eventFields(config);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AMORE//Wedding Invitation//ES',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${toStamp(f.start)}-boda@amore-invitation`,
    `DTSTAMP:${toStamp(new Date())}`,
    `DTSTART:${toStamp(f.start)}`,
    `DTEND:${toStamp(f.end)}`,
    `SUMMARY:${escapeIcs(f.title)}`,
    `DESCRIPTION:${escapeIcs(f.description)}`,
    `LOCATION:${escapeIcs(f.location)}`,
    f.url && `URL:${f.url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean);
  return lines.map(fold).join('\r\n');
};

export const downloadIcs = (config) => {
  const blob = new Blob([buildIcs(config)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'boda.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const googleCalendarUrl = (config) => {
  const f = eventFields(config);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: f.title,
    dates: `${toStamp(f.start)}/${toStamp(f.end)}`,
    details: f.description,
    location: f.location,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
};
