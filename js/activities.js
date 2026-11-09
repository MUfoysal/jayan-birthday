/** Small event-delegation helper for touch-first chapter scenes added in Phase 3. */
export function registerActivity(root, selector, onActivate) {
  if (!(root instanceof Element) || typeof onActivate !== "function") {
    throw new TypeError("An activity needs a DOM root and an activation callback.");
  }
  const handleActivation = (event) => {
    const target = event.target instanceof Element ? event.target.closest(selector) : null;
    if (!target || !root.contains(target)) return;
    onActivate({ event, target });
  };
  root.addEventListener("click", handleActivation);
  return () => root.removeEventListener("click", handleActivation);
}
