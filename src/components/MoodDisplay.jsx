import { MOODS } from "../hooks/useMood";
import { useEffect, useState } from "react";

export default function MoodDisplay({ mood }) {
  const moodData = MOODS[mood];
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(t);
  }, [mood]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
      <div style={{
        fontSize: "96px",
        transition: "all 0.5s ease",
        transform: animate ? "scale(1) translateY(0)" : "scale(0.5) translateY(24px)",
        opacity: animate ? 1 : 0,
      }}>
        {moodData.emoji}
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Current Vibe
        </p>
        <h1 style={{
          fontSize: "56px",
          fontWeight: "700",
          color: "white",
          marginTop: "4px",
          transition: "all 0.7s ease",
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(16px)",
        }}>
          {moodData.label}
        </h1>
      </div>
      <div style={{
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px",
        padding: "12px 24px",
        border: "1px solid rgba(255,255,255,0.2)",
      }}>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>🎵 Music will match your mood</p>
      </div>
    </div>
  );
}