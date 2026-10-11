import { useEffect, useRef } from 'react';
import { Section } from './ui';

/* Cada actividad aparece al llegar a la pantalla (si el movimiento no está reducido). */
function Step({ item, suffix, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !document.documentElement.classList.contains('js-reveal') || !('IntersectionObserver' in window)) {
      el?.classList.add('is-visible');
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <li ref={ref} className="step" style={{ '--reveal-delay': `${index * 0.22}s` }}>
      <p className="step__title">{item.title}</p>
      <time className="step__time">{item.time} {suffix}</time>
    </li>
  );
}

/* Sección verde con un arco claro arriba; las actividades van centradas, una bajo otra. */
export default function Itinerary({ config, laceTop, laceBottom }) {
  const { title, suffix, items } = config.itinerary;

  return (
    <Section id="itinerario" tone="mist" className="itinerary" laceTop={laceTop} laceBottom={laceBottom} labelledBy="itinerary-title">
      <div className="arch">
        <h2 id="itinerary-title" className="arch__title">{title}</h2>
        <ol className="steps">
          {items.map((item, i) => (
            <Step key={`${item.time}-${item.title}`} item={item} suffix={suffix} index={i} />
          ))}
        </ol>
      </div>
    </Section>
  );
}
