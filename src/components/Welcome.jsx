import { Section, SectionTitle } from './ui';

export default function Welcome({ config, laceTop, laceBottom }) {
  const { welcome } = config.content;

  return (
    <Section id="bienvenida" tone="ivory" laceTop={laceTop} laceBottom={laceBottom} labelledBy="welcome-title">
      <SectionTitle id="welcome-title" text={welcome.title} />
      <p className="lead">{welcome.text}</p>
    </Section>
  );
}
