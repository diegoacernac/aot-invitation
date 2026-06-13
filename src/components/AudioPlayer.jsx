import { useRef, useState, useEffect } from 'react';

export default function AudioPlayer({ shouldPlay }) {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      audioRef.current.volume = 0.35;
      audioRef.current.play().catch(() => {});
    }
  }, [shouldPlay]);

  if (!shouldPlay) return null;

  return (
    <>
      <audio ref={audioRef} src="/audio/theme.mp3" loop />
      <button
        className="audio-toggle"
        onClick={() => {
          if (!audioRef.current) return;
          audioRef.current.muted = !audioRef.current.muted;
          setMuted(!muted);
        }}
        aria-label={muted ? 'Activar música' : 'Silenciar música'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </>
  );
}
