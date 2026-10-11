import { Section, Button } from './ui';
import { Heart } from './ornaments';
import { formatLongDate, formatMonth, formatTime, getDayStrip } from '../utils/dates';
import { downloadIcs, googleCalendarUrl } from '../utils/calendar';

export default function DateSection({ config, laceTop, laceBottom }) {
  const { event, content } = config;
  const days = getDayStrip(event);

  return (
    <Section id="fecha" tone="ivory" laceTop={laceTop} laceBottom={laceBottom} labelledBy="date-eyebrow">
      <p id="date-eyebrow" className="eyebrow">{content.date.eyebrow}</p>

      <ol className="daystrip" aria-hidden="true">
        {days.map(({ day, isEvent }, i) => (
          <li key={i} className={isEvent ? 'daystrip__day is-event' : 'daystrip__day'}>
            {isEvent && <Heart className="daystrip__heart" />}
            <span>{day}</span>
          </li>
        ))}
      </ol>

      <p className="month">{formatMonth(event)}</p>
      <p className="fulldate">
        <time dateTime={event.dateTime}>
          {formatLongDate(event)} · {formatTime(event)}
        </time>
      </p>

      <div className="stack">
        <Button variant="olive" onClick={() => downloadIcs(config)}>
          {content.date.calendarButton}
        </Button>
        <a className="textlink" href={googleCalendarUrl(config)} target="_blank" rel="noopener noreferrer">
          {content.date.googleCalendarLink}
        </a>
      </div>
    </Section>
  );
}
