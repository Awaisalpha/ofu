import { useRef, useState } from 'react'
import { validateRequired } from '../../utils/validation'
import Button from '../ui/Button'
import FieldError from '../ui/FieldError'
import Textarea from '../ui/Textarea'

const REASONS = ['Incomplete details', 'Deadline too close or passed', 'Organisation not verified', 'Other']

// Same validation pattern as ApplyForm: errors appear on blur or submit,
// and update on every change once shown.
export default function RejectPostForm({ onSubmit, onCancel }) {
  const [reason, setReason] = useState('')
  const [otherText, setOtherText] = useState('')
  const [errors, setErrors] = useState({ reason: '', otherText: '' })
  const firstRadioRef = useRef(null)
  const otherTextRef = useRef(null)

  function validateReason(value) {
    return validateRequired(value, 'Choose a reason.')
  }

  function validateOtherText(value) {
    return validateRequired(value, 'Describe the reason.')
  }

  function setError(field, message) {
    setErrors((currentErrors) => ({ ...currentErrors, [field]: message }))
  }

  function handleReasonChange(value) {
    setReason(value)
    if (errors.reason) setError('reason', validateReason(value))
  }

  function handleOtherTextChange(event) {
    setOtherText(event.target.value)
    if (errors.otherText) setError('otherText', validateOtherText(event.target.value))
  }

  // onBlur on a fieldset fires when moving between radios too, so only
  // validate once focus leaves the whole group.
  function handleReasonBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) setError('reason', validateReason(reason))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newErrors = {
      reason: validateReason(reason),
      otherText: reason === 'Other' ? validateOtherText(otherText) : '',
    }
    setErrors(newErrors)

    if (newErrors.reason) {
      firstRadioRef.current.focus()
    } else if (newErrors.otherText) {
      otherTextRef.current.focus()
    } else {
      onSubmit(reason === 'Other' ? otherText.trim() : reason)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset onBlur={handleReasonBlur} aria-describedby={errors.reason ? 'reject-reason-error' : undefined}>
        <legend className="text-sm font-semibold">Reason</legend>
        <p className="mt-0.5 text-[13px] text-muted">The alumnus sees this in My posts.</p>
        <div className="mt-2 space-y-1">
          {REASONS.map((option, index) => (
            <label
              key={option}
              className="flex min-h-10 cursor-pointer items-center gap-2.5 rounded-card border border-line px-3 text-sm has-checked:border-accent has-checked:bg-accent-soft has-checked:font-medium hover:bg-canvas has-checked:hover:bg-accent-soft"
            >
              <input
                ref={index === 0 ? firstRadioRef : undefined}
                type="radio"
                name="reject-reason"
                value={option}
                checked={reason === option}
                onChange={() => handleReasonChange(option)}
                aria-invalid={errors.reason ? true : undefined}
                className="size-4 shrink-0 accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              />
              {option}
            </label>
          ))}
        </div>
        <FieldError id="reject-reason-error">{errors.reason}</FieldError>
      </fieldset>

      {reason === 'Other' && (
        <div className="mt-4">
          <label htmlFor="reject-other" className="text-sm font-semibold">
            Describe the reason
          </label>
          <Textarea
            ref={otherTextRef}
            id="reject-other"
            name="otherReason"
            rows={3}
            required
            value={otherText}
            onChange={handleOtherTextChange}
            onBlur={() => setError('otherText', validateOtherText(otherText))}
            aria-invalid={errors.otherText ? true : undefined}
            aria-describedby={errors.otherText ? 'reject-other-error' : undefined}
            className="mt-2 resize-y"
          />
          <FieldError id="reject-other-error">{errors.otherText}</FieldError>
        </div>
      )}

      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Reject post</Button>
      </div>
    </form>
  )
}
