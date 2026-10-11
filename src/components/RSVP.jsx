import { Section, SectionTitle, Button } from './ui';
import { coupleLabel, fill, formatDeadline, formatLongDate, formatTime } from '../utils/dates';

export default function RSVP({ config, laceTop, laceBottom }) {
  const { rsvp, event, couple } = config;

  const phone = rsvp.whatsapp.replace(/\D/g, '');
  const text = fill(rsvp.whatsappMessage, {
    couple: coupleLabel(couple),
    date: formatLongDate(event),
    time: formatTime(event),
  });
  // WhatsApp si hay número; si no, el formulario; si no hay ninguno, el botón queda inactivo.
  const href = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : rsvp.formUrl;

  return (
    <Section id="confirmacion" tone="olive" laceTop={laceTop} laceBottom={laceBottom} labelledBy="rsvp-title">
      <SectionTitle id="rsvp-title" text={rsvp.title} />
      <p className="lead lead--light">
        {rsvp.message} {rsvp.deadlineLead}{' '}
        <time dateTime={rsvp.deadline}>{formatDeadline(event, rsvp.deadline)}</time>.
      </p>
      <Button variant="light" href={href || undefined} disabled={!href}>
        {rsvp.button}
      </Button>
    </Section>
  );
}
