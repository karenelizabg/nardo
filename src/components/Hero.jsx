import { Fragment } from 'react';
import { Section } from './ui';
import { Frame } from './ornaments';
import { coupleLabel, getNumericDateParts, formatShortDate } from '../utils/dates';

export default function Hero({ config, held }) {
  const { couple, event } = config;
  const dateParts = getNumericDateParts(event);
  // Sarahi / & / Eduardo, en líneas apiladas.
  const lines = couple.names.flatMap((name, i) => (i ? [couple.ampersand, name] : [name]));

  return (
    <Section id="portada" tone="olive" held={held} className="hero" labelledBy="hero-title">
      <div className="hero__stage">
        <Frame />
        <p className="hero__tagline">{couple.tagline}</p>
        <div className="hero__content">
          <h1 id="hero-title" className="hero__names" aria-label={coupleLabel(couple)}>
            {lines.map((line, i) => (
              <span key={line} className={`hero__name hero__name--${['left', 'amp', 'right'][i % 3]}`} aria-hidden="true">
                {line}
              </span>
            ))}
          </h1>
        </div>
        <p className="hero__date" aria-label={formatShortDate(event)}>
          {dateParts.map((part, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="hero__date-dot" aria-hidden="true" />}
              <span aria-hidden="true">{part}</span>
            </Fragment>
          ))}
        </p>
      </div>
    </Section>
  );
}
