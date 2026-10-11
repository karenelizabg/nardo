import { Section, SectionTitle } from './ui';
import { Heart } from './ornaments';

const SLOT = 190; // Alto vertical (px) que ocupa cada actividad.
const PAD_TOP = 34;
const X_LEFT = 14; // % del ancho donde se coloca el hito izquierdo.
const X_RIGHT = 58; // % del ancho del hito derecho.

/* Curva que baja pegada al texto de cada hito y se abre hacia el siguiente por debajo. */
const buildPath = (points, height) => {
  const [first] = points;
  let d = `M-4 ${first.y - SLOT * 0.62}C${first.x * 0.4} ${first.y - SLOT * 0.55} ${first.x} ${first.y - SLOT * 0.4} ${first.x} ${first.y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    d += `C${a.x} ${a.y + SLOT * 1.1} ${b.x} ${b.y - SLOT * 0.14} ${b.x} ${b.y}`;
  }
  const last = points[points.length - 1];
  const edge = last.x < 50 ? 104 : -4;
  d += `C${last.x} ${last.y + SLOT * 0.8} ${edge} ${last.y + SLOT * 0.5} ${edge} ${height}`;
  return d;
};

export default function Itinerary({ config, laceTop, laceBottom }) {
  const { title, items } = config.itinerary;
  const height = PAD_TOP + items.length * SLOT + 30;
  const points = items.map((_, i) => ({
    x: i % 2 === 0 ? X_LEFT : X_RIGHT,
    y: PAD_TOP + 24 + i * SLOT,
  }));

  return (
    <Section id="itinerario" tone="mist" laceTop={laceTop} laceBottom={laceBottom} labelledBy="itinerary-title">
      <SectionTitle id="itinerary-title" text={title} />

      <div className="timeline" style={{ height }}>
        <svg className="timeline__curve" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d={buildPath(points, height)} vectorEffect="non-scaling-stroke" />
        </svg>

        <ol className="timeline__list">
          {items.map((item, i) => (
            <li
              key={`${item.time}-${item.title}`}
              className="timeline__item"
              style={{ left: `${points[i].x}%`, top: points[i].y }}
            >
              <Heart className="timeline__heart" />
              <time className="timeline__time">{item.time}</time>
              <p className="timeline__title">{item.title}</p>
              {item.description && <p className="timeline__desc">{item.description}</p>}
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
