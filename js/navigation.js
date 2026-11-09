export function showScreen(name) {
  const next = name === "map" ? "map" : "welcome";
  for (const screen of document.querySelectorAll("[data-screen]")) {
    const active = screen.dataset.screen === next;
    screen.hidden = !active;
    screen.classList.toggle("is-active", active);
    screen.setAttribute("aria-hidden", String(!active));
  }
  document.querySelector("main")?.focus({ preventScroll: true });
  return next;
}

export function bindScreenLinks(onNavigate) {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-screen-link]");
    if (!link) return;
    event.preventDefault();
    onNavigate(link.dataset.screenLink);
  });
}
