import { Section } from './ui';
import { formatLongDate, formatMonth, formatTime, getWeek } from '../utils/dates';

/* Óvalo trazado a mano alrededor del día de la boda. */
function Scribble({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 46" aria-hidden="true" focusable="false">
      <path
        pathLength="1"
        d="M33 3.5C16 2 3.5 11 4.5 23c1 12.5 15 20 30 19 15-1 25.5-9.5 24-21C57.5 10 44 3 26 5.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function DateSection({ config, laceTop, laceBottom }) {
  const { event, content } = config;
  const week = getWeek(event);

  return (
    <Section id="fecha" tone="ivory" laceTop={laceTop} laceBottom={laceBottom} labelledBy="date-eyebrow">
      <h2 id="date-eyebrow" className="date__title">
        {content.date.eyebrow}
      </h2>
      <p className="date__month">{formatMonth(event)}</p>

      <div className="week" aria-hidden="true">
        {week.map(({ label, day, isEvent }, i) => (
          <div key={i} className={isEvent ? 'week__col is-event' : 'week__col'} style={{ '--i': i }}>
            <span className="week__label">{label}</span>
            <span className="week__day">
              {isEvent && <Scribble className="week__scribble" />}
              {day}
            </span>
          </div>
        ))}
      </div>

      <p className="fulldate">
        <time dateTime={event.dateTime}>
          {formatLongDate(event)} · {formatTime(event)}
        </time>
      </p>
    </Section>
  );
}
