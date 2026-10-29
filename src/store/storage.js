const STORAGE_KEY = 'ofu-demo-state'
// Bump this when the seed data or the state shape changes. Visitors with an older
// version get the new seed data instead of a saved state the app can't read any more.
const STORAGE_VERSION = 6

// Returns the saved state, or null if nothing is saved, it's from another version
// or it can't be read. null makes the app start from the seed data.
export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved?.version === STORAGE_VERSION) return saved.state
    localStorage.removeItem(STORAGE_KEY)
    return null
  } catch {
    return null
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, state }))
  } catch {
    // Storage can be full or blocked (e.g. private mode); the demo still works in memory.
  }
}
