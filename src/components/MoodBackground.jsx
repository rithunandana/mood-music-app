import { useEffect, useRef } from "react";
import { MOODS } from "../hooks/useMood";

export default function MoodBackground({ mood, children }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animRef = useRef(null);
  const moodData = MOODS[mood];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles.current = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 2,
      dx: (Math.random() - 0.5) * 0.6,
      dy: -(Math.random() * 0.5 + 0.2),
      alpha: Math.random() * 0.5 + 0.2,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const hex = Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fillStyle = moodData.particle + hex;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      });
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [mood]);

  return (
    <div style={{
      background: moodData.bg,
      transition: "background 1.5s ease",
      minHeight: "100vh",
      position: "relative",
    }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
    </div>
  );
}