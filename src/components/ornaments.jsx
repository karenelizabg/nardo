import { useId } from 'react';
import { FRAME_BOUNDS, FRAME_CANVAS_HEIGHT, FRAME_THICK, FRAME_THIN } from './framePaths';

/**
 * Ornamentos vectoriales. Todos usan `currentColor` o variables CSS del tema,
 * de modo que cambian con `design.colors` sin tocar el SVG.
 */

/* Encaje: máscara CSS (ver .lace en invitation.css). `edge` indica hacia dónde
   cuelga el festón: "top" sobre la sección anterior, "bottom" sobre la siguiente. */
export function Lace({ edge = 'top' }) {
  return <div className={`lace lace--${edge}`} aria-hidden="true" />;
}

/* Marco de la portada (SVG propio). Los bordes se adelgazan con máscaras:
   `thinning` (borde exterior) y `thinningInner` (filete interior) son el ancho,
   en unidades del trazado original, que se resta a cada borde. */
const FRAME_TRANSFORM = `translate(0 ${FRAME_CANVAS_HEIGHT}) scale(0.066667 -0.066667)`;

export function Frame({ thinning = 85, thinningInner = 34 }) {
  const uid = useId().replace(/:/g, '');
  const maskId = `frame-mask-${uid}`;
  const innerMaskId = `frame-mask-inner-${uid}`;
  return (
    <svg
      className="frame"
      viewBox={FRAME_BOUNDS.join(' ')}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <g transform={FRAME_TRANSFORM}>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="13000" height="20000">
          <path d={FRAME_THICK} fill="#fff" />
          <path d={FRAME_THICK} fill="none" stroke="#000" strokeWidth={thinning} />
        </mask>
        <mask id={innerMaskId} maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="13000" height="20000">
          <path d={FRAME_THIN} fill="#fff" />
          <path d={FRAME_THIN} fill="none" stroke="#000" strokeWidth={thinningInner} />
        </mask>
        <path className="frame__thick" d={FRAME_THICK} mask={`url(#${maskId})`} />
        <path className="frame__thin" d={FRAME_THIN} mask={`url(#${innerMaskId})`} />
      </g>
    </svg>
  );
}

/* Lazo de seda. */
export function Bow({ className = '' }) {
  const half = (
    <>
      <path className="bow__loop" d="M55 37C42 14 16 8 8 26c-5 15 9 31 47 20Z" />
      <path className="bow__fold" d="M52 41C41 29 25 24 14 29M52 44C38 40 26 40 16 36" />
      <path className="bow__loop" d="M57 52C52 69 42 84 31 101l12-3 6 8c6-17 12-33 12-46Z" />
      <path className="bow__fold" d="M52 62c-3 10-9 22-15 33" />
    </>
  );
  return (
    <svg className={className} viewBox="0 0 120 108" aria-hidden="true" focusable="false">
      <g>{half}</g>
      <g transform="translate(120 0) scale(-1 1)">{half}</g>
      <path className="bow__loop" d="M51 35c6-4 12-4 18 0l-1 18c-5 3-11 3-16 0Z" />
      <path className="bow__fold" d="M56 38v14M64 38v14" />
    </svg>
  );
}

/* Corazón relleno (día de la boda e hitos del itinerario). */
export function Heart({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 30" aria-hidden="true" focusable="false">
      <path d="M16 29 3.3 16.2A8.2 8.2 0 0 1 15 4.6l1 1 1-1a8.2 8.2 0 0 1 11.7 11.6Z" fill="currentColor" />
    </svg>
  );
}

/* Sobre entreabierto, detrás de la tarjeta de deseos. */
export function Envelope({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 300 210" aria-hidden="true" focusable="false">
      <rect className="envelope__body" x="0" y="0" width="300" height="210" />
      <path className="envelope__flap" d="M0 0h300L150 118Z" />
      <path className="envelope__line" d="M0 210 118 112M300 210 182 112" />
    </svg>
  );
}
