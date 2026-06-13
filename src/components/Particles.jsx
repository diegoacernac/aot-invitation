import { useEffect, useRef } from "react";

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const isMobile = window.innerWidth < 600;
    const particles = Array.from({ length: isMobile ? 22 : 42 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.90 + 0.9,
      drift: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.35 + 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237, 233, 228, ${p.opacity})`;
        ctx.fill();
        p.y -= p.speed;
        p.x += p.drift;

        if (p.y < -4) { p.y = canvas.height + 4; PopStateEvent.x = Math.random() * canvas.width; }
        if (p.x < -4 || p.x > canvas.width + 4) p.x = Math.random() * canvas.width;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    }
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
  );
}