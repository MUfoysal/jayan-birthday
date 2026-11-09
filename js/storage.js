const STORAGE_KEY = "jayan-adventure:v1";

const DEFAULT_STATE = Object.freeze({ currentScreen: "welcome", stars: 0, unlockedThrough: 1, soundEnabled: false });

function normalize(value) {
  if (!value || typeof value !== "object") return { ...DEFAULT_STATE };
  return {
    currentScreen: value.currentScreen === "map" ? "map" : "welcome",
    stars: Number.isFinite(value.stars) ? Math.max(0, Math.floor(value.stars)) : 0,
    unlockedThrough: Number.isFinite(value.unlockedThrough) ? Math.min(12, Math.max(1, Math.floor(value.unlockedThrough))) : 1,
    soundEnabled: value.soundEnabled === true,
  };
}

export function loadProgress() {
  try {
    return normalize(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null"));
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveProgress(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalize(state)));
    return true;
  } catch {
    return false;
  }
}

export function clearProgress() {
  try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* Private browsing may disable storage. */ }
}
