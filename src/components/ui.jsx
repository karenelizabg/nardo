import { useEffect, useRef } from 'react';
import { Lace } from './ornaments';

/**
 * Contenedor de sección: fondo (`tone`), encaje opcional en sus bordes y
 * entrada suave al hacer scroll (desactivada con movimiento reducido).
 */
export function Section({ id, tone, laceTop, laceBottom, labelledBy, backdrop, held = false, className = '', children }) {
  const inner = useRef(null);

  useEffect(() => {
    const el = inner.current;
    if (held || !el || !document.documentElement.classList.contains('js-reveal')) return undefined;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [held]);

  return (
    <section id={id} className={`section section--${tone} ${className}`} aria-labelledby={labelledBy}>
      {laceTop && <Lace edge="top" />}
      {backdrop}
      <div ref={inner} className="section__inner">
        {children}
      </div>
      {laceBottom && <Lace edge="bottom" />}
    </section>
  );
}

/**
 * Título ornamental: primera letra en caligráfica y el resto en versalitas serif.
 * Admite saltos de línea con "\n".
 */
export function SectionTitle({ id, text, as: Tag = 'h2', className = '' }) {
  const clean = text.replace(/\n/g, ' ');
  const [first, ...restChars] = [...text];
  const lines = restChars.join('').split('\n');
  return (
    <Tag id={id} className={`title ${className}`} aria-label={clean}>
      <span className="title__cap" aria-hidden="true">{first}</span>
      <span className="title__rest" aria-hidden="true">
        {lines.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/* Botón rectangular sin radio. Si recibe `href` es un enlace; si no, un botón. */
export function Button({ variant = 'light', href, disabled, children, ...rest }) {
  const className = `btn btn--${variant}`;
  if (href && !disabled) {
    const external = /^https?:/.test(href);
    return (
      <a
        className={className}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={className} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
