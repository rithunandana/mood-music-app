import { useState } from "react";
import MoodBackground from "./components/MoodBackground";
import MoodSelector from "./components/MoodSelector";
import MoodDisplay from "./components/MoodDisplay";
import SpotifyPlayer from "./components/SpotifyPlayer";
import WebcamMood from "./components/WebcamMood";
import TextMood from "./components/TextMood";
import { useMood } from "./hooks/useMood";

export default function App() {
  const { mood, setMood } = useMood();
  const [inputMode, setInputMode] = useState("manual");

  return (
    <MoodBackground mood={mood}>
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", padding:"40px 16px", gap:"28px" }}>

        <h2 style={{ color:"rgba(255,255,255,0.7)", fontSize:"13px", letterSpacing:"0.3em", textTransform:"uppercase" }}>
          Mood Music
        </h2>

        <MoodDisplay mood={mood} />
        <SpotifyPlayer mood={mood} />

        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"16px", width:"100%", maxWidth:"500px" }}>

          <div style={{ display:"flex", gap:"4px", background:"rgba(0,0,0,0.25)", borderRadius:"999px", padding:"4px" }}>
            {[["manual","Manual"],["text","Type Mood"],["camera","Camera"]].map(([mode, label]) => (
              <button key={mode} onClick={() => setInputMode(mode)}
                style={{
                  padding:"8px 20px", borderRadius:"999px", border:"none",
                  background: inputMode === mode ? "rgba(255,255,255,0.9)" : "transparent",
                  color: inputMode === mode ? "#1a1a1a" : "rgba(255,255,255,0.6)",
                  fontWeight:"600", fontSize:"12px", cursor:"pointer", transition:"all 0.3s",
                }}>
                {label}
              </button>
            ))}
          </div>

          {inputMode === "manual" && (
            <MoodSelector currentMood={mood} onSelect={setMood} />
          )}

          {inputMode === "text" && (
            <TextMood onMoodDetected={setMood} />
          )}

          {inputMode === "camera" && (
            <WebcamMood onMoodDetected={setMood} />
          )}

        </div>
      </div>
    </MoodBackground>
  );
}
