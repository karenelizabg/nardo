/**
 * Convierte `config.design` en variables CSS y metadatos del documento.
 * Se ejecuta antes del primer render para evitar parpadeos.
 */
export function applyDesign(config) {
  const { design, meta } = config;
  const root = document.documentElement;

  Object.entries(design.colors).forEach(([name, value]) => {
    root.style.setProperty(`--${name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`, value);
  });
  root.style.setProperty('--font-script', `'${design.fonts.script}', 'Snell Roundhand', cursive`);
  root.style.setProperty('--font-names', `'${design.fonts.names}', '${design.fonts.script}', cursive`);
  root.style.setProperty('--font-serif', `'${design.fonts.serif}', 'Cormorant', Georgia, serif`);
  root.style.setProperty('--column-max', `${design.columnMaxWidth}px`);

  root.lang = meta.lang;
  document.title = meta.title;

  const setMeta = (name, content) => {
    let el = document.head.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.name = name;
      document.head.appendChild(el);
    }
    el.content = content;
  };
  setMeta('description', meta.description);
  setMeta('theme-color', design.colors.outer);
}
