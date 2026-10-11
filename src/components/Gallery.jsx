import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Section, SectionTitle } from './ui';

/**
 * Galería: mosaico de dos columnas; al tocar una foto se abre en grande
 * (flechas, Esc y toque fuera para cerrar). El visor va en el <body> para quedar por encima del encaje y de las demás secciones. Las fotos viven en `config.gallery.photos`.
 */
export default function Gallery({ config, laceTop, laceBottom }) {
  const { title, photos } = config.gallery;
  const [open, setOpen] = useState(null); // índice de la foto abierta o null

  const step = useCallback((dir) => setOpen((i) => (i === null ? i : (i + dir + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, step]);

  return (
    <Section id="galeria" tone="ivory" laceTop={laceTop} laceBottom={laceBottom} labelledBy="gallery-title">
      <SectionTitle id="gallery-title" text={title} />

      {photos.length > 0 && (
        <ul className="gallery">
          {photos.map((photo, i) => (
            <li key={photo.src} className="gallery__item">
              <button type="button" className="gallery__btn" onClick={() => setOpen(i)} aria-label={photo.alt || `Foto ${i + 1}`}>
                <img src={photo.src} alt={photo.alt || ''} loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {open !== null && createPortal(
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={title} onClick={() => setOpen(null)}>
          <img className="lightbox__img" src={photos[open].src} alt={photos[open].alt || ''} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lightbox__close" onClick={() => setOpen(null)} aria-label="Cerrar">×</button>
          {photos.length > 1 && (
            <>
              <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Anterior">‹</button>
              <button type="button" className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Siguiente">›</button>
            </>
          )}
        </div>,
        document.body,
      )}
    </Section>
  );
}
