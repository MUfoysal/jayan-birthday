import { chapters } from "./chapters.js";
import { bindScreenLinks, showScreen } from "./navigation.js";
import { loadProgress, saveProgress } from "./storage.js";
import { playChime } from "./audio.js";

const state = loadProgress();
const dialog = document.querySelector("#invitation-dialog");
const announcer = document.querySelector("#announcer");
const sounds = { button: document.querySelector("#sound-toggle"), enabled: state.soundEnabled };

function persist() { saveProgress(state); }

function updateProgress() {
  const stars = document.querySelector("#star-count");
  const text = document.querySelector("#progress-text");
  const fill = document.querySelector("#progress-fill");
  stars.textContent = String(state.stars);
  text.textContent = state.unlockedThrough > 1 ? `${state.unlockedThrough - 1} places found` : "Just beginning";
  fill.style.width = `${((state.unlockedThrough - 1) / (chapters.length - 1)) * 100}%`;
}

function updateSoundControl() {
  sounds.button.setAttribute("aria-pressed", String(sounds.enabled));
  sounds.button.setAttribute("aria-label", sounds.enabled ? "Turn gentle sounds off" : "Turn gentle sounds on");
  sounds.button.querySelector("span").textContent = sounds.enabled ? "🔔" : "🔇";
}

function renderMap() {
  const list = document.querySelector("#chapter-list");
  list.replaceChildren(...chapters.map((chapter) => {
    const available = chapter.id <= state.unlockedThrough;
    const card = document.createElement(available ? "button" : "article");
    card.className = `chapter-card ${available ? "is-available is-current" : "is-locked"}`;
    card.style.setProperty("--chapter-tint", chapter.tint);
    if (available) {
      card.type = "button";
      card.dataset.chapter = String(chapter.id);
      card.setAttribute("aria-label", `Open ${chapter.title}`);
    } else {
      card.setAttribute("aria-label", `${chapter.title}, locked for a later adventure`);
    }
    card.innerHTML = `<span class="chapter-icon" aria-hidden="true">${chapter.icon}</span><span class="chapter-number">CHAPTER ${String(chapter.id).padStart(2, "0")}</span><span class="chapter-title">${chapter.title}</span>${available ? "" : '<span class="chapter-lock" aria-hidden="true">🔒</span>'}`;
    return card;
  }));
}

function openInvitation() {
  if (dialog.open) return;
  dialog.showModal();
}

function navigate(name) {
  if (dialog.open) dialog.close();
  state.currentScreen = showScreen(name);
  persist();
}

bindScreenLinks(navigate);
document.querySelector("#open-invitation").addEventListener("click", openInvitation);
document.querySelector("#invitation").addEventListener("click", openInvitation);
document.querySelector("#invitation").addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openInvitation(); }
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
document.querySelector("#start-adventure").addEventListener("click", () => {
  navigate("map");
  announcer.textContent = "The storybook map is open. The Magical Invitation is ready to visit.";
});
document.querySelector("#chapter-list").addEventListener("click", (event) => {
  const chapter = event.target.closest("[data-chapter]");
  if (chapter?.dataset.chapter === "1") {
    navigate("welcome");
    openInvitation();
  }
});
sounds.button.addEventListener("click", () => {
  sounds.enabled = !sounds.enabled;
  state.soundEnabled = sounds.enabled;
  updateSoundControl();
  persist();
});
document.addEventListener("click", (event) => {
  if (event.target.closest("button, [role='button']")) void playChime(sounds.enabled);
});

updateProgress();
updateSoundControl();
renderMap();
showScreen(state.currentScreen);
