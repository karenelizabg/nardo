import { Section } from './ui';

/* Foto a todo el ancho, sin texto. Cada instancia toma su imagen de `config[field]`. */
function Photo({ config, field, id, laceTop, laceBottom }) {
  const { src, alt } = config[field];

  return (
    <Section id={id} tone="photo" className="banner" laceTop={laceTop} laceBottom={laceBottom}>
      <figure className="banner__figure">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </figure>
    </Section>
  );
}

/* Foto vertical entre la fecha y las ubicaciones. */
export function Banner(props) {
  return <Photo {...props} field="banner" id="foto" />;
}

/* Foto horizontal al final de la invitación. */
export function EndPhoto(props) {
  return <Photo {...props} field="endPhoto" id="foto-final" />;
}
