import { useEffect, useState } from 'react';
import { coupleLabel } from '../utils/dates';

/**
 * Sobre animado sobre fondo verde (técnica de solapa 3D: la solapa gira 180° y la
 * carta sube; luego el sobre se desliza hacia abajo y deja ver la invitación).
 * Fases: closed → opening (solapa y carta) → leaving (el sobre se va) → gone.
 * El toque en el sello es la interacción del invitado que permite iniciar la música.
 */
export default function Opening({ config, onOpen, onReveal }) {
  const [phase, setPhase] = useState('closed');
  const { couple, opening } = config;

  useEffect(() => {
    if (phase === 'gone') return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [phase]);

  if (phase === 'gone') return null;

  const open = () => {
    if (phase !== 'closed') return;
    onOpen?.();
    setPhase('opening');
    setTimeout(() => {
      setPhase('leaving');
      onReveal?.();
    }, 1700);
    setTimeout(() => setPhase('gone'), 3200);
  };

  return (
    <div className={`opening is-${phase}`} role="dialog" aria-modal="true" aria-label={coupleLabel(couple)}>
      <p className="env__title">{opening.title}</p>
      <div className="env">
        <div className="env__part env__back" />
        <div className="env__letter">
          <p className="env__letter-tag">{couple.tagline}</p>
          <p className="env__letter-names" aria-hidden="true">{couple.names.join(` ${couple.ampersand} `)}</p>
        </div>
        <div className="env__part env__pocket env__pocket--left" />
        <div className="env__part env__pocket env__pocket--right" />
        <div className="env__part env__pocket env__pocket--bottom" />
        <div className="env__flapwrap">
          {/* Solapa con la punta redondeada. */}
          <svg className="env__flap" viewBox="0 0 1000 592" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M0 0H1000L544 540Q500 600 456 540Z" />
          </svg>
          <div className="env__lace env__lace--left" />
          <div className="env__lace env__lace--right" />
        </div>
        <img className="env__seal" src={`${import.meta.env.BASE_URL}images/sello.webp`} alt="" decoding="async" />
        <img className="env__flowers" src={`${import.meta.env.BASE_URL}images/flores.webp`} alt="" decoding="async" />
        {/* Toda la superficie del sobre es el botón de abrir. */}
        <button type="button" className="env__hit" onClick={open} aria-label={opening.button} />
        <p className="env__hint" aria-hidden="true">{opening.button}</p>
      </div>
    </div>
  );
}
