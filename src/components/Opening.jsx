import { useEffect, useRef, useState } from 'react';
import { coupleLabel } from '../utils/dates';

/**
 * Sobre de pantalla completa que se abre antes de la invitación.
 * Fases: closed → opening (la solapa se abre) → leaving (las piezas se deslizan
 * fuera y deja ver la invitación) → gone. El toque en el sello es la interacción
 * del invitado que permite iniciar la música sin violar las reglas del navegador.
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
    }, 1000);
    setTimeout(() => setPhase('gone'), 2200);
  };

  return (
    <div className={`opening is-${phase}`} role="dialog" aria-modal="true" aria-label={coupleLabel(couple)}>
      <div className="envelope">
        <div className="envelope__back" />
        <div className="envelope__piece envelope__piece--left" />
        <div className="envelope__piece envelope__piece--right" />
        <div className="envelope__piece envelope__piece--bottom">
          <p className="envelope__names" aria-hidden="true">
            {couple.names.join(` ${couple.ampersand} `)}
          </p>
        </div>
        <div className="envelope__flap" />
        <button ref={seal} type="button" className="envelope__seal" onClick={open} aria-label={opening.button}>
          <span aria-hidden="true">{couple.initials.join('')}</span>
        </button>
        <p className="envelope__hint" aria-hidden="true">{opening.button}</p>
      </div>
    </div>
  );
}
