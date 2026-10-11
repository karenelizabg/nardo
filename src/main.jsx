import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Fuentes empaquetadas (sin CDN). Si cambias `design.fonts`, importa aquí la nueva.
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/pinyon-script/400.css';

import './styles/variables.css';
import './styles/global.css';
import './styles/invitation.css';

import App from './App';
import weddingConfig from './data/weddingConfig';
import { applyDesign } from './utils/design';

applyDesign(weddingConfig);

// Las entradas con scroll se activan solo si el usuario no pidió menos movimiento.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-reveal');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App config={weddingConfig} />
  </StrictMode>,
);
