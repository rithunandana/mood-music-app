import { useState, useEffect, useRef } from "react";

const KEYWORDS = {
  happy: ["happy","joy","excited","great","amazing","wonderful","love","fantastic","good","cheerful","smile","laugh","fun","awesome","blessed"],
  sad: ["sad","cry","depressed","lonely","miss","hurt","heartbreak","unhappy","miserable","grief","tears","gloomy","hopeless","broken"],
  angry: ["angry","furious","hate","mad","rage","annoyed","frustrated","irritated","outraged","livid","enraged","hostile","bitter"],
  calm: ["calm","peaceful","relaxed","chill","serene","quiet","tranquil","comfortable","gentle","soothing","meditate","breathe","rest"],
};

function detectMoodFromText(text) {
  const lower = text.toLowerCase();
  const scores = { happy: 0, sad: 0, angry: 0, calm: 0 };
  for (const [mood, words] of Object.entries(KEYWORDS)) {
    for (const word of words) {
      if (lower.includes(word)) scores[mood]++;
    }
  }
  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return top[1] > 0 ? top[0] : "neutral";
}

export default function TextMood({ onMoodDetected }) {
  const [text, setText] = useState("");
  const [detected, setDetected] = useState(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!text.trim()) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const mood = detectMoodFromText(text);
      setDetected(mood);
      onMoodDetected(mood);
    }, 800);
    return () => clearTimeout(debounceRef.current);
  }, [text]);

  const moodColors = { happy:"#f59e0b", sad:"#6366f1", angry:"#ef4444", calm:"#14b8a6", neutral:"#94a3b8" };

  return (
    <div style={{ width:"100%", maxWidth:"500px", display:"flex", flexDirection:"column", gap:"10px" }}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type how you feel... e.g. I feel so happy today!"
        rows={3}
        style={{
          width:"100%", padding:"14px 16px", borderRadius:"16px",
          border:"1px solid rgba(255,255,255,0.3)",
          background:"rgba(255,255,255,0.15)",
          backdropFilter:"blur(12px)", color:"white",
          fontSize:"14px", resize:"none", outline:"none",
          fontFamily:"Segoe UI, sans-serif", boxSizing:"border-box",
        }}
      />
      {detected && text.trim() && (
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:moodColors[detected], boxShadow:`0 0 8px ${moodColors[detected]}` }}/>
          <p style={{ color:"rgba(255,255,255,0.8)", fontSize:"12px" }}>
            Detected: <strong style={{ color:"white", textTransform:"capitalize" }}>{detected}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
