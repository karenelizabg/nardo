import { useRef, useState } from 'react';

import Opening from './components/Opening';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import DateSection from './components/DateSection';
import Itinerary from './components/Itinerary';
import Location from './components/Location';
import DressCode from './components/DressCode';
import RSVP from './components/RSVP';
import Gifts from './components/Gifts';
import Closing from './components/Closing';
import MusicToggle from './components/MusicToggle';

/**
 * Orden de la invitación (el de la referencia) y tono de fondo de cada sección.
 * `key` coincide con `config.sections`. El encaje aparece solo donde una sección
 * marfil linda con otra de distinto tono; `plainAfter` evita el encaje cuando la
 * sección sigue a las indicadas (la referencia corta recto de Confirmación a Deseos).
 */
const SECTIONS = [
  { key: 'hero', tone: 'olive', always: true, Component: Hero },
  { key: 'welcome', tone: 'ivory', Component: Welcome },
  { key: 'date', tone: 'ivory', Component: DateSection },
  { key: 'itinerary', tone: 'mist', Component: Itinerary },
  { key: 'location', tone: 'photo', Component: Location },
  { key: 'dressCode', tone: 'ivory', Component: DressCode },
  { key: 'rsvp', tone: 'olive', Component: RSVP },
  { key: 'gifts', tone: 'ivory', plainAfter: ['rsvp'], Component: Gifts },
  { key: 'closing', tone: 'olive', Component: Closing },
];

export default function App({ config }) {
  const { music, sections } = config;
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  // La portada espera a que el sobre se abra para hacer su entrada.
  const [revealed, setRevealed] = useState(!sections.opening);
  const hasMusic = music.enabled && Boolean(music.src);

  // La reproducción siempre nace de un toque del invitado (botón o apertura).
  const startMusic = () => {
    const el = audio.current;
    if (!el) return;
    el.volume = music.volume;
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };
  const toggleMusic = () => {
    if (playing) {
      audio.current?.pause();
      setPlaying(false);
    } else {
      startMusic();
    }
  };

  const active = SECTIONS.filter(({ key, always }) => always || sections[key] !== false);

  return (
    <>
      {sections.opening && <Opening config={config} onOpen={hasMusic ? startMusic : undefined} onReveal={() => setRevealed(true)} />}

      <main className="invitation">
        {hasMusic && (
          <>
            <audio ref={audio} src={music.src} loop={music.loop} preload="none" />
            <MusicToggle music={music} playing={playing} onToggle={toggleMusic} />
          </>
        )}

        {active.map(({ key, tone, plainAfter = [], Component }, i) => {
          const prev = active[i - 1];
          const next = active[i + 1];
          const ivory = tone === 'ivory';
          const laceTop = ivory && prev && prev.tone !== 'ivory' && !plainAfter.includes(prev.key);
          const laceBottom = ivory && next && next.tone !== 'ivory' && !next.plainAfter?.includes(key);
          return <Component key={key} config={config} held={!revealed} laceTop={Boolean(laceTop)} laceBottom={Boolean(laceBottom)} />;
        })}
      </main>
    </>
  );
}
