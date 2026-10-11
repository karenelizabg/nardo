import { Section } from './ui';
import { Frame, Doves } from './ornaments';
import { coupleLabel } from '../utils/dates';

export default function Hero({ config, held }) {
  const { couple } = config;
  // Sarahi / & / Eduardo, en líneas apiladas.
  const lines = couple.names.flatMap((name, i) => (i ? [couple.ampersand, name] : [name]));

  return (
    <Section id="portada" tone="olive" held={held} className="hero" labelledBy="hero-title">
      <div className="hero__stage">
        <Frame />
        <div className="hero__doves">
          <Doves />
        </div>
        <div className="hero__content">
          <h1 id="hero-title" className="hero__names" aria-label={coupleLabel(couple)}>
            {lines.map((line, i) => (
              <span key={line} className={`hero__name hero__name--${['left', 'amp', 'right'][i % 3]}`} aria-hidden="true">
                {line}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </Section>
  );
}
