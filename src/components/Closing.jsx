import { useEffect, useState } from 'react';
import { Section } from './ui';
import { getCountdown } from '../utils/dates';

function Countdown({ event, copy }) {
  const [time, setTime] = useState(() => getCountdown(event));

  useEffect(() => {
    const id = setInterval(() => setTime(getCountdown(event)), 1000);
    return () => clearInterval(id);
  }, [event]);

  if (time.done) return <p className="countdown__done">{copy.countdownDone}</p>;

  const units = [
    ['days', time.days],
    ['hours', time.hours],
    ['minutes', time.minutes],
    ['seconds', time.seconds],
  ];
  return (
    <div className="countdown" role="timer" aria-label={`${copy.countdownLabel} ${time.days} ${copy.countdownUnits.days}`}>
      <p className="countdown__label">{copy.countdownLabel}</p>
      <ul className="countdown__list" aria-hidden="true">
        {units.map(([key, value]) => (
          <li key={key} className="countdown__unit">
            <span className="countdown__value">{String(value).padStart(2, '0')}</span>
            <span className="countdown__name">{copy.countdownUnits[key]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Closing({ config, laceTop, laceBottom }) {
  const { couple, event } = config;
  const copy = config.content.closing;

  return (
    <Section id="cierre" tone="olive" className="closing" laceTop={laceTop} laceBottom={laceBottom} labelledBy="closing-title">
      <h2 id="closing-title" className="sr-only">{copy.title}</h2>
      <p className="lead lead--light">{copy.text}</p>

      <Countdown event={event} copy={copy} />

      <p className="closing__names">{couple.names.join(` ${couple.connector} `)}</p>
    </Section>
  );
}
