import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const EMOTION_TO_MOOD = {
  happy: "happy",
  sad: "sad",
  angry: "angry",
  fearful: "sad",
  disgusted: "angry",
  surprised: "happy",
  neutral: "neutral",
};

export default function WebcamMood({ onMoodDetected }) {
  const webcamRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [lastEmotion, setLastEmotion] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    async function loadModels() {
      try {
        const MODEL_URL = "/models";
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setStatus("ready");
      } catch (err) {
        console.error("Model error:", err);
        setStatus("error");
      }
    }
    loadModels();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (status !== "ready") return;
    intervalRef.current = setInterval(async () => {
      if (!webcamRef.current?.video) return;
      const video = webcamRef.current.video;
      if (video.readyState !== 4) return;
      try {
        const detection = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
        if (detection) {
          const dominant = Object.entries(detection.expressions)
            .sort((a, b) => b[1] - a[1])[0][0];
          setLastEmotion(dominant);
          onMoodDetected(EMOTION_TO_MOOD[dominant] || "neutral");
        }
      } catch(e) { console.error(e); }
    }, 2500);
    return () => clearInterval(intervalRef.current);
  }, [status]);

  const statusConfig = {
    loading:  { bg: "rgba(251,191,36,0.85)",  color: "#78350f", text: "? Loading AI..." },
    ready:    { bg: "rgba(74,222,128,0.85)",   color: "#14532d", text: "? Camera ready" },
    error:    { bg: "rgba(248,113,113,0.85)",  color: "#7f1d1d", text: "? Check console (F12)" },
  };
  const s = statusConfig[status] || statusConfig.ready;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <div style={{
        position: "relative", borderRadius: "16px", overflow: "hidden",
        border: "2px solid rgba(255,255,255,0.3)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
      }}>
        <Webcam
          ref={webcamRef}
          mirrored
          style={{ width: "220px", height: "165px", objectFit: "cover", display: "block" }}
          videoConstraints={{ width: 320, height: 240, facingMode: "user" }}
        />
        <div style={{ position: "absolute", bottom: "8px", left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <span style={{
            background: s.bg, color: s.color,
            fontSize: "11px", padding: "4px 12px",
            borderRadius: "999px", fontWeight: "600"
          }}>
            {s.text}
          </span>
        </div>
      </div>

      {lastEmotion && (
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>
          Detected: <strong style={{ color: "white", textTransform: "capitalize" }}>{lastEmotion}</strong>
        </p>
      )}
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", textAlign: "center", maxWidth: "200px" }}>
        Face the camera — mood updates every 2.5s
      </p>
    </div>
  );
}
