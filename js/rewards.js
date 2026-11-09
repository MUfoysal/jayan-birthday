/** In-memory reward ledger. The app persists its serializable state separately. */
export function createRewardLedger(initial = {}, onChange = () => {}) {
  let stars = Number.isFinite(initial.stars) ? Math.max(0, Math.floor(initial.stars)) : 0;
  const earned = new Set(Array.isArray(initial.rewards) ? initial.rewards : []);

  function snapshot() { return { stars, rewards: [...earned] }; }

  return Object.freeze({
    snapshot,
    addStars(amount = 1) {
      const safeAmount = Number.isFinite(amount) ? Math.max(0, Math.floor(amount)) : 0;
      if (!safeAmount) return snapshot();
      stars += safeAmount;
      const current = snapshot();
      onChange(current);
      return current;
    },
    earn(rewardId, starsAwarded = 0) {
      if (typeof rewardId !== "string" || !rewardId || earned.has(rewardId)) return snapshot();
      earned.add(rewardId);
      if (Number.isFinite(starsAwarded)) stars += Math.max(0, Math.floor(starsAwarded));
      const current = snapshot();
      onChange(current);
      return current;
    },
  });
}
