import { useEffect, useRef, useState } from 'react';
import { coupleLabel } from '../utils/dates';

/**
 * Sobre animado sobre fondo verde (técnica de solapa 3D: la solapa gira 180° y la
 * carta sube; luego el sobre se desliza hacia abajo y deja ver la invitación).
 * Fases: closed → opening (solapa y carta) → leaving (el sobre se va) → gone.
 * El toque en el sello es la interacción del invitado que permite iniciar la música.
 */
export default function Opening({ config, onOpen, onReveal }) {
  const [phase, setPhase] = useState('closed');
  const seal = useRef(null);
  const { couple, opening } = config;

  useEffect(() => {
    if (phase === 'gone') return undefined;
    document.body.style.overflow = 'hidden';
    seal.current?.focus();
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
      <div className="env">
        <div className="env__part env__back" />
        <div className="env__letter">
          <p className="env__letter-tag">{config.couple.tagline}</p>
          <p className="env__letter-names" aria-hidden="true">{couple.names.join(` ${couple.ampersand} `)}</p>
        </div>
        <div className="env__part env__pocket env__pocket--left" />
        <div className="env__part env__pocket env__pocket--right" />
        <div className="env__part env__pocket env__pocket--bottom" />
        <div className="env__flapwrap">
          <div className="env__flap" />
          <div className="env__lace env__lace--left" />
          <div className="env__lace env__lace--right" />
        </div>
        <button ref={seal} type="button" className="env__seal" onClick={open} aria-label={opening.button}>
          <span aria-hidden="true">{couple.initials.join('')}</span>
        </button>
        <p className="env__hint" aria-hidden="true">{opening.button}</p>
      </div>
    </div>
  );
}
