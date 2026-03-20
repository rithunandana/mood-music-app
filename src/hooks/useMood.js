import { useState } from "react";

export const MOODS = {
  happy:   { emoji: "😊", label: "Happy",   bg: "linear-gradient(135deg, #f59e0b, #f97316, #ec4899)", particle: "#FBBF24" },
  sad:     { emoji: "🌧️", label: "Sad",     bg: "linear-gradient(135deg, #1e3a8a, #4338ca, #3b82f6)", particle: "#6366F1" },
  angry:   { emoji: "🔥", label: "Angry",   bg: "linear-gradient(135deg, #b91c1c, #e11d48, #f97316)", particle: "#EF4444" },
  calm:    { emoji: "🌊", label: "Calm",    bg: "linear-gradient(135deg, #0d9488, #06b6d4, #10b981)", particle: "#14B8A6" },
  neutral: { emoji: "😐", label: "Neutral", bg: "linear-gradient(135deg, #475569, #6b7280, #94a3b8)", particle: "#94A3B8" },
};

export function useMood() {
  const [mood, setMood] = useState("neutral");
  return { mood, setMood, moodData: MOODS[mood] };
}