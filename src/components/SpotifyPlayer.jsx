const MOOD_PLAYLISTS = {
  happy:   "37i9dQZF1DXdPec7aLTmlC", // Happy Hits
  sad:     "37i9dQZF1DX3YSRoSdA634", // Life Sucks
  angry:   "37i9dQZF1DWTggY0yqBxES", // Rage Beats
  calm:    "37i9dQZF1DX4sWSpwq3LiO", // Peaceful Piano
  neutral: "37i9dQZF1DX4JAvHpjipBk", // New Music Friday
};

export default function SpotifyPlayer({ mood }) {
  const playlistId = MOOD_PLAYLISTS[mood];

  return (
    <div style={{ width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        🎵 Playlist for your vibe
      </p>
      <div style={{ width: "100%", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
        <iframe
          key={playlistId}
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderRadius: "16px", display: "block" }}
        />
      </div>
    </div>
  );
}