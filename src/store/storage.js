// Bump the version when the seed data changes, so returning visitors get the new data.
const STORAGE_KEY = 'ofu-demo-state-v3'

// Returns the saved state, or null if nothing is saved or it can't be read.
export function loadState() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY)
    return savedState ? JSON.parse(savedState) : null
  } catch {
    return null
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage can be full or blocked (e.g. private mode); the demo still works in memory.
  }
}
