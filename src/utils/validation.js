import { daysLeft } from './dates'

// Each validator returns an error message, or '' when the value is fine.

export const COVER_NOTE_MIN_LENGTH = 50
export const COVER_NOTE_MAX_LENGTH = 500
export const TITLE_MIN_LENGTH = 5
export const TITLE_MAX_LENGTH = 80
export const DESCRIPTION_MIN_LENGTH = 80
export const DESCRIPTION_MAX_LENGTH = 1000

// Shared by every text field that has a minimum and maximum length.
function validateLength(text, minLength, maxLength, emptyMessage) {
  const length = text.trim().length
  if (length === 0) return emptyMessage
  if (length < minLength) {
    return `Add ${minLength - length} more characters (at least ${minLength}).`
  }
  if (length > maxLength) {
    return `Remove ${length - maxLength} characters (at most ${maxLength}).`
  }
  return ''
}

export function validateCoverNote(text) {
  return validateLength(text, COVER_NOTE_MIN_LENGTH, COVER_NOTE_MAX_LENGTH, 'Write a short cover note.')
}

export function validateTitle(text) {
  return validateLength(text, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, 'Enter a title.')
}

export function validateDescription(text) {
  return validateLength(text, DESCRIPTION_MIN_LENGTH, DESCRIPTION_MAX_LENGTH, 'Write a description.')
}

export function validateRequired(text, emptyMessage) {
  return text.trim() === '' ? emptyMessage : ''
}

// The deadline is a "YYYY-MM-DD" string from a date input.
export function validateDeadline(date) {
  if (date === '') return 'Pick a deadline.'
  if (daysLeft(date) < 1) return 'Pick a date after today.'
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
