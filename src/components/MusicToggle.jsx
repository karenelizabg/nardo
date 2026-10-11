export default function MusicToggle({ music, playing, onToggle }) {
  return (
    <div className="music">
      <button type="button" className="music__btn" onClick={onToggle} aria-pressed={playing}>
        {playing ? music.labelOn : music.labelOff}
      </button>
    </div>
  );
}
