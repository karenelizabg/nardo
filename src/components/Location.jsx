import { useState } from 'react';
import { Section, SectionTitle, Button } from './ui';
import { Bow } from './ornaments';
import { locationTime } from '../utils/dates';

export default function Location({ config, laceTop, laceBottom }) {
  const { event, locations, gallery } = config;
  const { location: copy } = config.content;
  const photo = gallery.location;
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <Section
      id="ubicacion"
      tone="photo"
      laceTop={laceTop}
      laceBottom={laceBottom}
      labelledBy="location-title"
      backdrop={
        <>
          {photo && !photoFailed && (
            <img
              className="photo__img"
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              onError={() => setPhotoFailed(true)}
            />
          )}
          <div className="photo__shade" aria-hidden="true" />
        </>
      }
    >
      <div className="photo__content">
        <SectionTitle id="location-title" text={copy.title} />
        <p className="lead lead--light">{copy.lead}</p>

        {locations.map((place) => (
          <div className="place" key={place.id}>
            {locations.length > 1 && <p className="place__label">{place.label}</p>}
            <address className="place__address">
              <span className="place__name">{place.name}</span>
              <span>{place.address}</span>
            </address>
            <p className="place__time">{locationTime(event, place)}</p>
            <p className="place__hint">{copy.hint}</p>
            <Button variant="light" href={place.mapsUrl} aria-label={`${copy.button}: ${place.name}`}>
              {copy.button}
            </Button>
          </div>
        ))}
      </div>

      <Bow className="photo__bow" />
    </Section>
  );
}
