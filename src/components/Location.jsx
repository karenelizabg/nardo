import { Section, Button } from './ui';
import { Cloud } from './ornaments';
import { locationTime } from '../utils/dates';

/**
 * Un panel por lugar (ceremonia, celebración…): foto de fondo y una nube clara
 * al centro con el texto. El título es solo para lectores de pantalla.
 */
export default function Location({ config, laceTop, laceBottom }) {
  const { event, locations } = config;
  const { location: copy } = config.content;

  return (
    <Section id="ubicacion" tone="photo" className="places" laceTop={laceTop} laceBottom={laceBottom} labelledBy="location-title">
      <h2 id="location-title" className="sr-only">{copy.title}</h2>
      {locations.map((place) => (
        <div className="place" key={place.id}>
          {place.photo && <img className="place__photo" src={place.photo} alt="" loading="lazy" decoding="async" />}
          <div className="place__shade" aria-hidden="true" />
          <div className="place__card">
            <Cloud className="place__cloud" />
            <div className="place__body">
              <p className="place__label">{place.label}</p>
              <p className="place__name">{place.name}</p>
              <p className="place__time">{locationTime(event, place)}</p>
              <Button variant="olive" href={place.mapsUrl} aria-label={`${copy.button}: ${place.name}`}>
                {copy.button}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </Section>
  );
}
