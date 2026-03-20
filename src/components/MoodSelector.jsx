import { MOODS } from "../hooks/useMood";

export default function MoodSelector({ currentMood, onSelect }) {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {Object.entries(MOODS).map(([key, val]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`px-5 py-2 rounded-full text-white font-semibold text-sm backdrop-blur-sm border transition-all duration-300 hover:scale-110 active:scale-95
            ${currentMood === key
              ? "bg-white/30 border-white/80 shadow-lg shadow-white/20 scale-110"
              : "bg-white/10 border-white/30 hover:bg-white/20"}`}
        >
          {val.emoji} {val.label}
        </button>
      ))}
    </div>
  );
}