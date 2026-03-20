# 🎧 Mood Music App

> Your music, your emotions — a real-time mood-based music generator built with React.

---

## 🌈 What It Does

This app detects how you're feeling and instantly plays a Spotify playlist that matches your vibe — while the entire UI shifts color to reflect your mood.

**Three ways to detect your mood:**
- 📷 **Camera** — AI scans your face expression every 2.5 seconds
- ⌨️ **Text** — Type how you feel, app detects the emotion
- 🖱️ **Manual** — Pick your mood yourself

---

## 🎭 Mood Themes

| Mood | Vibe | Color |
|------|------|-------|
| 😊 Happy | Upbeat & energetic | Orange → Pink |
| 🌧️ Sad | Emotional & slow | Navy → Indigo |
| 🔥 Angry | Intense & heavy | Red → Orange |
| 🌊 Calm | Peaceful & soft | Teal → Emerald |
| 😐 Neutral | Mixed & chill | Slate → Gray |

---

## 🛠️ Built With

- **React + Vite** — Frontend
- **face-api.js** — Real-time facial emotion detection
- **Spotify Embed API** — Music player
- **Canvas API** — Floating particle animations

---

## ⚡ Run Locally
```bash
git clone https://github.com/rithunandana/mood-music-app.git
cd mood-music-app
npm install
npm run dev
```

Then open `http://localhost:5173`

> **Note:** Download face-api.js model files from [here](https://github.com/justadudewhohacks/face-api.js/tree/master/weights) and place them in `public/models/`

---

## 👩‍💻 Made by Rithu Nandana
Built from scratch using VS Code 🎧✨
