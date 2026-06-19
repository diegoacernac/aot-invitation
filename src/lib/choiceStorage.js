const STORAGE_KEY = 'aot-fiorella-choice';

export function saveChoice(branchId) {
  const data = {
    branchId,
    letterUnlocked: false,
    chosenAt: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getSavedChoice() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function markLetterUnlocked() {
  const saved = getSavedChoice();
  if (!saved) return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...saved, letterUnlocked: true }),
  );
}

export function clearChoice() {
  localStorage.removeItem(STORAGE_KEY);
}
