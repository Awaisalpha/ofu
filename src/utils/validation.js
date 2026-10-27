// Each validator returns an error message, or '' when the value is fine.

export const COVER_NOTE_MIN_LENGTH = 50
export const COVER_NOTE_MAX_LENGTH = 500

export function validateCoverNote(text) {
  const length = text.trim().length
  if (length === 0) return 'Write a short cover note.'
  if (length < COVER_NOTE_MIN_LENGTH) {
    return `Add ${COVER_NOTE_MIN_LENGTH - length} more characters (at least ${COVER_NOTE_MIN_LENGTH}).`
  }
  if (length > COVER_NOTE_MAX_LENGTH) {
    return `Remove ${length - COVER_NOTE_MAX_LENGTH} characters (at most ${COVER_NOTE_MAX_LENGTH}).`
  }
  return ''
}

// Empty is allowed; anything else must be a full http(s) link.
export function validateOptionalUrl(text) {
  const value = text.trim()
  if (value === '') return ''
  try {
    const url = new URL(value)
    if (url.protocol === 'http:' || url.protocol === 'https:') return ''
  } catch {
    // new URL() throws for text that isn't a link; handled below.
  }
  return 'Enter a full link, starting with https://'
}
