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

/* Nube que enmarca el texto de cada lugar (lleva la foto detrás). Trazo propio:
   el eje Y viene invertido, por eso el volteo del grupo. Se estira al tamaño del texto. */
export function Cloud({ className = '' }) {
  return (
    <svg className={className} viewBox="745 873 4635 3312" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path transform="translate(0 4980) scale(1 -1)" d="M2915 4094 c-11 -3 -47 -9 -80 -15 -127 -24 -313 -99 -415 -169 -14 -9 -30 -19 -36 -21 -13 -4 -82 -60 -128 -102 -17 -16 -51 -45 -76 -65 -25 -21 -53 -44 -63 -53 -23 -21 -70 -29 -237 -39 -74 -4 -148 -13 -164 -19 -89 -36 -156 -74 -198 -113 -27 -25 -48 -43 -48 -40 0 3 -9 -7 -20 -21 -11 -14 -20 -28 -20 -31 0 -4 -12 -24 -26 -46 -18 -26 -36 -41 -57 -46 -59 -12 -151 -69 -212 -130 -67 -67 -108 -140 -135 -246 -13 -49 -30 -83 -66 -128 -27 -34 -60 -79 -73 -99 -33 -49 -93 -200 -85 -213 4 -5 1 -14 -7 -19 -22 -13 -18 -246 5 -334 18 -68 75 -186 109 -225 9 -11 17 -23 17 -26 0 -3 18 -24 40 -46 26 -27 42 -53 46 -77 6 -42 11 -54 50 -136 16 -33 47 -78 69 -100 21 -22 38 -43 37 -47 -1 -5 3 -8 9 -8 6 0 25 -10 42 -23 28 -21 82 -48 157 -81 13 -6 49 -36 80 -66 55 -54 64 -62 128 -107 42 -31 132 -65 154 -60 9 3 19 0 20 -5 2 -6 64 -12 148 -14 170 -5 230 -12 230 -25 0 -5 7 -9 15 -9 8 0 15 -4 15 -10 0 -5 7 -10 15 -10 7 0 18 -6 22 -13 4 -7 26 -21 48 -32 22 -10 42 -21 45 -25 9 -12 136 -70 154 -70 9 0 27 -7 41 -16 13 -8 67 -24 121 -35 54 -11 102 -23 107 -26 4 -3 23 -7 40 -10 18 -3 39 -9 47 -13 45 -24 333 -34 445 -15 17 2 48 7 70 11 22 3 43 11 46 16 4 6 11 8 17 4 6 -3 23 -1 39 6 15 6 35 12 43 13 9 1 25 7 35 12 11 6 34 11 50 11 17 0 50 8 74 16 24 9 52 16 63 16 12 0 16 4 12 12 -4 7 -3 8 4 4 6 -4 20 -2 32 4 11 5 29 15 40 20 11 6 28 10 38 10 10 0 22 3 26 7 4 5 11 8 15 8 14 0 81 40 81 48 0 4 4 6 10 2 5 -3 18 3 30 15 11 11 24 20 28 20 5 0 19 11 32 25 21 22 32 25 104 26 45 1 126 5 181 10 55 5 108 9 118 9 9 1 17 5 17 11 0 5 13 9 29 9 16 0 36 7 45 15 8 8 22 15 30 15 9 0 16 4 16 9 0 5 9 12 19 16 20 6 105 89 154 150 21 26 37 35 59 35 19 0 27 4 22 11 -4 7 -1 10 7 7 34 -12 153 75 226 165 27 33 73 126 88 177 11 39 30 71 65 109 56 60 126 190 158 295 27 84 30 256 7 321 -8 22 -15 47 -15 56 0 30 -100 215 -150 276 -37 45 -53 76 -61 115 -6 29 -17 64 -24 78 -7 14 -21 42 -31 63 -33 67 -177 201 -228 212 -15 3 -67 23 -91 36 -11 5 -26 23 -34 40 -23 51 -152 175 -212 202 -118 54 -124 55 -299 67 -146 10 -176 15 -195 32 -8 7 -30 24 -50 38 -20 14 -62 50 -93 81 -99 97 -393 250 -538 279 -32 6 -68 17 -79 23 -19 10 -297 19 -340 11z" fill="currentColor" />
    </svg>
  );
}
