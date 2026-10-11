import { Section, SectionTitle } from './ui';

export default function DressCode({ config, laceTop, laceBottom }) {
  const { title, text, palette } = config.dressCode;

  return (
    <Section id="dress-code" tone="ivory" laceTop={laceTop} laceBottom={laceBottom} labelledBy="dress-title">
      <SectionTitle id="dress-title" text={title} />
      <p className="lead">{text}</p>
      <ul className="swatches">
        {palette.map(({ name, hex }) => (
          <li key={hex} className="swatch" style={{ backgroundColor: hex }} role="img" aria-label={`${name} (${hex})`} />
        ))}
      </ul>
    </Section>
  );
}
