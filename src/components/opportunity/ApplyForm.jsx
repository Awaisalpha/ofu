import { useRef, useState } from 'react'
import { COVER_NOTE_MAX_LENGTH, COVER_NOTE_MIN_LENGTH, validateCoverNote, validateOptionalUrl } from '../../utils/validation'
import Button from '../ui/Button'
import FieldError from '../ui/FieldError'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'

// Errors appear when a field is left, and update on every keystroke once shown,
// so they disappear as soon as the value is fixed.
export default function ApplyForm({ onSubmit, onCancel }) {
  const [coverNote, setCoverNote] = useState('')
  const [portfolioUrl, setPortfolioUrl] = useState('')
  const [errors, setErrors] = useState({ coverNote: '', portfolioUrl: '' })
  const coverNoteRef = useRef(null)
  const portfolioUrlRef = useRef(null)

  const coverNoteLength = coverNote.trim().length
  const isOverLimit = coverNoteLength > COVER_NOTE_MAX_LENGTH

  function setError(field, message) {
    setErrors((currentErrors) => ({ ...currentErrors, [field]: message }))
  }

  function handleCoverNoteChange(event) {
    setCoverNote(event.target.value)
    if (errors.coverNote) setError('coverNote', validateCoverNote(event.target.value))
  }

  function handlePortfolioUrlChange(event) {
    setPortfolioUrl(event.target.value)
    if (errors.portfolioUrl) setError('portfolioUrl', validateOptionalUrl(event.target.value))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newErrors = {
      coverNote: validateCoverNote(coverNote),
      portfolioUrl: validateOptionalUrl(portfolioUrl),
    }
    setErrors(newErrors)

    if (newErrors.coverNote) {
      coverNoteRef.current.focus()
    } else if (newErrors.portfolioUrl) {
      portfolioUrlRef.current.focus()
    } else {
      onSubmit({ coverNote: coverNote.trim(), portfolioUrl: portfolioUrl.trim() })
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="cover-note" className="text-sm font-semibold">
          Cover note
        </label>
        <p id="cover-note-hint" className="mt-0.5 text-[13px] text-muted">
          Why you're a good fit, in {COVER_NOTE_MIN_LENGTH}–{COVER_NOTE_MAX_LENGTH} characters.
        </p>
        <Textarea
          ref={coverNoteRef}
          id="cover-note"
          name="coverNote"
          rows={5}
          required
          value={coverNote}
          onChange={handleCoverNoteChange}
          onBlur={() => setError('coverNote', validateCoverNote(coverNote))}
          aria-invalid={errors.coverNote ? true : undefined}
          aria-describedby={`cover-note-hint cover-note-count${errors.coverNote ? ' cover-note-error' : ''}`}
          className="mt-2 resize-y"
        />
        <div className="flex items-start justify-between gap-3">
          <FieldError id="cover-note-error">{errors.coverNote}</FieldError>
          <p
            id="cover-note-count"
            className={`mt-1.5 ml-auto shrink-0 text-[13px] leading-5 tabular-nums ${
              isOverLimit ? 'font-semibold text-danger' : 'text-muted'
            }`}
          >
            {coverNoteLength} / {COVER_NOTE_MAX_LENGTH}
            <span className="sr-only"> characters</span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="portfolio-url" className="text-sm font-semibold">
          Portfolio or LinkedIn link <span className="font-normal text-muted">(optional)</span>
        </label>
        <Input
          ref={portfolioUrlRef}
          id="portfolio-url"
          name="portfolioUrl"
          type="url"
          inputMode="url"
          autoComplete="url"
          placeholder="https://"
          value={portfolioUrl}
          onChange={handlePortfolioUrlChange}
          onBlur={() => setError('portfolioUrl', validateOptionalUrl(portfolioUrl))}
          aria-invalid={errors.portfolioUrl ? true : undefined}
          aria-describedby={errors.portfolioUrl ? 'portfolio-url-error' : undefined}
          className="mt-2 px-3"
        />
        <FieldError id="portfolio-url-error">{errors.portfolioUrl}</FieldError>
      </div>

      {/* On phones Submit sits on top, closest to the thumb. */}
      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit application</Button>
      </div>
    </form>
  )
}
