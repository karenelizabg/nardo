import { Section, SectionTitle, Button } from './ui';
import { Envelope } from './ornaments';

export default function Gifts({ config, laceTop, laceBottom }) {
  const { title, message, details, links } = config.gifts;

  return (
    <Section id="deseos" tone="ivory" className="gifts" laceTop={laceTop} laceBottom={laceBottom} labelledBy="gifts-title">
      <SectionTitle id="gifts-title" text={title} />

      <div className="gifts__stage">
        <Envelope className="gifts__envelope" />
        <div className="gifts__card">
          {message.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {details && <p>{details}</p>}
          {links.length > 0 && (
            <div className="stack">
              {links.map(({ label, url }) => (
                <Button key={url} variant="light" href={url}>
                  {label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
